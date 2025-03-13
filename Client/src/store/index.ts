import {create} from "zustand"
import { AuthSlice, createAuthSlice } from "./slice/auth-slice"
import { createChatSlice } from "./slice/chat-slice";
type AppStore = AuthSlice;
export const useAppStore = create<AppStore>()((...a)=>({
    ...createAuthSlice(...a),
    ...createChatSlice(...a),
}))