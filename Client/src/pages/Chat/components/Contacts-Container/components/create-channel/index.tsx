import {
    Dialog,
    DialogHeader,
    DialogContent,
    DialogTitle,
  } from "@/components/ui/dialog";
  import { Input } from "@/components/ui/input";
  import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
  } from "@/components/ui/tooltip";
  import { TooltipProvider } from "@/components/ui/tooltip";
  import { useEffect, useState } from "react";
  import { FaPlus } from "react-icons/fa";
  import { apiClient } from "@/lib/api-client";
  import { GET_ALL_CONTACTS_ROUTE, SEARCH_CONTACT_ROUTE } from "@/utils/constants";
  import { useAppStore } from "@/store";
import { Button } from "@/components/ui/button";
import MultipleSelector from "@/components/ui/multipleselect";
  
  const CreateChannel = () => {
      const {setSelectedChatType,setSelectedChatData} = useAppStore();
    const [newChannelModal, setNewChannelModal] =
      useState<boolean>(false);
    const [searchedContact, setSearchedContact] = useState<Array<any>>([]);
    const [allContacts, setAllContacts] = useState<Array<any>>([]);
    const [selectedContacts, setSelectedContacts] = useState<Array<any>>([]);
    const [channelName, setChannelName] = useState<string>("");

    useEffect(()=>{
        const getData = async () => {
            try {
                const response = await apiClient.get(GET_ALL_CONTACTS_ROUTE,{
                    withCredentials:true
                })
                if(response.status === 200 && response.data.contacts){
                    setAllContacts(response.data.contacts);
                }
            }
            catch(error){
                console.log(error);
            }
        }
        getData();
    },[])
  
    const createChannel = async () => {
        try {
            
        } catch (error) {
            
        }
    }
    return (
      <>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <FaPlus
                className="text-2xl text-gray-500 cursor-pointer hover:text-gray-300"
                onClick={() => setNewChannelModal(true)}
              />
            </TooltipTrigger>
            <TooltipContent className="bg-purple-500 text-white rounded-md mb-3 p-2 border-none">
              Create New Channel
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
  
        {/* Dialog */}
        <Dialog open={newChannelModal} onOpenChange={setNewChannelModal}>
          <DialogContent className="bg-gray-800 text-white border-none w-[400px] h-[400px] flex flex-col gap-5">
            <DialogHeader>
              <DialogTitle>Please fill the details to create a new channel</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col justify-center">
              <Input
                placeholder="Channel Name"
                className="bg-gray-700 text-white border-none w-full h-[40px] rounded-md"
                onChange={(e) => setChannelName(e.target.value)}
                value={channelName}
              />
            </div>
            <div>
                <MultipleSelector
                    className="rounded-lg bg-gray-700 border-none  text-white focus:outline-none focus:ring-0 focus:border-none"
                    defaultOptions={allContacts}
                    placeholder="Select Contacts"
                    value={selectedContacts}
                    onChange={(e)=>setSelectedContacts(e)}
                    emptyIndicator={<div className="text-lg leading-10">No contacts found</div>}
                />
            </div>
            <div>
                <Button className="bg-blue-800 text-white rounded-md p-3 cursor-pointer hover:bg-blue-950 w-full transition-all duration-300" onClick={createChannel}
                >
                    Create Channel
                </Button>
            </div>
  
          </DialogContent>
        </Dialog>
      </>
    );
  };
  
  export default CreateChannel;
  
