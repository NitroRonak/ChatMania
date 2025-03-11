import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Victory from "../../assets/victory.svg";
const Auth = () => {
  return (
    <div className="h-[100vh] w-[100vw] flex items-center justify-center">
      <div className="h-[80vh] bg-white border-2 border-white text-opacity-90 shadow-2xl w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid xl:grid-cols-2 ">
        <div className="flex flex-col items-center justify-center gap-10">
          <div className="flex flex-col items-center justify-center gap-5">
            <div className="flex items-center justify-center">
              <h1 className="text-5xl font-bold md:text-6xl">Welcome</h1>
              <img src={Victory} alt="Victory Emoji" className="h-[100px]" />
            </div>
            <p className="font-medium text-center">
              Fill up the form to get started
            </p>
          </div>
          <div className="flex items-center justify-center w-full">
            <Tabs className="w-3/4">
              <TabsList className="w-full bg-transparent rounded-none">
                <TabsTrigger
                  value="signin"
                  className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-3 rounded-none w-full data-[state=active]:text-black data-[state=active]:border-purple-500 data-[state=active]:font-semibold p-3 transition-all duration-300 ease-in-out"
                >
                  Sign In
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-3 rounded-none w-full data-[state=active]:text-black data-[state=active]:border-purple-500 data-[state=active]:font-semibold p-3 transition-all duration-300 ease-in-out"
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>
              <TabsContent value="signin">
                <h1 className="text-3xl font-bold md:text-4xl">Sign In</h1>
                
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
