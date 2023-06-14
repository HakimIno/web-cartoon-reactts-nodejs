import {
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/slider";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import VideoPlayer from "../components/Player/VideoPlayer";
import Sidebar from "../components/Sidebar";
import AWS from "aws-sdk";
import ReactHlsPlayer from "react-hls-player";
import PlayeTest from "../components/Player/PlyrComponent";
import PlyrComponent from "../components/Player/PlyrComponent";
import { Drawer } from "@mantine/core";
import { ListBulletIcon } from "@heroicons/react/24/solid";

interface VideoPlayer extends HTMLVideoElement {
  player?: any;
}

const Watch = () => {
  const [showMenu, setShowMenu] = useState<boolean>(true);
  const [videos, setVideos] = useState<any>([]);

  const { videoId } = useParams();
  const playerRef = useRef<VideoPlayer>(null);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    const fetchVideoId = async () => {
      const res = await axios.get(
        `http://localhost:8800/api/videos/find/${videoId}`
      );
      setVideos(res.data);
    };
    fetchVideoId();
  }, []);

  return (
    <div className="h-screen bg-[#fafafa] overflow-y-hidden">
      <div className="">
        <Navbar showMenu={showMenu} setShowMenu={setShowMenu} />
      </div>

      <div className="flex h-full w-full grow  overflow-y-hidden ">
        <Drawer
          opened={!showMenu}
          onClose={() => setShowMenu(!showMenu)}
          withCloseButton={false}
          size="216"
          overlayOpacity={0.3}
          title={
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
          }
          padding="md"
        ></Drawer>

        <div className="mt-0 lg:mt-[24px] mx-auto">
          <div className="">
          {/*   <VideoPlayer src={videos.videoUrl} /> */}

            <PlyrComponent url={videos.videoUrl} />
            <h1 className="">{videos.title}</h1>

             {/* <div className="w-[1280px] ml-20">
              <ReactHlsPlayer
                playerRef={playerRef}
                src="https://main.77player.xyz/m3u8/ae0daf1d8f760a85597a7b2b/ae0daf1d8f760a85597a7b2b438.m3u8"
                autoPlay={false}
                controls={true}
                width="100%"
              />
            </div> */}

            {/*  https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4 */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Watch;
