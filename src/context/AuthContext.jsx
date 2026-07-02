import { useMemo, useState } from 'react';
import { AuthContext } from './auth-context.js';

function getStoredAuth() {
  const token = localStorage.getItem('ccms_token');
  const storedUser = localStorage.getItem('ccms_user');

  if (!token || !storedUser) {
    return { token: null, user: null };
  }

  try {
    return {
      token,
      user: JSON.parse(storedUser),
    };
  } catch {
    localStorage.removeItem('ccms_token');
    localStorage.removeItem('ccms_user');
    return { token: null, user: null };
  }
}

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(getStoredAuth);

  const login = ({ user: nextUser, token: nextToken }) => {
    localStorage.setItem('ccms_token', nextToken);
    localStorage.setItem('ccms_user', JSON.stringify(nextUser));
    setAuth({ user: nextUser, token: nextToken });
  };

  const logout = () => {
    localStorage.removeItem('ccms_token');
    localStorage.removeItem('ccms_user');
    setAuth({ user: null, token: null });
  };

  const updateUser = ({ user: nextUser, token: nextToken }) => {
    localStorage.setItem('ccms_user', JSON.stringify(nextUser));
    if (nextToken) {
      localStorage.setItem('ccms_token', nextToken);
      setAuth({ user: nextUser, token: nextToken });
    } else {
      setAuth((prev) => ({ ...prev, user: nextUser }));
    }
  };

  const value = useMemo(
    () => ({
      user: auth.user,
      token: auth.token,
      login,
      logout,
      updateUser,
      isAuthenticated: Boolean(auth.user && auth.token),
    }),
    [auth],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
