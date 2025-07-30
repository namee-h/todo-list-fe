import { create } from "zustand";
import api from "../utils/api";

const useAuthStore = create((set) => ({
  token: sessionStorage.getItem("token"),
  user: null,

  setToken: (token) => {
    sessionStorage.setItem("token", token);
    api.defaults.headers["Authorization"] = `Bearer ${token}`;
    set({ token });
  },

  setUser: (user) => {
    set({ user });
  },

  clearAuth: () => {
    sessionStorage.removeItem("token");
    api.defaults.headers["Authorization"] = "";
    set({ token: null, user: null });
  },

  getUser: async () => {
    try {
      const res = await api.get("/user/me");
      console.log("getUser response:", res);
      set({ user: res.data.user });
    } catch (err) {
      console.error("getUser failed:", err.message);
      // getUser 실패 시 user만 null로 설정, token은 유지
      set({ user: null });
    }
  },
}));

export default useAuthStore;
