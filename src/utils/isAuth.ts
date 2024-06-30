export const isAuth = document.cookie
  ?.split("; ")
  .find((row) => row?.startsWith("access_token="));
