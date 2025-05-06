import { create } from "zustand";
import { AuthState, User } from "../types";
import { jwtDecode } from "jwt-decode";

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem("token"),
  isAuthenticated: !!localStorage.getItem("token"),

  setToken: (token: string | null) => {
    if (token) {
      localStorage.setItem("token", token);
      const decoded = jwtDecode<{ user: User }>(token);
      set({ token, user: decoded.user, isAuthenticated: true });
    } else {
      localStorage.removeItem("token");
      set({ token: null, user: null, isAuthenticated: false });
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ token: null, user: null, isAuthenticated: false });
  },
}));

export default useAuthStore;
