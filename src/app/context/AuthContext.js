import { createContext, useState, useContext } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  // Login function (dummy auth for now)
  const login = (username, password) => {
    if (username === "admin" && password === "password") { // Replace with real auth
      setIsAuthenticated(true);
      router.push("/dashboard"); // Redirect after login
    } else {
      alert("Invalid credentials");
    }
  };

  // Logout function
  const logout = () => {
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
