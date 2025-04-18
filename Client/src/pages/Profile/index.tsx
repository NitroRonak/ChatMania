import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { colors, getColor } from "@/lib/utils";
import { useAppStore } from "@/store";
import { useEffect, useRef, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { FaPlus, FaTrash } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { apiClient } from "@/lib/api-client";
import { HOST, REMOVE_PROFILE_IMAGE_ROUTE, UPDATE_PROFILE_IMAGE_ROUTE, UPDATE_PROFILE_ROUTE } from "@/utils/constants";
import { useNavigate } from "react-router-dom";
const Profile = () => {
  const { userInfo,setUserInfo } = useAppStore();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [image, setImage] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<any>(0);
  const [hovered, setHovered] = useState<boolean>(false);
  const fileUploadRef = useRef(null);


  useEffect(()=>{
    if(userInfo?.profileSetup){
      setFirstName(userInfo?.firstName || "");
      setLastName(userInfo?.lastName || "");
      setSelectedColor(userInfo?.color);
    }
    if(userInfo?.image){
      setImage(`${HOST}/${userInfo?.image}`);
    }
  },[userInfo])

  const validateProfile = ()=>{
    if(!firstName){
      toast("first name is required");
      return false;
    }
    if(!lastName){
      toast("last name is required");
      return false;
    }
    return true;
  }
  const saveChanges = async ()=>{
    if(validateProfile()){
      try {
        const res = await apiClient.post(UPDATE_PROFILE_ROUTE,{
          firstName,
          lastName,
          color:selectedColor
        },{
          withCredentials:true
        })
        if(res.status === 200 && res.data){
          setUserInfo({...res.data})
          toast.success("Profile Setup Successfully");
          navigate("/chat");
        }
      } catch (error:any) {
        toast.error("Error while setup the profile..")
      }
    }
  }

  const handleNavigate = ()=>{
    if(userInfo?.profileSetup){
      navigate("/chat")
    }
    else{
      toast("Please setup your profile first...")
    }
  }

  const handleFileInputClick = ()=>{
    // @ts-ignore
    fileUploadRef.current.click();
  };
  const handleImageDelete = async ()=>{
    const res = await apiClient.delete(REMOVE_PROFILE_IMAGE_ROUTE,{
      withCredentials:true
    })
    if(res.status === 200 && res.data){
      setImage(null);
      // @ts-ignore
      setUserInfo({...userInfo,image:null})
      toast.success("Image removed successfully.");
    }
  }
  const handleImageChange = async (event:any)=>{
    const file = event.target.files[0];
    console.log(file);
    if(file){
      const formData = new FormData();
      formData.append("profile-image",file)
      const res = await apiClient.post(
        UPDATE_PROFILE_IMAGE_ROUTE,
        formData,
        {
          withCredentials:true
        }
      )
      if(res.status === 200 && res.data.image){
        // @ts-ignore
        setUserInfo({...userInfo,image:res.data.image})
        toast.success("Image updated successfully.")
      }
    }
  }
  return (
    <div className="bg-[#1b1c24] h-[100vh] flex items-center justify-center flex-col gap:10">
      <div className="flex flex-col gap-10 w-[80vw] md:w-max">
        <div onClick={handleNavigate}>
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
              <div className="absolute h-32 w-32 md:w-48 md:48 inset-0 flex items-center justify-center bg-gray-200/50 rounded-full self-center mx-auto"
              onClick={image ? handleImageDelete : handleFileInputClick}
              >
                {image ? (
                  <FaTrash className="text-red-500 text-3xl cursor-pointer" />
                ) : (
                  <FaPlus className="text-white text-3xl cursor-pointer" />
                )}
              </div>
            )}
            <input type="file" ref={fileUploadRef} className="hidden" onChange={handleImageChange} name="profile-image" accept=".png, .jpg, .jpeg, .svg, .webp"/>
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
                value={firstName}
                className="rounded-lg p-6 bg-[#2c2e3b] border-none"
              />
            </div>
            <div className="w-full">
              <input
                placeholder="Last Name"
                type="text"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
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
              <Button className="h-16 w-full bg-purple-500 hover:bg-purple-600 transition-all duration-300 cursor-pointer font-bold"
              onClick={saveChanges}
              >
                Save Changes
              </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
