package ca.sekhrit.grocerypro;

import android.os.Bundle;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        registerPlugin(NetworkStatusPlugin.class);
        super.onCreate(savedInstanceState);
    }
}
