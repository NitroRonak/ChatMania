interface UserInfo {
    id: string;
    email: string;
    profileSetup: boolean;
}

export interface AuthSlice {
    userInfo: UserInfo | undefined;
    setUserInfo: (userInfo: UserInfo) => void;
}

export const createAuthSlice = (set: (partialState: Partial<AuthSlice>) => void): AuthSlice => ({
    userInfo: undefined,
    setUserInfo: (userInfo) => set({ userInfo }),
});
