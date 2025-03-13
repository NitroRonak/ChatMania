export const  createChatSlice =  (set:any,get:any) => ({
    selectedChatType:undefined,
    selectedChatMessages:[],
    selectedChatData:undefined,
    setSelectedChatType: (selectedChatType:string | undefined)=> set({selectedChatType}),
    setSelectedChatData: (selectedChatData:any)=> set({selectedChatData}),
    setSelectedChatMessages: (selectedChatMessages:any[])=> set({selectedChatMessages}),
    closeChat: ()=> set({selectedChatType:undefined,selectedChatData:undefined,selectedChatMessages:[]}),
})
