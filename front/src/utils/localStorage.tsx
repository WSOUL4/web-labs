export const handleLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');

  //window.location.reload();
};

export const saveTokens = (token: string|undefined, refreshToken: string|undefined) => {
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
export const getHeadersRefreshToken= () => {
  return {
    'Content-Type': 'application/json', // Укажите нужный тип содержимого
    'Authorization': `Bearer ${localStorage.getItem('refreshToken')}`, // Пример добавления авторизационного токена
    
};
}
export const getHeadersToken = () => {
  return {
      'Content-Type': 'application/json', // Укажите нужный тип содержимого
      'Authorization': `Bearer ${localStorage.getItem('token')}`, // Пример добавления авторизационного токена
      
  };
};
