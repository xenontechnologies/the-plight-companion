import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  id: string;
  email: string;
  displayName: string;
  avatarUrl?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

/** Mock auth provider — replace with real Supabase auth when Cloud is enabled */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading] = useState(false);

  const login = async (_email: string, _password: string) => {
    // TODO: Replace with supabase.auth.signInWithPassword
    setUser({ id: "mock-1", email: _email, displayName: _email.split("@")[0] });
  };

  const signup = async (_email: string, _password: string, name: string) => {
    // TODO: Replace with supabase.auth.signUp
    setUser({ id: "mock-1", email: _email, displayName: name });
  };

  const loginWithGoogle = async () => {
    // TODO: Replace with supabase.auth.signInWithOAuth({ provider: 'google' })
    setUser({ id: "mock-google", email: "user@gmail.com", displayName: "Google User" });
  };

  const logout = () => {
    // TODO: Replace with supabase.auth.signOut
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
