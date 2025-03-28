import { RiSendPlaneFill, RiEmojiStickerFill } from "react-icons/ri";
import { GrAttachment } from "react-icons/gr";
import { useEffect, useRef, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { useAppStore } from "@/store";
import { useSocket } from "@/context/SocketContext";
import { apiClient } from "@/lib/api-client";
import { UPLOAD_FILE_ROUTE } from "@/utils/constants";
const MessageBar = () => {
  const {selectedChatData,selectedChatType,userInfo,setIsUploading,setFileUploadProgress}=useAppStore();
  const socket = useSocket();
  const [message, setMessage] = useState<string>("");
  const emojiRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<any>(null);
  const [emojiPickerOpen, setEmojiPickerOpen] = useState<boolean>(false);
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        setEmojiPickerOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [emojiRef]);
  const handleAddEmoji = (emoji: any) => {
    setMessage((msg) => msg + emoji.emoji);
  };
  const handleSendMessage = () => {
    if(selectedChatType==="contact"){
      socket.emit("sendMessage",{
        sender:userInfo?.id,
        content:message,
        recepient:selectedChatData._id,
        messageType:"text",
        fileUrl:undefined,
      })
    }
    else if(selectedChatType==="channel"){
      console.log("message", message);
      socket.emit("send-channel-message",{
        sender:userInfo?.id,
        content:message,
        messageType:"text",
        fileUrl:undefined,
        channelId:selectedChatData._id,
      })
    }
    setMessage("");
  };
  const handleAttachmentClick = () => {
    if(fileRef.current){
      fileRef.current.click();
    }
  }
  const handleAttachmentChange = async(e:any) => {
    const file = e.target.files[0];
    if(file){
      const formData = new FormData();
      formData.append("file",file);
      setIsUploading(true);
      try {
        const response = await apiClient.post(UPLOAD_FILE_ROUTE,formData,{
          withCredentials:true,
          onUploadProgress: (progressEvent:any) => {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setFileUploadProgress(progress);
          }
        });
        if(response.status===200 && response.data){
          setIsUploading(false);
          if(selectedChatType==="contact"){
            socket.emit("sendMessage",{
              sender:userInfo?.id,
              content:undefined,
              recepient:selectedChatData._id,
              messageType:"file",
              fileUrl:response.data.filePath,
            })
          }
          else if(selectedChatType==="channel"){
            socket.emit("send-channel-message",{
              sender:userInfo?.id,
              content:undefined,
              messageType:"file",
              fileUrl:response.data.filePath,
              channelId:selectedChatData._id,
            })
          }
        }
      } catch (error) {
        setIsUploading(false);
        console.log(error);
      }
    }
  }
  return (
    <div className="h-[10vh] border-t-2 border-[#2f303b] flex justify-center items-center px-8 mb-6 gap-6">
      <div className="flex-1 bg-[#d6d6d657] flex rounded-md items-center gap-5 pr-5">
        <input
          type="text"
          placeholder="Message"
          className="bg-transparent border-none focus:border-none focus:outline-none focus:ring-0 text-white/80  p-4 placeholder:text-white/80 rounded-md w-full"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="bg-transparent cursor-pointer p-2" onClick={handleAttachmentClick}>
          <GrAttachment className="text-2xl text-white hover:text-[#b98fc5] duration-200 transition-all" />
        </button>
        <input type="file" ref={fileRef} className="hidden" onChange={handleAttachmentChange}/>
        <div className="relative">
          <button
            className="bg-transparent cursor-pointer "
            onClick={() => setEmojiPickerOpen(!emojiPickerOpen)}
          >
            <RiEmojiStickerFill className="text-2xl text-white hover:text-[#b98fc5] duration-200 transition-all" />
          </button>
          <div className="absolute bottom-16 right-0" ref={emojiRef}>
            {emojiPickerOpen && (
              <EmojiPicker
                onEmojiClick={handleAddEmoji}
                autoFocusSearch={false}
                // @ts-ignore
                theme="dark"
              />
            )}
          </div>
        </div>
      </div>
      <button
        className="bg-[#b98fc5] cursor-pointer rounded-md p-2 trasnition-all duration-300 hover:bg-[#895c96]/80"
        onClick={handleSendMessage}
      >
        <RiSendPlaneFill className="text-2xl text-white" />
      </button>
    </div>
  );
};

export default MessageBar;
