import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Tooltip } from "@/components/ui/tooltip";
import { TooltipProvider } from "@/components/ui/tooltip";
import { getColor } from "@/lib/utils";
import { useAppStore } from "@/store";
import { HOST, LOGOUT_ROUTE } from "@/utils/constants";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {IoLogOut} from "react-icons/io5"
import { apiClient } from "@/lib/api-client";
import { toast } from "sonner";
const ProfileInfo = () => {
  const { userInfo,setUserInfo } = useAppStore();
  const navigate = useNavigate();

  const LogOut = async() => {
    try {
        const res = await apiClient.post(LOGOUT_ROUTE,{},{
            withCredentials:true
        });
        if(res.status === 200){
            navigate("/auth");
            setUserInfo(undefined);
            toast.success("Logout Successfully");
        }
    } catch (error) {
        console.log(error);
        toast.error("Logout Failed");
    }
  }
  return (
    <div className="absolute bottom-0 h-16 flex justify-center items-center gap-5 w-full bg-[#d8d8d813]">
      <div className="flex items-center justify-center gap-2">
        <div className="w-12 h-12 relative">
          <Avatar className="h-12 w-12 rounded-full overflow-hidden">
            {userInfo?.image ? (
              <AvatarImage
                src={`${HOST}/${userInfo?.image}`}
                alt="profile"
                className="object-cover w-full h-full bg-black"
              />
            ) : (
              <div
                className={`uppercase h-12 w-12 text-lg border-[1px] flex items-center justify-center rounded-full ${getColor(
                  userInfo?.color as number
                )}`}
              >
                {userInfo?.firstName
                  ? userInfo?.firstName.split("").shift()
                  : userInfo?.email.split("").shift()}
              </div>
            )}
          </Avatar>
        </div>
        <div>
          {userInfo?.firstName && userInfo?.lastName && (
            <h1 className="text-sm font-semibold">
              {userInfo?.firstName} {userInfo?.lastName}
            </h1>
          )}
        </div>
      </div>
      <div className="flex gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger
                onClick={() => {
                    navigate("/profile")
                }}
            >
                <FaEdit className="text-2xl" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Edit Profile</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger
                onClick={LogOut}
            >
                <IoLogOut className="text-2xl text-red-500" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Logout</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default ProfileInfo;
