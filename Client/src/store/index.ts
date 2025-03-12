import {create} from "zustand"
import { AuthSlice, createAuthSlice } from "./slice/auth-slice"
type AppStore = AuthSlice;
export const useAppStore = create<AppStore>()((...a)=>({
    ...createAuthSlice(...a),
}))