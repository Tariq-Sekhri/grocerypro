// const { countAuthKey } = require("../../models/userModel");
export const authKeyValidator = async (auth_key) => {
  // return auth_key != null && (await countAuthKey(auth_key)) === 1;
  return auth_key != null; // Temporarily just check if auth_key exists
};
