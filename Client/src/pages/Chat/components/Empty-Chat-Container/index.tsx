import Lottie from "react-lottie";
import animationData from "@/assets/lottie-json.json";
const EmptyChatContainer = () => {
  return (
    <div className="flex-1 md:bg-gray-800 md:flex flex-col hidden items-center justify-center duration-300 transition-all">
      <Lottie
        isClickToPauseDisabled={true}
        height={200}
        width={200}
        options={{
          loop: true,
          autoplay: true,
          animationData: animationData,
        }}
      />
      <div className="text-white/80 flex flex-col gap-5 items-center mt-10 lg:text-4xl text-3xl transition-all duration-300 text-center">
        <h3 className="doto-stylefont">
            Hi <span className="text-purple-700">!</span>
            Welcome to the <span className="text-purple-700">Chat Mania</span>
        </h3>
        <p className="doto-stylefont text-white-500/80 text-lg">
            Start chatting with your friends and family
        </p>
      </div>
    </div>
  );
};

export default EmptyChatContainer;
