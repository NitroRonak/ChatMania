import { useAppStore } from "@/store";
import { useEffect, useRef,useState } from "react";
import moment from "moment";
import { apiClient } from "@/lib/api-client";
import { GET_MESSAGES_ROUTE, HOST } from "@/utils/constants";
import {  FaFile } from "react-icons/fa";
import {IoArrowDown,IoClose} from "react-icons/io5"
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
    setFileDownloadProgress
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
    if (selectedChatData._id) {
      if (selectedChatType === "contact") getMessages();
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

  const DownloadFile = async (fileUrl:any) => {
    setIsDownloading(true);
    setFileDownloadProgress(0);
    const response = await apiClient.get(`${HOST}/${fileUrl}`,{
      responseType: "blob",
      withCredentials: true,
      onDownloadProgress: (progressEvent:any) => {
        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setFileDownloadProgress(progress);
      }
    })
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
  }
  const renderMessages = () => {
    let lastDate: any = null;
    return selectedChatMessages.map((message: any, index: number) => {
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
            {
              checkIfImage(message.fileUrl) ? (
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    setShowImageEnlarge(true);
                    setImageUrl(message.fileUrl);
                  }}
                >
                  <img src={`${HOST}/${message.fileUrl}`} alt="image" height={300} width={300} />
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <span className="text-white/80 text-3xl bg-black/20 rounded-full p-2">
                    <FaFile />
                  </span>
                  <span className="text-white/80 text-sm">
                    {message.fileUrl.split("/").pop()}
                  </span>
                  <span className="text-white/80 text-xl bg-gray-500/20 rounded-full p-1 cursor-pointer transition-all duration-300 hover:bg-green-500/30"
                    onClick={() => DownloadFile(message.fileUrl)}
                  >
                    <IoArrowDown />
                  </span>
                </div>
              )
            }
          </div>
        )}

        <div className="text-xs text-gray-500">
          {moment(message.timestamp).format("LT")}
        </div>
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
            <img src={`${HOST}/${imageUrl}`} alt="enlarged" className="h-[80vh] w-full bg-cover bg-center" />
          </div>
          <div className="flex fixed gap-5 top-0 mt-5">
            <button
              className="text-white/80 text-3xl bg-gray-500/20 rounded-full p-1 cursor-pointer transition-all duration-300 hover:bg-green-500/30"
              onClick={() => DownloadFile(imageUrl)}>
              <IoArrowDown />
            </button>
            <button
              className="text-white/80 text-3xl bg-gray-500/20 rounded-full p-1 cursor-pointer transition-all duration-300 hover:bg-red-500/30"
              onClick={() => {
                setShowImageEnlarge(false)
                setImageUrl(null)
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
