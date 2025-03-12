import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { colors, getColor } from "@/lib/utils";
import { useAppStore } from "@/store";
import { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { FaPlus, FaTrash } from "react-icons/fa";
import { Button } from "@/components/ui/button";
const Profile = () => {
  const { userInfo } = useAppStore();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [image, setImage] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<number>(0);
  const [hovered, setHovered] = useState<boolean>(false);
  return (
    <div className="bg-[#1b1c24] h-[100vh] flex items-center justify-center flex-col gap:10">
      <div className="flex flex-col gap-10 w-[80vw] md:w-max">
        <div>
          <IoArrowBack className="text-4xl lg:text-6xl text-white/90 cursor-pointer" />
        </div>
        <div className="grid grid-cols-2">
          <div
            className="h-full w-full md:w-48 md:h-48 relative flex items-center justify-center"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <Avatar className="h-32 w-32 md:w-48 md:48 rounded-full overflow-hidden">
              {image ? (
                <AvatarImage
                  src={image}
                  alt="profile"
                  className="object-cover w-full h-full bg-black"
                />
              ) : (
                <div
                  className={`uppercase h-32 w-32 md:48 md:h-48 text-5xl border-[1px] flex items-center justify-center rounded-full ${getColor(
                    selectedColor
                  )}`}
                >
                  {firstName
                    ? firstName.split("").shift()
                    : userInfo?.email.split("").shift()}
                </div>
              )}
            </Avatar>
            {hovered && (
              <div className="absolute h-32 w-32 md:w-48 md:48 inset-0 flex items-center justify-center bg-gray-200/50 rounded-full self-center mx-auto">
                {image ? (
                  <FaTrash className="text-red-500 text-3xl cursor-pointer" />
                ) : (
                  <FaPlus className="text-white text-3xl cursor-pointer" />
                )}
              </div>
            )}
            {/* <input type="text" /> */}
          </div>

          <div className="flex min-w-32 md:min-w-64 flex-col items-center justify-center gap-5 text-white">
            <div className="w-full">
              <input
                placeholder="Email"
                type="email"
                disabled
                value={userInfo?.email}
                className="rounded-lg p-6 bg-[#2c2e3b] border-none"
              />
            </div>
            <div className="w-full">
              <input
                placeholder="First Name"
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
                value={userInfo?.firstName}
                className="rounded-lg p-6 bg-[#2c2e3b] border-none"
              />
            </div>
            <div className="w-full">
              <input
                placeholder="Last Name"
                type="text"
                onChange={(e) => setLastName(e.target.value)}
                value={userInfo?.lastName}
                className="rounded-lg p-6 bg-[#2c2e3b] border-none"
              />
            </div>
            <div className="w-full flex gap-5">
              {
                colors.map((color,index)=>{
                  return (
                    <div className={`${color} h-8 w-8 rounded-full transition-all duration-300 cursor-pointer ${selectedColor === index ? "outline-2 outline-white/80":""}`}
                    key={index}
                    onClick={()=>setSelectedColor(index)}
                    >
                      
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
        <div className="w-full">
              <Button className="h-16 w-full bg-purple-500 hover:bg-purple-600 transition-all duration-300 cursor-pointer font-bold">
                Save Changes
              </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
