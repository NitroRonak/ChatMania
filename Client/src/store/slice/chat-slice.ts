export interface ChatState {
    selectedChatType:string | undefined;
    selectedChatMessages:any[];
    directMessagesContacts:any[];
    isUploading:boolean;
    isDownloading:boolean;
    fileUploadProgress:number;
    fileDownloadProgress:number;
    channels:any[];
    selectedChatData:any;
    setChannels: (channels:any[])=> void;
    setIsUploading: (isUploading:boolean)=> void;
    setIsDownloading: (isDownloading:boolean)=> void;
    setFileUploadProgress: (fileUploadProgress:number)=> void;
    setFileDownloadProgress: (fileDownloadProgress:number)=> void;
    setSelectedChatType: (selectedChatType:string | undefined)=> void;
    setSelectedChatData: (selectedChatData:any)=> void;
    setSelectedChatMessages: (selectedChatMessages:any[])=> void;
    setDirectMessagesContacts: (directMessagesContacts:any[])=> void;
    addChannel: (channel:any)=> void;
    closeChat: ()=> void;
    addMessage: (message:any)=> void;
    addChannelInChannelList: (message:any)=> void;
    addContactInDMContacts: (message:any)=> void;
}
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
    addMessage:(message:any)=>{
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
    },
    addChannelInChannelList:(message:any)=>{
        const channels = get().channels;
        const data = channels.find((channel:any)=> channel._id === message.channelId);
        const index = channels.findIndex(
            (channel:any)=> channel._id === message.channelId);
        if(index !== -1 && index !== undefined){
            channels.splice(index,1);
            channels.unshift(data);
        }
    },

    addContactInDMContacts:(message:any)=>{
        const userId = get().userInfo.id;
        const fromId = message.sender._id === userId ? message.recepient._id : message.sender._id;
        const fromData = message.sender._id === userId ? message.recepient : message.sender;
        const dmContacts = get().directMessagesContacts;
        const data = dmContacts.find((contact:any)=> contact._id === fromId);
        const index = dmContacts.findIndex((contact:any)=> contact._id === fromId);
        if(index !== -1 && index !== undefined){
            dmContacts.splice(index,1);
            dmContacts.unshift(data);
        }
        else{
            dmContacts.unshift(fromData);
        }
        set({directMessagesContacts:dmContacts});
    }
})
