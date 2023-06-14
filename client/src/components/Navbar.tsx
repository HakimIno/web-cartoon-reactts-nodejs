import React, { useState } from "react";

import { VideoCameraIcon } from "@heroicons/react/24/solid";
import { ListBulletIcon } from "@heroicons/react/24/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { ClockIcon, BookmarkIcon, UserIcon } from "@heroicons/react/24/outline";

import { Link } from "react-router-dom";
import Buttons from "./From/Buttons";
import CardListWatchLast from "./CardList/CardListWatchLast";

const Navbar: React.FC<{
  showMenu: boolean;
  setShowMenu: any;
}> = ({ showMenu, setShowMenu }) => {
  const [searchBar, setSearchBar] = useState<string>("");

  return (
    <div className="flex justify-between items-center px-6 h-16 bg-[#f8fafc] opacity-95 top-0  drop-shadow-md sticky">
      <div className="flex gap-8 items-center text-2xl">
        <div className="hidden lg:flex">
          <ListBulletIcon
            className="h-6 w-6 text-[#000000] cursor-pointer"
            onClick={() => setShowMenu(!showMenu)}
          />
        </div>
        <Link to="/">
          <div className=" flex gab-1 items-center justify-center cursor-pointer">
            <span className="font-class text-[20px] md:text-[26px] text-sky-500 font-medium">
              chill<span className="text-indigo-500">&</span>chill
            </span>
          </div>
        </Link>
      </div>

      <div className=" items-center justify-center gap-5 hidden lg:flex">
        <form action="">
          <div className=" flex bg-slate-50 items-center h-[38px] px-4 pr-0 rounded-3xl border border-slate-300 drop-shadow-sm">
            <div className=" flex gap-4 items-center pr-5">
              <input
                value={searchBar}
                type="text"
                className="ml-2 w-[528px] h-[36px] bg-slate-50 focus:outline-none border-none "
                onChange={(e) => setSearchBar(e.target.value)}
              />
              {searchBar !== "" ? (
                <XMarkIcon className="h-5 w-5 text-slate-500 cursor-pointer" onClick={() => setSearchBar("")} />
              ) : (
                <div className="h-5 w-5"></div>
              )}
              <div className="w-[1px] h-4 bg-slate-300"></div>
              <div>
                <MagnifyingGlassIcon className="h-6 w-6 text-slate-500 cursor-pointer" />
              </div>
            </div>
          </div>
        </form>
      </div>

      <div className="flex justify-center items-center">
        {/*  <div className="hidden lg:flex ">
          <Buttons />
          
        </div> */}
        <div className="px-4 lg:px-6 cursor-pointer">
          <MagnifyingGlassIcon className=" h-6 w-6 text-slate-500 cursor-pointer flex lg:hidden " />
        </div>
        <div className="px-4 lg:px-6 cursor-pointer p-20 hidden lg:block">
          <div className="group inline-block relative ">
            <ClockIcon className="h-6 w-6 text-slate-900 cursor-pointer inline-flex items-center " />

            <ul className="absolute hidden text-gray-700 pt-1 group-hover:block right-0">
              <li className="">
                <a
                  className="rounded-t bg-white w-96 rounded-lg  py-2 px-4 block whitespace-no-wrap "
                  href="#"
                >
                  วันนี้
                  <CardListWatchLast images="https://ichef.bbci.co.uk/news/976/cpsprodpb/F382/production/_123883326_852a3a31-69d7-4849-81c7-8087bf630251.jpg" />
                  <CardListWatchLast images="https://img1.ak.crunchyroll.com/i/spire3/d23bea1cbe84833135f94695d900f0651651339079_main.png" />
                  <CardListWatchLast images="https://cdn.vox-cdn.com/thumbor/xBIBkXiGLcP-kph3pCX61U7RMPY=/0x0:1400x788/1200x800/filters:focal(588x282:812x506)/cdn.vox-cdn.com/uploads/chorus_image/image/70412073/0377c76083423a1414e4001161e0cdffb0b36e1f_760x400.0.png" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pr-4 lg:pr-6 cursor-pointer hidden md:block">
          <BookmarkIcon className="h-6 w-6 text-slate-900 cursor-pointer " />
        </div>
       
      </div>
    </div>
  );
};

export default Navbar;
