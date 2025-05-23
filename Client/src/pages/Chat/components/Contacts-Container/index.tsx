import { useEffect } from "react";
import NewDM from "./components/new-dm";
import ProfileInfo from "./components/profile-info";
import { apiClient } from "@/lib/api-client";
import { GET_CONTACTS_FOR_DM_LIST_ROUTE, GET_USER_CHANNELS_ROUTE } from "@/utils/constants";

import ContactList from "@/components/contact-list";
import { useAppStore } from "@/store";
import CreateChannel from "./components/create-channel";
import { toast } from "sonner";
const ContactsContainer = () => {
  const {directMessagesContacts,setDirectMessagesContacts,channels,setChannels} = useAppStore();
  useEffect(()=>{
    const getContacts = async () => {
      try {
        const response = await apiClient.get(GET_CONTACTS_FOR_DM_LIST_ROUTE,{
          withCredentials:true
        })
        if(response.status === 200 && response.data.contacts){
          setDirectMessagesContacts(response.data.contacts)
        }
      } catch (error) {
        console.error(error);
      }
    }
    const getChannels = async () => {
      try {
        const response = await apiClient.get(GET_USER_CHANNELS_ROUTE,{
          withCredentials:true
        })
        if(response.status === 200 && response.data.channels){
          setChannels(response.data.channels)
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to get channels");
      }
    }
    getContacts();
    getChannels();
  },[])
  return (
    <div className="relative w-full md:w-[35vw] lg:w-[30vw] bg-gray-800 xl:w-[25vw]  border-r-2 border-gray-200 h-full">
      <div className="pt-3">
        <Logo/>
      </div>
      <div className="my-5 px-2">
        <div className="flex items-center justify-between pr-10">
            <Title text="Direct Messages"/>
            <NewDM/>
        </div>
        <div className="max-h-[30vh] overflow-y-auto scrollbar-hidden px-2">
          <ContactList contacts={directMessagesContacts} isChannel={false}/>
        </div>
      </div>
      <div className="my-5 px-2">
        <div className="flex items-center justify-between pr-10">
            <Title text="Channels"/>
            <CreateChannel/>
        </div>
        <div className="max-h-[30vh] overflow-y-auto scrollbar-hidden px-2">
          <ContactList contacts={channels} isChannel={true}/>
        </div>
      </div>
      <ProfileInfo/>
    </div>
  )
}

export default ContactsContainer

const Logo = () => {
    return (
      <div className="flex p-5  justify-start items-center gap-2">
        <svg
          id="logo-38"
          width="78"
          height="32"
          viewBox="0 0 78 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {" "}
          <path
            d="M55.5 0H77.5L58.5 32H36.5L55.5 0Z"
            className="ccustom"
            fill="#8338ec"
          ></path>{" "}
          <path
            d="M35.5 0H51.5L32.5 32H16.5L35.5 0Z"
            className="ccompli1"
            fill="#975aed"
          ></path>{" "}
          <path
            d="M19.5 0H31.5L12.5 32H0.5L19.5 0Z"
            className="ccompli2"
            fill="#a16ee8"
          ></path>{" "}
        </svg>
        <span className="text-3xl font-semibold ">Chat Mania</span>
      </div>
    );
  };
  
  export {Logo};


  const Title = ({text}:{text:string}) => {
    return (
        <h6 className="uppercase tracking-widest text-neutral-400 font-light text-opacity-80 text-sm">
            {text}                  
        </h6>
    )
  }
