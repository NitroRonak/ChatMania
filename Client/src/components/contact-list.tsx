import { useAppStore } from "@/store";
import { Avatar, AvatarImage } from "./ui/avatar";
import { HOST } from "@/utils/constants";
import { getColor } from "@/lib/utils";

const ContactList = ({contacts,isChannel=false}:{contacts:any[],isChannel:boolean}) => {
    const {setSelectedChatData,setSelectedChatType,selectedChatData,selectedChatType,setSelectedChatMessages} = useAppStore();

    const handleContactClick = (contact:any) => {
        setSelectedChatData(contact);
        setSelectedChatType(isChannel ? "channel" : "contact");
        if(selectedChatData && selectedChatData._id !== contact._id){
            setSelectedChatMessages([]);
        }
    }

    return (
        <div className="mt-5">
            {contacts.map((contact)=>(
                <div key={contact._id} className={`pl-5 py-2 cursor-pointer transition-all duration-300 ${selectedChatData && selectedChatData._id === contact._id ? "bg-[#7617b5] rounded-md hover:bg-[#71376497]" : "rounded-md hover:bg-[#71376497]"}`} onClick={()=>handleContactClick(contact)}>
                    
                    <div className="flex items-center gap-5 justify-start text-neutral-200">
                        {
                            !isChannel && (
                                <Avatar className="h-10 w-10 rounded-full overflow-hidden">
                                {contact?.image ? (
                                  <AvatarImage
                                    src={`${HOST}/${contact?.image}`}
                                    alt="profile"
                                    className="object-cover w-full h-full bg-black"
                                  />
                                ) : (
                                  <div
                                    className={`uppercase h-10 w-10 text-lg border-[1px] flex items-center justify-center rounded-full ${getColor(
                                      contact?.color as number
                                    )}`}
                                  >
                                    {contact?.firstName
                                      ? contact?.firstName.split("").shift()
                                      : contact?.email.split("").shift()}
                                  </div>
                                )}
                              </Avatar>
                            )
                        }
                        {
                            isChannel && (
                                <div className="bg-[#4d0e4d] h-10 w-10 rounded-full flex items-center justify-center">
                                    #
                                </div>
                            )
                        }
                        {
                            isChannel ? <span>{contact?.name}</span> : <span>{contact.firstName ? `${contact.firstName} ${contact.lastName}` : contact.email}</span>
                        }
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ContactList;
