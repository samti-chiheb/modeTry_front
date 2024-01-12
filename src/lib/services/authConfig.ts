
export const authConfig = (
  jwtToken: string,
  additionalHeaders: Record<string, string> = {}
) => ({
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${jwtToken}`,
    ...additionalHeaders,
  },
});
