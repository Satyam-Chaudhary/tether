// Note: This is a slice of the Zustand store that will store and set the user's authentication information. returns js object with userInfo and setUserInfo have implicit return
export const createAuthSlice = (set) => ({
  userInfo: undefined,
  setUserInfo: (userInfo) => set({ userInfo }), // shorthand for set({userInfo: userInfo})
});
