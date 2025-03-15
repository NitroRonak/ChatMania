import { useAppStore } from "@/store";
import { useEffect, useRef } from "react";
import moment from "moment";
const MessageContainer = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { selectedChatMessages, selectedChatType, userInfo, selectedChatData } =
    useAppStore();
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedChatMessages]);
  console.log("selectedChatMessages", selectedChatMessages);
  console.log("selectedChatType", selectedChatType);
  const renderMessages = () => {
    let lastDate = null;
    return selectedChatMessages.map((message, index) => {
      const messageDate = moment(message.timestamp).format("YYYY-MM-DD");
      const showDate = messageDate !== lastDate;
      lastDate = messageDate;
      console.log("message", message);
      return (
        <div key={index}>
          {showDate && (
            <div className="text-center text-gray-500 my-2 text-sm">
              {moment(message.timestamp).format("LL")}
            </div>
          )}
          {selectedChatType === "contact" && renderDMMessage(message)}
        </div>
      );
    });
  };

  const renderDMMessage = (message: any) => {
    return (
      <div
        className={`${
          message.sender === selectedChatData._id ? "text-right" : "text-left"
        }`}
      >
        {message.messageType === "text" && (
          <div
            className={`${
              message.sender !== selectedChatData._id
                ? "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]/50"
                : "bg-[#2a2b33]/5 text-white/80 border-white/20"
            } border inline-block p-4 rounded my-1 max-w-[50%] break-words`}
          >
            {message.content}
          </div>
        )}
        <div className="text-xs text-gray-500">
          {moment(message.timestamp).format("LT")}
        </div>
      </div>
    );
  };
  return (
    <div className="flex-1 overflow-auto scrollbar-hidden p-4 px-8 md:w-[65vw] lg:w-[75vw] xl:w-[75vw]">
      {renderMessages()}
      <div ref={scrollRef}></div>
    </div>
  );
};

export default MessageContainer;
