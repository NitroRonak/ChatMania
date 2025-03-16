import { useAppStore } from "@/store";
import { useEffect, useRef, useState } from "react";
import moment from "moment";
import { apiClient } from "@/lib/api-client";
import { GET_CHANNEL_MESSAGES_ROUTE, GET_MESSAGES_ROUTE, HOST } from "@/utils/constants";
import { FaFile } from "react-icons/fa";
import { IoArrowDown, IoClose } from "react-icons/io5";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Avatar } from "@/components/ui/avatar";
import { getColor } from "@/lib/utils";
const MessageContainer = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showImageEnlarge, setShowImageEnlarge] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<any>(null);
  const {
    selectedChatMessages,
    selectedChatType,
    userInfo,
    selectedChatData,
    setSelectedChatMessages,
    setIsDownloading,
    setFileDownloadProgress,
  } = useAppStore();

  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await apiClient.post(
          GET_MESSAGES_ROUTE,
          { id: selectedChatData._id },
          {
            withCredentials: true,
          }
        );
        if (response.status === 200 && response.data.messages) {
          setSelectedChatMessages(response.data.messages);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const getChannelMessages = async () => {
      try {
        const response = await apiClient.get(`${GET_CHANNEL_MESSAGES_ROUTE}/${selectedChatData._id}`, {
          withCredentials: true
        })
        if (response.status === 200 && response.data.messages) {
          setSelectedChatMessages(response.data.messages);
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (selectedChatData._id) {
      if (selectedChatType === "contact") getMessages();
      if (selectedChatType === "channel") getChannelMessages();
    }
  }, [selectedChatData, selectedChatType, setSelectedChatMessages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedChatMessages]);

  const checkIfImage = (filePath: any) => {
    const imageRegex = /.*\.(jpg|jpeg|png|gif|svg|webp)$/i;
    return imageRegex.test(filePath);
  };

  const DownloadFile = async (fileUrl: any) => {
    setIsDownloading(true);
    setFileDownloadProgress(0);
    const response = await apiClient.get(`${HOST}/${fileUrl}`, {
      responseType: "blob",
      withCredentials: true,
      onDownloadProgress: (progressEvent: any) => {
        const progress = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setFileDownloadProgress(progress);
      },
    });
    const urlBlob = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = urlBlob;
    link.setAttribute("download", fileUrl.split("/").pop() || "download");
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(urlBlob);
    setIsDownloading(false);
    setFileDownloadProgress(0);
  };
  const renderMessages = () => {
    let lastDate: any = null;
    console.log("chat type", selectedChatType);
    return selectedChatMessages.map((message: any, index: number) => {
      console.log("message", message);
      const messageDate = moment(message.timestamp).format("YYYY-MM-DD");
      const showDate = messageDate !== lastDate;
      lastDate = messageDate;
      return (
        <div key={index}>
          {showDate && (
            <div className="text-center text-gray-500 my-2 text-sm">
              {moment(message.timestamp).format("LL")}
            </div>
          )}
          {selectedChatType === "contact" && renderDMMessage(message)}
          {selectedChatType === "channel" && renderChannelMessage(message)}
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

        {message.messageType === "file" && (
          <div
            className={`${
              message.sender !== selectedChatData._id
                ? "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]/50"
                : "bg-[#2a2b33]/5 text-white/80 border-white/20"
            } border inline-block p-4 rounded my-1 max-w-[50%] break-words`}
          >
            {checkIfImage(message.fileUrl) ? (
              <div
                className="cursor-pointer"
                onClick={() => {
                  setShowImageEnlarge(true);
                  setImageUrl(message.fileUrl);
                }}
              >
                <img
                  src={`${HOST}/${message.fileUrl}`}
                  alt="image"
                  height={300}
                  width={300}
                />
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <span className="text-white/80 text-3xl bg-black/20 rounded-full p-2">
                  <FaFile />
                </span>
                <span className="text-white/80 text-sm">
                  {message.fileUrl.split("/").pop()}
                </span>
                <span
                  className="text-white/80 text-xl bg-gray-500/20 rounded-full p-1 cursor-pointer transition-all duration-300 hover:bg-green-500/30"
                  onClick={() => DownloadFile(message.fileUrl)}
                >
                  <IoArrowDown />
                </span>
              </div>
            )}
          </div>
        )}

        <div className="text-xs text-gray-500">
          {moment(message.timestamp).format("LT")}
        </div>
      </div>
    );
  };

  const renderChannelMessage = (message: any) => {
    return (
      <div
        className={`mt-5 ${
          message.sender._id !== userInfo?.id ? "text-left" : "text-right"
        }`}
      >
        {message.messageType === "text" && (
          <div
            className={`${
              message.sender._id === userInfo?.id
                ? "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]/50"
                : "bg-[#2a2b33]/5 text-white/80 border-white/20"
            } border inline-block p-4 rounded my-1 max-w-[50%] break-words ml-9`}
          >
            {message.content}
          </div>
        )}

{message.messageType === "file" && (
          <div
            className={`${
              message.sender._id === userInfo?.id
                ? "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]/50"
                : "bg-[#2a2b33]/5 text-white/80 border-white/20"
            } border inline-block p-4 rounded my-1 max-w-[50%] break-words`}
          >
            {checkIfImage(message.fileUrl) ? (
              <div
                className="cursor-pointer"
                onClick={() => {
                  setShowImageEnlarge(true);
                  setImageUrl(message.fileUrl);
                }}
              >
                <img
                  src={`${HOST}/${message.fileUrl}`}
                  alt="image"
                  height={300}
                  width={300}
                />
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <span className="text-white/80 text-3xl bg-black/20 rounded-full p-2">
                  <FaFile />
                </span>
                <span className="text-white/80 text-sm">
                  {message.fileUrl.split("/").pop()}
                </span>
                <span
                  className="text-white/80 text-xl bg-gray-500/20 rounded-full p-1 cursor-pointer transition-all duration-300 hover:bg-green-500/30"
                  onClick={() => DownloadFile(message.fileUrl)}
                >
                  <IoArrowDown />
                </span>
              </div>
            )}
          </div>
        )}

        {message.sender._id !== userInfo?.id ? (
          <div className="flex items-center gap-2 justify-start">
            <Avatar className="h-8 w-8 rounded-full overflow-hidden">
              {message.sender.image && (
                <AvatarImage
                  src={`${HOST}/${message.sender.image}`}
                  alt="profile"
                  className="object-cover w-full h-full bg-black"
                />
              )}
              <AvatarFallback
                className={`uppercase h-8 w-8 text-lg flex items-center justify-center rounded-full ${getColor(
                  message.sender.color as number
                )}`}
              >
                {message.sender.firstName
                  ? message.sender.firstName.split("").shift()
                  : message.sender.email.split("").shift()}
              </AvatarFallback>
            </Avatar>
            <span className="text-white/60 text-sm">
              {`${message.sender.firstName} ${message.sender.lastName}`}
            </span>
            <span className="text-white/60 text-sm">
              {moment(message.timestamp).format("LT")}
            </span>
          </div>
        ) : (
          <div className="text-white/60 text-sm mt-1">
            {moment(message.timestamp).format("LT")}
          </div>
        )}
      </div>
    );
  };
  return (
    <div className="flex-1 overflow-auto scrollbar-hidden p-4 px-8 md:w-[65vw] lg:w-[75vw] xl:w-[75vw] scroll-smooth transition-all duration-300">
      {renderMessages()}
      <div ref={scrollRef}></div>
      {showImageEnlarge && (
        <div className="fixed z-[1000] top-0 left-0 w-[100vw] h-[100vh] bg-black/50 flex flex-col items-center justify-center backdrop-blur-lg ">
          <div>
            <img
              src={`${HOST}/${imageUrl}`}
              alt="enlarged"
              className="h-[80vh] w-full bg-cover bg-center"
            />
          </div>
          <div className="flex fixed gap-5 top-0 mt-5">
            <button
              className="text-white/80 text-3xl bg-gray-500/20 rounded-full p-1 cursor-pointer transition-all duration-300 hover:bg-green-500/30"
              onClick={() => DownloadFile(imageUrl)}
            >
              <IoArrowDown />
            </button>
            <button
              className="text-white/80 text-3xl bg-gray-500/20 rounded-full p-1 cursor-pointer transition-all duration-300 hover:bg-red-500/30"
              onClick={() => {
                setShowImageEnlarge(false);
                setImageUrl(null);
              }}
            >
              <IoClose />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageContainer;
