import {RiCloseFill} from "react-icons/ri"
const ChatHeader = () => {
  return (
    <div className="h-[10vh] border-b-2 border-[#2f303b] flex justify-between items-center px-20">
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2 justify-center">

        </div>
        <div className="flex items-center gap-5 justify-center">
            <button className="text-neutral-400  focus:border-none focus:outline-none focus:text-white duration-300 transition-all">
                <RiCloseFill className="text-3xl"/>
            </button>
        </div>
      </div>
    </div>
  );
};
export default ChatHeader;