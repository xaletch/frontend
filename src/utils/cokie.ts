export const setCookieWithExpiration = (
  cookieName: string,
  cookieValue: string
) => {
  document.cookie = `${cookieName}=${cookieValue}; path=/;`;
};
