// src/utils/sec/nonceStore.js
import NodeCache from "node-cache";
const nonceCache = new NodeCache({ stdTTL: 120, checkperiod: 150 });

export const storeNonce = (nonce) => {
  return new Promise((resolve, reject) => {
    const success = nonceCache.set(nonce, "used");
    if (success) {
      resolve("Nonce stored");
    } else {
      reject("Failed to store nonce");
    }
  });
};

export const verifyNonce = (nonce) => {
  return new Promise((resolve) => {
    const value = nonceCache.get(nonce);
    if (value === "used") {
      resolve(false);
    } else {
      resolve(true);
    }
  });
};
