import React from "react";
import { Link } from "react-router-dom";

const CardHome: React.FC<{
  showMenu: boolean;
  videos: any;
  index: any;
}> = ({ showMenu, videos, index }) => {
  const formattedViews = (number: any) => {
    let formattedNumber = number;

    if (number >= 1000000) {
      formattedNumber = `${(number / 1000000).toFixed(1)} ล้าน`;
    } else if (number >= 100000) {
      formattedNumber = `${(number / 100000).toFixed(0)} แสน`;
    } else if (number >= 10000) {
      formattedNumber = `${(number / 10000).toFixed(0)} หมื่น`;
    } else if (number >= 1000) {
      formattedNumber = `${(number / 1000).toFixed(0)} พัน`;
    }

    return formattedNumber;
  };

  return (
    <div
      className={`origin-left duration-500 ${
        showMenu ? "w-[320px]" : "w-[338px]"
      },${showMenu ? "h-[200px]" : "h-[216px]"} md:w-full group`}
      key={index}
    >
      <Link to={`/watch/${videos._id}`}>
        <img
          src={videos?.imgUrl}
          alt=""
          className={` ${
            showMenu ? "h-44" : "h-48"
          } object-cover rounded-xl cursor-pointer hover:scale-105 
        transition duration-300 ease-in-out group-hover:border group-hover:border-sky-500 w-full`}
        />
      </Link>

      <div className="mt-3 flex w-full">
        {/* <img
          src="https://ichef.bbci.co.uk/news/976/cpsprodpb/F382/production/_123883326_852a3a31-69d7-4849-81c7-8087bf630251.jpg"
          alt=""
          className="w-10 h-9 rounded-full cursor-pointer object-center"
        /> */}
        <div className="mx-2 w-80 ">
          <Link to={`/watch/${videos?._id}`}>
            <span className="font-semibold text-md text-gray-600 group-hover:text-sky-600  cursor-pointer line-clamp-2">
              {videos?.title}
            </span>
          </Link>
          <div className="flex justify-between w-full ">
            <div className=" text-slate-500 line-clamp-1 w-[8rem] font-medium text-[14px]">
              kimsnow
            </div>
            <span className=" text-slate-500 font-medium text-[13px]">
              การดู {formattedViews(videos?.views)} ครั้ง
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardHome;
