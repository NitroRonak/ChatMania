import { useAppStore } from "@/store"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ContactsContainer from "./components/Contacts-Container";
import ChatContainer from "./components/Chat-Container";
import EmptyChatContainer from "./components/Empty-Chat-Container";

const Chat = () => {
  const {userInfo,selectedChatType,selectedChatData} = useAppStore();
  const navigate= useNavigate();
  useEffect(()=>{
    if(!userInfo?.profileSetup){
      toast("Please setup profile to continue...")
      navigate("/profile")
    }
  },[userInfo,navigate])
  return (
    <div className="flex w-full h-[100vh] text-white overflow-hidden">
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
