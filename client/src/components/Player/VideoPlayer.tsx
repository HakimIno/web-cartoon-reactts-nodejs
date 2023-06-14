import {
  Box,
  Button,
  Flex,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Spinner,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import PlayIcon from "./PlayIcon";
import PauseIcon from "./PauseIcon";
import FullScreen from "./FullScreen";
import ElapsedTimeTracker from "./ElapsedTimeTracker";
import screenfull from "screenfull";
import Lottie from "react-lottie";
import _ from "lodash";
import animationData from "../../../public/Robo_Head.json";
import { SpeakerWaveIcon, SpeakerXMarkIcon } from "@heroicons/react/24/solid";

const Video = styled.video`
  flex-shrink: 1;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.75rem;
`;

interface Props {
  src: string;
  muted?: boolean;
  autoPlay?: boolean;
}

const VideoPlayer = (props: Props) => {
  const { src, autoPlay } = props;

  const [muted, setMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isWaiting, setIsWaiting] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [durationSec, setDurationSec] = useState(1);
  const [elapsedSec, setElapsedSec] = useState(1);
  const [volume, setVolume] = useState<any>(0.5);
  const [isHovering, setIsHovering] = useState(false);
  const [isMouseMoving, setIsMouseMoving] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const playerContainer = useRef<HTMLDivElement>(null);
  const timerRef = useRef();
  const progressRef = useRef<HTMLDivElement>(null);
  const bufferRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    const onPlay = () => {
      setIsPlaying(true);
    };

    const onPause = () => {
      setIsPlaying(false);
      setIsWaiting(false);
    };

    const onWaiting = () => {
      if (isPlaying) setIsPlaying(false);
      setIsWaiting(true);
    };

    const onTimeUpdate = () => {
      setIsWaiting(false);
      if (!element.buffered || !progressRef.current) return;
      const duration = element.duration;
      setDurationSec(duration);
      setElapsedSec(element.currentTime);
      if (progressRef && duration > 0) {
        progressRef.current.style.width =
          (element.currentTime / duration) * 100 + "%";
      }
    };

    const onProgress = () => {
      if (!element.buffered || !bufferRef.current) return;
      if (!element.buffered.length) return;
      const bufferedEnd = element.buffered.end(element.buffered.length - 1);
      const duration = element.duration;
      if (bufferRef && duration > 0) {
        bufferRef.current.style.width = (bufferedEnd / duration) * 100 + "%";
      }
    };

    const element = videoRef.current;

    element.addEventListener("progress", onProgress);
    element.addEventListener("timeupdate", onTimeUpdate);
    element.addEventListener("play", onPlay);
    element.addEventListener("playing", onPlay);
    element.addEventListener("pause", onPause);
    element.addEventListener("waiting", onWaiting);

    return () => {
      element.removeEventListener("play", onPlay);
      element.removeEventListener("playing", onPlay);
      element.removeEventListener("pause", onPause);
      element.removeEventListener("waiting", onWaiting);
      element.removeEventListener("timeupdate", onTimeUpdate);
      element.removeEventListener("progress", onProgress);
    };
  }, [videoRef.current]);

  const handlePlayPauseClick = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };

  const seekToPosition = (pos: number) => {
    if (!videoRef.current) return;
    if (pos < 0 || pos > 1) return;

    const durationMs = videoRef.current.duration * 1000 || 0;

    const newElapsedMs = durationMs * pos;
    const newTimeSec = newElapsedMs / 1000;
    videoRef.current.currentTime = newTimeSec;
  };

  const onVolumeChange = (e: number) => {
    if (videoRef.current) {
      setVolume(e / 100);
      videoRef.current.volume = e / 100;
    }
  };

  const handleMouseMove = () => {
    setIsHovering(true);
    setIsMouseMoving(true);
    setTimeout(() => {
      setIsHovering(false);
      setIsMouseMoving(false);
    }, 5000);
  };

  return (
    <Box sx={{ width: 1200, height: 700 }}>
      <Flex
        cursor={isMouseMoving ? "default" : "none"}
        rounded="10px"
        pos={"relative"}
        margin={{ base: "10px", lg: "25px" }}
        w={[
          "31%",
          "31%", // 30em-48em
          "66%", // 48em-62em
          "100%", // 62em+
        ]}
        ref={playerContainer}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          setIsHovering(false);
          setIsMouseMoving(false);
        }}
      >
        <Flex
          display="flex"
          justifyContent="center"
          alignItems="center"
          w="100%"
          h="100%"
          pos="absolute"
        >
          {isWaiting && (
            <Spinner
              thickness="10px"
              speed="0.65s"
              emptyColor="blue.50"
              color="#0CAADC"
              size="xl"
            />
          )}
        </Flex>
        <Flex
          display="flex"
          justifyContent="center"
          alignItems="center"
          w="100%"
          h="100%"
          pos="absolute"
          transition="opacity 0.5s linear"
          className="timeline-container"
          opacity={isHovering ? 1 : 0}
        >
          {isWaiting === true ? (
            ""
          ) : (
            <Button
              w="100%"
              h="100%"
              rounded="4px"
              colorScheme="transparent"
              overflow="hidden"
              bg="transparent"
              _hover={{
                bg: "rgba(0, 0, 0, 0.4)",
              }}
              onClick={handlePlayPauseClick}
            >
              {!isPlaying ? <PlayIcon /> : <PauseIcon />}
            </Button>
          )}
        </Flex>
        <Video
          autoPlay={true}
          muted={muted}
          onVolumeChange={volume}
          src={src}
          ref={videoRef}
          onClick={handlePlayPauseClick}
        />
        ;
        <Flex
          w="100%"
          h="100px"
          bg="linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5))"
          pos="absolute"
          opacity={isHovering ? 1 : 0}
          transition="opacity 0.5s linear"
          className="timeline-container"
          rounded="10px"
          left={0}
          bottom={0}
          align="flex-end"
          px="1rem"
          cursor="pointer"
        >
          <Flex flexDir="column" w="100%">
            <Flex
              w="100%"
              transition="height 0.1s linear"
              className="timeline"
              h="5px"
              mb="0.5rem"
              rounded="10px"
              bg="rgba(193, 193, 193, 0.5)"
              _hover={{ height: "7px" }}
              overflow="hidden"
              onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                const { left, width } = e.currentTarget.getBoundingClientRect();
                const clickedPos = (e.clientX - left) / width;
                seekToPosition(clickedPos);
              }}
            >
              <Flex pos="relative" w="100%" h="100%">
                <Flex
                  h="100%"
                  className="play-progress rounded-lg"
                  bg="#0CAADC"
                  zIndex={1}
                  ref={progressRef}
                />

                <Flex
                  pos="absolute"
                  h="100%"
                  className="buffer-progress rounded-lg"
                  bg="#FDFFFC"
                  ref={bufferRef}
                />
              </Flex>
            </Flex>
            <Flex w="100%" justify="space-between" align="center">
              <Flex align="center">
                <Button
                  maxW="28px"
                  minW="28px"
                  w="28px"
                  p="0"
                  mr="0.4rem"
                  maxH="28px"
                  h="28px"
                  rounded="4px"
                  colorScheme="transparent"
                  bg="transparent"
                  mb="0.5rem"
                  _hover={{
                    bg: "rgba(0, 0, 0, 0.4)",
                  }}
                  onClick={handlePlayPauseClick}
                >
                  {!isPlaying ? <PlayIcon /> : <PauseIcon />}
                </Button>

                <ElapsedTimeTracker
                  totalSec={durationSec}
                  elapsedSec={elapsedSec}
                />

                <Flex
                  align="center"
                  className="elapsed-time-tracker"
                  gap="4px"
                  transition="500ms opacity"
                  mt="-8px"
                  p={0}
                  w="100%"
                  mx="2"
                >
                  <Flex alignItems={"center"} gap={1} width={"24"}>
                    <Box onClick={() => setMuted(!muted)} mx="2">
                      {!muted ? (
                        <SpeakerWaveIcon className="h-5 w-5 text-white cursor-pointer" />
                      ) : (
                        <SpeakerXMarkIcon className="h-5 w-5 text-white cursor-pointer" />
                      )}
                    </Box>

                    {/*  <Slider
                    ria-label="slider-ex-1"
                    min={0}
                    max={100}
                    defaultValue={volume * 100}
                    size="md"
                    onChangeStart={onVolumeChange}
                    onChangeEnd={onVolumeChange}
                  >
                    <SliderTrack bg="blue.50">
                      <SliderFilledTrack bg="#0CAADC" />
                    </SliderTrack>
                    <SliderThumb bg="#0CAADC" boxSize={2} />
                  </Slider> */}
                  </Flex>
                </Flex>
              </Flex>

              <Button
                maxW="28px"
                minW="28px"
                w="28px"
                p="0"
                mr="0.4rem"
                maxH="28px"
                h="28px"
                rounded="4px"
                colorScheme="transparent"
                bg="transparent"
                mb="0.5rem"
                _hover={{
                  bg: "rgba(0, 0, 0, 0.4)",
                }}
                onClick={() => {
                  if (playerContainer.current !== null) {
                    screenfull.toggle(playerContainer.current);
                  }
                }}
              >
                <FullScreen />
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default VideoPlayer;
