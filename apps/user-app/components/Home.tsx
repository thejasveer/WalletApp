import { Button } from "@repo/ui/button";

import { useRouter } from "next/navigation";
import { ReactTyped } from "react-typed";
export const Home = () => {
  return (
    <div className="min-h-screen flex justify-center ">
      <div className=" w-full    z-20 p-2  sm:p-20 gap-10 flex flex-col-reverse     lg:flex-row items-center">
        <BannerHeadline />

        <div className="relative w-full h-full   lg:w-1/2   flex justify-center items-center">
          <DesktopView />
          <div className="absolute left-5 -top-22">
            <MobileUi />
          </div>
          <div className="absolute top-1/2 left-50">
            <Explore />
          </div>
        </div>
      </div>
    </div>
  );
};

const BannerHeadline = () => {
  return (
    <div className=" text-center w-full lg:w-1/2  flex sm:flex-col flex-col justify-start gap-5 ">
      <div className="bg-no-repeat    bg-contain bg-center bg-blend-multiply bg-[url('./bg.webp')] w-full h-40 sm:h-96  "></div>
      <h1 className="w-full text-5xl text-black s gap-5 text-center">
        Simplify Your
      </h1>
      <h1 className="text-5xl text-[#6a51a6] ">
        <ReactTyped strings={[" Payments"]} typeSpeed={200} loop />
      </h1>
    </div>
  );
};

const Explore = () => {
  const router = useRouter();

  return (
    <Button
      transparent={false}
      onClick={() => {
        router.push("/signin");
      }}
    >
      {" "}
      Lets get Started
    </Button>
  );
};

const DesktopView = () => {
  return (
    <div className="w-full">
      <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[8px] rounded-t-xl h-[294px]  max-w-[472px]">
        <div
          className="relative rounded-lg overflow-hidden h-[278px] bg-white 
         bg-[url('./ss.png')] bg-no-repeat    bg-cover bg-blend-multiply
        "
        ></div>
      </div>
      <div className="relative mx-auto bg-gray-900 dark:bg-gray-700 rounded-b-xl rounded-t-sm h-[17px]  md:h-[21px]  max-w-[662px]">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 rounded-b-xl w-[56px] h-[5px] md:w-[96px] md:h-[8px] bg-gray-800"></div>
      </div>
    </div>
  );
};

const MobileUi = () => {
  return (
    <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[400px]  w-[230px] ">
      <div className="h-[32px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[72px] rounded-s-lg"></div>
      <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
      <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
      <div className="h-[64px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"></div>
      <div className="rounded-[2rem] overflow-hidden   h-[372px]  bg-white  bg-[url('./demo.gif')] bg-no-repeat    bg-cover bg-blend-multiply ">
        {/* <img src="./demo.gif" className="  w-[272px] h-[372px]" /> */}
      </div>
    </div>
  );
};
