import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Sidebar from "../components/Sidebar";
import CardHome from "../components/CardList/CardHome";
import axios from "axios";

const Home: React.FC<{ type: any }> = ({ type }) => {
  const [showMenu, setShowMenu] = useState<boolean>(true);
  const [videos, setVideos] = useState<any>([]);

  useEffect(() => {
    const fetchVideo = async () => {
      const res = await axios.get("http://localhost:8800/api/videos/random");
      setVideos(res.data);
    };
    fetchVideo();
  }, [type]);

  return (
    <div className="h-screen bg-[#fafafa]">
      <div>
        <Navbar showMenu={showMenu} setShowMenu={setShowMenu} />
      </div>
      <div className="flex h-[90vh] scrollbar">
        <Sidebar showMenu={showMenu} positionCheck="" />
        {/* overflow-y-scroll  overflow-x-hidden scrollbar */}
        <div className=" grow w-[calc(100%-240px)] h-full  overflow-y-scroll  overflow-x-hidden scrollbar">
          <div className="p-3 md:p-8 pt-5 grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {videos.map((video: any , index: any) => (
              <CardHome showMenu={showMenu} videos={video} index={index} />
            ))}
            
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
