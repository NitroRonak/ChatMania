import { create } from "zustand";
import { AuthSlice, createAuthSlice } from "./slice/auth-slice";
import { ChatState, createChatSlice } from "./slice/chat-slice";
type AppStore = AuthSlice & ChatState;
export const useAppStore = create<AppStore>()((set, get) => ({
  ...createAuthSlice(set),
  ...createChatSlice(set, get),
}));
