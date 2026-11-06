export const timestampValidator = (timestamp) => {
  const now = new Date();
  const requestTime = new Date(timestamp);
  const timeDifference = now - requestTime;
  //make sure time stamp is not in the future and younger than 2 minutes ago (this is when a nonce expires)
  console.log(timeDifference >= 0 && timeDifference <= 2 * 60 * 1000);
  return timeDifference >= 0 && timeDifference <= 2 * 60 * 1000;
};
