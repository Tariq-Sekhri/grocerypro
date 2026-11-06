package ca.sekhrit.grocerypro;

import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.ConnectivityManager;
import android.net.LinkAddress;
import android.net.LinkProperties;
import android.net.Network;
import android.net.NetworkCapabilities;
import android.net.NetworkRequest;
import android.net.Uri;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import java.net.Inet4Address;
import java.net.InetAddress;

/**
 * Reports whether the phone has internet, whether a VPN is up and whether that
 * VPN is Tailscale (an address in 100.64.0.0/10), so the app can say which one
 * is stopping it from reaching the Grocery Pro server.
 */
@CapacitorPlugin(name = "NetworkStatus")
public class NetworkStatusPlugin extends Plugin {
    private static final String TAILSCALE = "com.tailscale.ipn";
    private ConnectivityManager connectivity;
    private ConnectivityManager.NetworkCallback callback;

    @Override
    public void load() {
        connectivity = getContext().getSystemService(ConnectivityManager.class);
        callback = new ConnectivityManager.NetworkCallback() {
            @Override public void onAvailable(Network network) { changed(); }
            @Override public void onLost(Network network) { changed(); }
            @Override public void onCapabilitiesChanged(Network network, NetworkCapabilities capabilities) { changed(); }
        };
        // The default request excludes VPNs; include them so Tailscale turning on or off is reported.
        NetworkRequest request = new NetworkRequest.Builder()
            .removeCapability(NetworkCapabilities.NET_CAPABILITY_NOT_VPN)
            .build();
        try {
            connectivity.registerNetworkCallback(request, callback);
        } catch (RuntimeException ignored) {
            callback = null;
        }
    }

    @Override
    protected void handleOnDestroy() {
        if (callback != null) {
            try { connectivity.unregisterNetworkCallback(callback); } catch (RuntimeException ignored) { }
        }
    }

    private void changed() {
        notifyListeners("change", new JSObject());
    }

    @PluginMethod
    public void getStatus(PluginCall call) {
        boolean online = false;
        boolean validated = false;
        boolean vpn = false;
        String tailscaleIp = null;
        for (Network network : connectivity.getAllNetworks()) {
            NetworkCapabilities capabilities = connectivity.getNetworkCapabilities(network);
            if (capabilities == null) continue;
            if (capabilities.hasTransport(NetworkCapabilities.TRANSPORT_VPN)) {
                vpn = true;
                if (tailscaleIp == null) tailscaleIp = tailnetAddress(connectivity.getLinkProperties(network));
            } else if (capabilities.hasCapability(NetworkCapabilities.NET_CAPABILITY_INTERNET)) {
                online = true;
                if (capabilities.hasCapability(NetworkCapabilities.NET_CAPABILITY_VALIDATED)) validated = true;
            }
        }
        JSObject result = new JSObject();
        result.put("online", online);
        result.put("validated", validated);
        result.put("vpn", vpn);
        result.put("tailscaleIp", tailscaleIp);
        result.put("tailscaleInstalled", tailscaleInstalled());
        call.resolve(result);
    }

    @PluginMethod
    public void openTailscale(PluginCall call) {
        Intent launch = getContext().getPackageManager().getLaunchIntentForPackage(TAILSCALE);
        try {
            if (launch == null) launch = new Intent(Intent.ACTION_VIEW, Uri.parse("market://details?id=" + TAILSCALE));
            launch.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            getContext().startActivity(launch);
        } catch (ActivityNotFoundException error) {
            Intent web = new Intent(Intent.ACTION_VIEW, Uri.parse("https://play.google.com/store/apps/details?id=" + TAILSCALE));
            web.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            getContext().startActivity(web);
        }
        call.resolve();
    }

    private boolean tailscaleInstalled() {
        try {
            getContext().getPackageManager().getPackageInfo(TAILSCALE, 0);
            return true;
        } catch (PackageManager.NameNotFoundException error) {
            return false;
        }
    }

    /** Tailscale addresses are in the CGNAT range 100.64.0.0/10. */
    private static String tailnetAddress(LinkProperties properties) {
        if (properties == null) return null;
        for (LinkAddress link : properties.getLinkAddresses()) {
            InetAddress address = link.getAddress();
            if (!(address instanceof Inet4Address)) continue;
            byte[] bytes = address.getAddress();
            if ((bytes[0] & 0xFF) == 100 && (bytes[1] & 0xC0) == 64) return address.getHostAddress();
        }
        return null;
    }
}
