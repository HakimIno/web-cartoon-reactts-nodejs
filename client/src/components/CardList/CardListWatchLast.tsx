import React from "react";

const CardListWatchLast: React.FC<{ images: string }> = ({ images }) => {
  return (
    <div className="w-full flex justify-center py-2">
      <div className="w-52">
        <img
          src={`${images}`}
          className="h-24 w-full rounded-lg border border-gray-300"
          alt=""
        />
      </div>

      <div className="ml-3 w-72">
        <span className="flex line-clamp-2 text-[0.9rem] text-slate-900">
          เนซึโกะที่อยากหลับให้สบาย [ ดาบพิฆาตอสูร อนิเมชั่น ]
        </span>
        <span className="line-clamp-1 text-[0.8rem] text-slate-600">
          Kimnsow
        </span>
      </div>
    </div>
  );
};

export default CardListWatchLast;
