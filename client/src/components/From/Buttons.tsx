import React from "react";
import { VideoCameraIcon } from "@heroicons/react/24/solid";

const Buttons = () => {
  return (
    <div className="">
      <a
        href="#_"
        className="inline-flex items-center justify-center  px-3 py-[2.5px] text-sm font-medium text-center text-blue-600 no-underline align-middle 
        transition-all duration-300 ease-in-out bg-transparent border border-blue-600 border-solid rounded-lg cursor-pointer 
        select-none hover:text-blue-400 hover:border-blue-400 focus:shadow-xs focus:no-underline"
      >
        <VideoCameraIcon className="h-4 w-5 text-blue-500 mr-1 " />
        สร้างสรรค์
      </a>
    </div>
  );
};

export default Buttons;
