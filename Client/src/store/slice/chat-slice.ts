export const  createChatSlice =  (set:any,get:any) => ({
    selectedChatType:undefined,
    selectedChatMessages:[],
    directMessagesContacts:[],
    isUploading:false,
    isDownloading:false,
    fileUploadProgress:0,
    fileDownloadProgress:0,
    channels:[],
    selectedChatData:undefined,
    setChannels: (channels:any[])=> set({channels}),
    setIsUploading: (isUploading:boolean)=> set({isUploading}),
    setIsDownloading: (isDownloading:boolean)=> set({isDownloading}),
    setFileUploadProgress: (fileUploadProgress:number)=> set({fileUploadProgress}),
    setFileDownloadProgress: (fileDownloadProgress:number)=> set({fileDownloadProgress}),
    setSelectedChatType: (selectedChatType:string | undefined)=> set({selectedChatType}),
    setSelectedChatData: (selectedChatData:any)=> set({selectedChatData}),
    setSelectedChatMessages: (selectedChatMessages:any[])=> set({selectedChatMessages}),
    setDirectMessagesContacts: (directMessagesContacts:any[])=> set({directMessagesContacts}),

    addChannel: (channel:any)=>{
        const channels = get().channels;
        set({channels:[...channels,channel]})
    },
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
