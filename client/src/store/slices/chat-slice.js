export const createChatSlice = (set, get) => ({
  selectChatType: undefined, // chat type can be either contact or channel
  selectChatData: undefined, // chat data can be either contact or channel data
  selectedChatMessages: [], // messages of the selected chat
  setSelectedChatType: (selectChatType) => set({ selectChatType }),
  setSelecedChatData: (selectChatData) => set({ selectChatData }),
  setSelecedChatMessages: (selectedChatMessages) =>
    set({ selectedChatMessages }),
  closeChat: () =>
    set({
      selectChatType: undefined,
      selectChatData: undefined,
      selectedChatMessages: [],
    }),
});
