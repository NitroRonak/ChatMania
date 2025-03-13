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

const NewDM = () => {
  const [openNewContactModal, setOpenNewContactModal] =
    useState<boolean>(false);
  const [searchedContact, setSearchedContact] = useState<string>("");

  const searchContact = async (contact: string) => {
    console.log(contact);
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
        <DialogContent className="bg-gray-800 text-white border-none w-[400px] h-[400px] flex flex-col items-center">
          <DialogHeader>
            <DialogTitle>Please select a contact</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center">
            <Input
              placeholder="Search for a contact"
              className="bg-gray-700 text-white border-none w-[300px] h-[40px] rounded-md"
              onChange={(e) => searchContact(e.target.value)}
            />
          </div>
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
                  Hi<span className="text-purple-300">!</span>
                  {" "}Search new{" "}
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
