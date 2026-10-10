import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const safeParse = (value) => {
    try {
      return value ? JSON.parse(value) : null;
    } catch {
      localStorage.removeItem("user");
      return null;
    }
  };

  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(safeParse(localStorage.getItem("user")));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      const savedUser = safeParse(localStorage.getItem("user"));
      if (savedUser) setUser(savedUser);
    }
    setLoading(false);
  }, [token]);

  const login = ({ token, user }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setToken(token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        login,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
