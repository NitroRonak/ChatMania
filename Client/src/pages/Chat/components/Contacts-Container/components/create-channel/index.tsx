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
  TooltipProvider,
} from "@/components/ui/tooltip";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { apiClient } from "@/lib/api-client";
import { CREATE_CHANNEL_ROUTE, GET_ALL_CONTACTS_ROUTE } from "@/utils/constants";
import { useAppStore } from "@/store";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Pill from "./Pill";

interface Contact {
  value: string;
  label: string;
}

const CreateChannel = () => {
  const { addChannel } = useAppStore();
  const [newChannelModal, setNewChannelModal] = useState(false);
  const [allContacts, setAllContacts] = useState<Contact[]>([]);
  const [selectedContacts, setSelectedContacts] = useState<Contact[]>([]);
  const [channelName, setChannelName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await apiClient.get(GET_ALL_CONTACTS_ROUTE, {
          withCredentials: true,
        });
        if (response.status === 200 && response.data.contacts) {
          setAllContacts(response.data.contacts);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const handleContactSelect = (contact: Contact) => {
    setSelectedContacts((prev) => [...prev, contact]);
    setSearchTerm("");
  };

  const handleContactDeselect = (contact: Contact) => {
    setSelectedContacts((prev) => prev.filter((c) => c.value !== contact.value));
    setSearchTerm("");
  };

  const createChannel = async () => {
    if (!channelName.trim() || selectedContacts.length === 0) return;
    try {
      const response = await apiClient.post(
        CREATE_CHANNEL_ROUTE,
        {
          name: channelName,
          members: selectedContacts.map((c) => c.value),
        },
        { withCredentials: true }
      );
      if (response.status === 201 && response.data.channel) {
        toast.success(response.data.message);
        setChannelName("");
        setSearchTerm("");
        setSelectedContacts([]);
        setNewChannelModal(false);
        addChannel(response.data.channel);
      }
    } catch (error) {
      toast.error("Failed to create channel");
    }
  };

  // Filter available contacts (not selected & matching search)
  const filteredContacts = searchTerm.length > 0 ? allContacts.filter(
    (contact) =>
      !selectedContacts.some((c) => c.value === contact.value) &&
      contact.label.toLowerCase().includes(searchTerm.toLowerCase())
  ):[];

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
        <DialogContent className="bg-gray-800 text-white border-none w-[400px] h-[450px] flex flex-col gap-5">
          <DialogHeader>
            <DialogTitle>Create a New Channel</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            {/* Selected contacts */}
            <div className="flex flex-wrap gap-2">
              {selectedContacts.map((contact) => (
                <Pill
                  key={contact.value}
                  text={contact.label}
                  onClick={() => handleContactDeselect(contact)}
                />
              ))}
            </div>

            {/* Channel name input */}
            <Input
              type="text"
              placeholder="Channel Name"
              value={channelName}
              className="border-none bg-transparent text-white placeholder:text-gray-400 p-3"
              onChange={(e) => setChannelName(e.target.value)}
            />

            {/* Search input */}
            <Input
              type="text"
              placeholder="Search contacts..."
              value={searchTerm}
              className="border-none bg-transparent text-white placeholder:text-gray-400 p-3"
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* Contact list */}
            {filteredContacts.length > 0 && (
              <ul className="border border-gray-600 rounded-md max-h-40 overflow-y-auto">
                {filteredContacts.map((contact) => (
                  <li
                    key={contact.value}
                    className="p-3 cursor-pointer hover:bg-gray-600 rounded-md transition-all duration-200"
                    onClick={() => handleContactSelect(contact)}
                  >
                    {contact.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          <Button
            className="bg-blue-800 text-white rounded-md p-3 cursor-pointer hover:bg-blue-950 w-full transition-all duration-300"
            onClick={createChannel}
            disabled={!channelName.trim() || selectedContacts.length === 0}
          >
            Create Channel
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateChannel;
