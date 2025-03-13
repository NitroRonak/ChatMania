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
import Lottie from "react-lottie";
import animationData from "@/assets/lottie-json.json";

import { TooltipProvider } from "@/components/ui/tooltip";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { apiClient } from "@/lib/api-client";
import { HOST, SEARCH_CONTACT_ROUTE } from "@/utils/constants";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { getColor } from "@/lib/utils";

const NewDM = () => {
  const [openNewContactModal, setOpenNewContactModal] =
    useState<boolean>(false);
  const [searchedContact, setSearchedContact] = useState<Array<any>>([]);

  const searchContact = async (searchTerm: string) => {
    try {
      if (searchTerm.length > 0) {
        const response = await apiClient.post(
          SEARCH_CONTACT_ROUTE,
          { searchTerm },
          {
            withCredentials: true,
          }
        );
        if (response.status === 200 && response.data.contacts) {
          setSearchedContact(response.data.contacts);
        }
      } else {
        setSearchedContact([]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <FaPlus
              className="text-2xl text-gray-500 cursor-pointer hover:text-gray-300"
              onClick={() => setOpenNewContactModal(true)}
            />
          </TooltipTrigger>
          <TooltipContent className="bg-purple-500 text-white rounded-md mb-3 p-2 border-none">
            Select new contact
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Dialog */}
      <Dialog open={openNewContactModal} onOpenChange={setOpenNewContactModal}>
        <DialogContent className="bg-gray-800 text-white border-none w-[400px] h-[400px] flex flex-col gap-5">
          <DialogHeader>
            <DialogTitle>Please select a contact</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col justify-center">
            <Input
              placeholder="Search for a contact"
              className="bg-gray-700 text-white border-none w-[300px] h-[40px] rounded-md"
              onChange={(e) => searchContact(e.target.value)}
            />
          </div>

          {/* To show the searched contacts */}
          <ScrollArea className="h-[250px]">
            <div className="flex flex-col gap-5">
              {searchedContact.map((contact) => (
                <div
                  key={contact._id}
                  className="flex items-center gap-5 cursor-pointer"
                >
                  <div className="w-12 h-12 relative">
                    <Avatar className="h-12 w-12 rounded-full overflow-hidden">
                      {contact.image ? (
                        <AvatarImage
                          src={`${HOST}/${contact.image}`}
                          alt="profile"
                          className="object-cover w-full h-full bg-black"
                        />
                      ) : (
                        <div
                          className={`uppercase h-12 w-12 text-lg border-[1px] flex items-center justify-center rounded-full ${getColor(
                            contact.color as number
                          )}`}
                        >
                          {contact.firstName
                            ? contact.firstName.split("").shift()
                            : contact.email.split("").shift()}
                        </div>
                      )}
                    </Avatar>
                  </div>
                  <div className="flex flex-col">
                    <span>
                      {contact.firstName && contact.lastName
                        ? `${contact.firstName} ${contact.lastName}`
                        : ""}
                    </span>
                    <span className="text-white/80 text-xs">
                      {contact.email}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {searchedContact.length <= 0 && (
            <div className="flex-1 md:bg-gray-800 md:flex flex-col hidden items-center justify-center duration-300 transition-all">
              <Lottie
                isClickToPauseDisabled={true}
                height={150}
                width={150}
                options={{
                  loop: true,
                  autoplay: true,
                  animationData: animationData,
                }}
              />
              <div className="text-white/80 flex flex-col gap-5 items-center mt-2 lg:text-2xl text-xl transition-all duration-300 text-center">
                <h3 className="doto-stylefont">
                  Hi<span className="text-purple-300">!</span> Search new{" "}
                  <span className="text-purple-300">Contact</span>
                </h3>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NewDM;
