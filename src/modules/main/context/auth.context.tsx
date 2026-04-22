import { settingApi } from "@/api/setting.api";
import { createContext, useContext, useEffect, useState } from "react";

type UserType = any;

type AuthContextType = {
  user: UserType | null;
  loading: boolean;
  getProfile: () => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const role =
    typeof localStorage !== "undefined" ? localStorage.getItem("role") : null;

  const getProfile = async () => {
    const currentRole =
      typeof localStorage !== "undefined" ? localStorage.getItem("role") : role;
    const normalizedRole = currentRole?.toLowerCase() ?? null;
    const token =
      normalizedRole === "provider"
        ? localStorage.getItem("providerToken")
        : localStorage.getItem("patientToken");
    if (!token || !normalizedRole) {
      setLoading(false);
      return;
    }

    try {
      const res = await settingApi.getRoleProfile(normalizedRole);
      // Fallback: If data is nested like res.data.data, we might want res.data.data or res.data
      const userData = res?.data?.data || res?.data || null;
      setUser(userData);
    } catch (err) {
      console.error("Profile fetch failed", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };
  const logout = () => {
    localStorage.removeItem("patientToken");
    setUser(null);
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, getProfile, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
