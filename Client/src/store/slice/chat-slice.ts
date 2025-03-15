export const  createChatSlice =  (set:any,get:any) => ({
    selectedChatType:undefined,
    selectedChatMessages:[],
    directMessagesContacts:[],
    selectedChatData:undefined,
    setSelectedChatType: (selectedChatType:string | undefined)=> set({selectedChatType}),
    setSelectedChatData: (selectedChatData:any)=> set({selectedChatData}),
    setSelectedChatMessages: (selectedChatMessages:any[])=> set({selectedChatMessages}),
    setDirectMessagesContacts: (directMessagesContacts:any[])=> set({directMessagesContacts}),
    closeChat: ()=> set({selectedChatType:undefined,selectedChatData:undefined,selectedChatMessages:[]}),
    addMessage:(message)=>{
        const selectedChatMessages = get().selectedChatMessages;
        const selectedChatType = get().selectedChatType;
        set({
            selectedChatMessages:[
                ...selectedChatMessages,
                {
                    ...message,
                    recepient:selectedChatType==="channel" ? message.recepient : message.recepient._id,
                    sender:selectedChatType==="channel" ? message.sender : message.sender._id,
                }
            ]
        })
    }
})
