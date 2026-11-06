import { verifyNonce, storeNonce } from "./nonceStore";
export const nonceValidator = async (nonce) => {
  return (await verifyNonce(nonce)) ? (await storeNonce(nonce), true) : false;
};
