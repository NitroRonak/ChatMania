import { useAppStore } from "@/store";
import { RiCloseFill } from "react-icons/ri";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { HOST } from "@/utils/constants";
import { getColor } from "@/lib/utils";
const ChatHeader = () => {
  const { closeChat, selectedChatData,selectedChatType } = useAppStore();
  return (
    <div className="h-[10vh] border-b-2 border-[#2f303b] flex justify-between items-center px-20">
      <div className="flex items-center gap-5 justify-between w-full">
        <div className="flex items-center gap-2">
          <div className="w-12 h-12 relative">
            <Avatar className="h-12 w-12 rounded-full overflow-hidden">
              {selectedChatData?.image ? (
                <AvatarImage
                  src={`${HOST}/${selectedChatData?.image}`}
                  alt="profile"
                  className="object-cover w-full h-full bg-black"
                />
              ) : (
                <div
                  className={`uppercase h-12 w-12 text-lg border-[1px] flex items-center justify-center rounded-full ${getColor(
                    selectedChatData?.color as number
                  )}`}
                >
                  {selectedChatData?.firstName
                    ? selectedChatData?.firstName.split("").shift()
                    : selectedChatData?.email.split("").shift()}
                </div>
              )}
            </Avatar>
          </div>
          <div>
            {
              selectedChatType === "contact" && 
              selectedChatData?.firstName ?
              `${selectedChatData?.firstName} ${selectedChatData?.lastName}`
              :
              selectedChatData?.email
            }
          </div>
        </div>
        <div className="flex items-center gap-5 justify-center">
          <button
            className="text-neutral-400  cursor-pointer focus:border-none focus:outline-none focus:text-white duration-300 transition-all"
            onClick={closeChat}
          >
            <RiCloseFill className="text-3xl" />
          </button>
        </div>
      </div>
    </div>
  );
};
export default ChatHeader;
