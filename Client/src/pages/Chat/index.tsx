import { useAppStore } from "@/store"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ContactsContainer from "./components/Contacts-Container";
import ChatContainer from "./components/Chat-Container";
import EmptyChatContainer from "./components/Empty-Chat-Container";

const Chat = () => {
  const {
    userInfo,
    selectedChatType,
    isUploading,
    isDownloading,
    fileUploadProgress,
    fileDownloadProgress,
  } = useAppStore();
  const navigate= useNavigate();
  useEffect(()=>{
    if(!userInfo?.profileSetup){
      toast("Please setup profile to continue...")
      navigate("/profile")
    }
  },[userInfo,navigate])
  return (
    <div className="flex w-full h-[100vh] text-white overflow-hidden">
      {
        isUploading && <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-10 flex-col gap-5 backdrop-blur-lg">
          <h5 className="text-5xl animate-pulse">Uploading File</h5>
          {fileUploadProgress}%
        </div>
      }
      {
        isDownloading && <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-10 flex-col gap-5 backdrop-blur-lg">
          <h5 className="text-5xl animate-pulse">Downloading File</h5>
          {fileDownloadProgress}%
        </div>
      }
      <ContactsContainer/>
      {
        selectedChatType === undefined ?
        <EmptyChatContainer/>
        :
        <ChatContainer/>
      }
    </div>
  )
}

export default Chat
