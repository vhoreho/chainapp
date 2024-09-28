import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ROUTES } from "@/constants/routes";
import { AuthContext } from "@/context/AuthContext";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      router.push(ROUTES.DASHBOARD);
    }
  }, [router]);

  const login = (token: string, user: any) => {
    localStorage.setItem("token", token);
    setToken(token);
    setUser(user);
    router.push(ROUTES.DASHBOARD);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    router.push(ROUTES.LOGIN);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>{children}</AuthContext.Provider>
  );
};
