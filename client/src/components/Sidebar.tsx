import React, { useState } from "react";
import { HomeIcon } from "@heroicons/react/24/outline";
import { ComputerDesktopIcon } from "@heroicons/react/24/outline";
import { FireIcon } from "@heroicons/react/24/outline";
import { FunnelIcon } from "@heroicons/react/24/outline";

type Props = {};

const Sidebar: React.FC<{
  showMenu: boolean;
  positionCheck: string;
}> = ({ showMenu, positionCheck }) => {
  const mainLinks = [
    {
      icon: (
        <HomeIcon className="h-5 w-5 text-slate-500  cursor-pointer group-hover:fill-sky-700" />
      ),
      name: "หน้าหลัก",
    },
    {
      icon: (
        <ComputerDesktopIcon className="h-5 w-5 text-slate-500  cursor-pointer group-hover:fill-sky-700" />
      ),
      name: "ติดตาม",
    },
    {
      icon: (
        <FireIcon className="h-5 w-5 text-slate-500  cursor-pointer group-hover:fill-sky-700 " />
      ),
      name: "มาแรงในตอนนี้",
    },
    {
      icon: (
        <FunnelIcon className="h-5 w-5 text-slate-500  cursor-pointer group-hover:fill-sky-700" />
      ),
      name: "หมวดหมู่",
    },
  ];
  return (
    <div
      className={`${
        showMenu ? "w-64" : "w-16"
      }  bg-[#fff] h-[93%] duration-500 overflow-y-hidden shadow hidden lg:flex  ${positionCheck}`}
    >
      <ul className="flex flex-col bg-[#fff] w-full rounded-md">
        {mainLinks.map(({ icon, name }) => {
          return (
            <li
              key={name}
              className={`group pl-5 py-3 hover:bg-sky-50 hover:ring-sky-50 gap-x-4 cursor-pointer rounded-md flex items-center ${
                name === "หน้าหลัก" ? "bg-sky-100" : ""
              }`}
            >
              <a href="#" className="">
                {icon}
              </a>
              <span
                className={`${
                  !showMenu && "hidden"
                } origin-left duration-500 font-SF text-sm text-slate-500 group-hover:text-sky-700  `}
              >
                {name}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
