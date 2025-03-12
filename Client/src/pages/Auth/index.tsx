import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Victory from "../../assets/victory.svg";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import AuthImage from "@/assets/login2.png"
import { toast } from "sonner";
import { apiClient } from "@/lib/api-client";
import { SIGNIN_ROUTE, SIGNUP_ROUTE } from "@/utils/constants";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/store";
const Auth = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const navigate: any = useNavigate();
  const {setUserInfo} = useAppStore()
  const validateSignIn = () => {
    if(!email.length) {
      toast.error("Email is required")
      return false
    }
    if(!password.length) {
      toast.error("Password is required") 
      return false
    }
    return true
  }
  const validateSignUp = () => {
    if(!email.length) {
      toast.error("Email is required")
      return false
    }
    if(!password.length) {
      toast.error("Password is required") 
      return false
    }
    if(!confirmPassword.length) {
      toast.error("Confirm Password is required")
      return false
    }
    if(password !== confirmPassword) {
      toast.error("Password and Confirm Password do not match")
      return false
    }
    return true
  }
  const handleSignIn = async () => {
    if(validateSignIn()) {
      const res = await apiClient.post(SIGNIN_ROUTE, {
        email,
        password
      },{
        withCredentials: true
      })
      if(res.data.user.id) {
        setUserInfo(res.data.user);
        if(res.data.user.profileSetup) {
          navigate("/chat")
        }
        else {
          navigate("/profile")
        }
      }
      console.log(res)
    }
    
  }
  const handleSignUp = async () => {
    if(validateSignUp()) {
      const res = await apiClient.post(SIGNUP_ROUTE, {
        email,
        password
      },{
        withCredentials: true
      })
      if(res.status === 201) {
        setUserInfo(res.data.user);
        navigate("/profile")
      }
      console.log(res)
    }
  }
  return (
    <div className="bg-[#1b1c24] h-[100vh] w-[100vw] flex items-center justify-center text-white">
      <div className="h-[80vh] bg-transparent border-2 border-white text-opacity-90 shadow-2xl w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid xl:grid-cols-2 ">
        <div className="flex flex-col items-center justify-center gap-10">
          <div className="flex flex-col items-center justify-center gap-5">
            <div className="flex items-center justify-center">
              <h1 className="text-3xl font-bold md:text-6xl">Welcome</h1>
              <img src={Victory} alt="Victory Emoji" className="h-[100px]" />
            </div>
            <p className="font-medium text-center">
              Fill up the form to get started
            </p>
          </div>
          <div className="flex items-center justify-center w-full">
            <Tabs className="w-3/4" defaultValue="signin">
              <TabsList className="w-full bg-transparent rounded-none">
                <TabsTrigger
                  value="signin"
                  className="data-[state=active]:bg-transparent text-white text-opacity-90 border-b-3 rounded-none w-full data-[state=active]:text-purple-500 data-[state=active]:border-purple-500 data-[state=active]:font-semibold p-3 transition-all duration-300 ease-in-out"
                >
                  Sign In
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="data-[state=active]:bg-transparent text-white text-opacity-90 border-b-3 rounded-none w-full data-[state=active]:text-purple-500 data-[state=active]:border-purple-500 data-[state=active]:font-semibold p-3 transition-all duration-300 ease-in-out"
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>
              <TabsContent value="signin" className="flex flex-col gap-5 items-center justify-center mt-10">
                <h1 className="text-3xl font-bold md:text-4xl">Sign In</h1>
                <Input 
                placeholder="Email"       className="rounded-full p-6"
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
                />
                <Input 
                   placeholder="Password"
                   className="rounded-full p-6"
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}

                />
                <Button className="w-full p-6 rounded-full cursor-pointer" onClick={handleSignIn}>Sign In</Button>
              </TabsContent>
              <TabsContent value="signup"
                className="flex flex-col gap-5 items-center justify-center"
              >
                <h1 className="text-3xl font-bold md:text-4xl">Sign Up</h1>
                <Input 
                  placeholder="Email" 
                  className="rounded-full p-6"  
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input 
                  placeholder="Password" 
                  className="rounded-full p-6" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} 
                />
                <Input 
                  placeholder="Confirm Password" 
                  className="rounded-full p-6" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)} 
                />
                <Button className="w-full p-6 rounded-full cursor-pointer" onClick={handleSignUp}>Sign Up</Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <div className="hidden xl:flex items-center justify-center">
          <img
            src={AuthImage}
            alt="Auth Image"
            className="w-full h-[400px]"
          />
        </div>
      </div>
    </div>
  );
};

export default Auth;
