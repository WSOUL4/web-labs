export const handleLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');

  window.location.reload();
};

export const saveTokens = (token: string, refreshToken: string) => {
  if (token) {
    localStorage.setItem('token', token);
  }
  if (refreshToken) {
    localStorage.setItem('refreshToken', refreshToken);
  }
};
export const isLoggedIn = (): boolean => {
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');
  
  return Boolean(token && refreshToken);
};
//export {handleLogout, saveTokens}
