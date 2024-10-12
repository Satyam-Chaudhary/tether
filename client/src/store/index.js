import { create } from "zustand";
import { createAuthSlice } from "./slices/auth-slice";
import { createChatSlice } from "./slices/chat-slice";


export const useAppStore = create((...a) => ({ // ...a is a rest parameter that collects set and get functions in an array
    ...createAuthSlice(...a),
    ...createChatSlice(...a)
}))