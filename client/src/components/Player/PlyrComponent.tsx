import { useRef } from "react";
import Plyr, { APITypes } from "plyr-react";
import "plyr-react/plyr.css";

const PlyrComponent: React.FC<{
  url: string;
}> = ({ url }) => {
  const ref = useRef<APITypes>(null);

  const controls = [
    "play-large", // The large play button in the center
    "rewind", // Rewind by the seek time (default 10 seconds)
    "play", // Play/pause playback
    "fast-forward", // Fast forward by the seek time (default 10 seconds)
    "progress", // The progress bar and scrubber for playback and buffering
    "current-time", // The current time of playback
    "duration", // The full duration of the media
    "mute", // Toggle mute
    "volume", // Volume control
    "captions", // Toggle captions
    "settings", // Settings menu
    "fullscreen", // Toggle fullscreen
  ];

  const sources = [
    {
      src: "/yt1s.com-Template_LOGIN_REGISTER_HTMLResponsive_144ppFHR.mp4",
      type: "video/mp4",
      size: 144,
    },
    {
      src: "/yt1s.com-Template_LOGIN_REGISTER_HTMLResponsive_1080pFHR.mp4",
      type: "video/mp4",
      size: 1080,
    },
  ];

  const plyrVideo = (
    <Plyr
      ref={ref}
      source={{
        type: "video",
        sources: [{ src: url }],
      }}
      options={{
        controls,
        muted: false,
        speed: { selected: 1, options: [] },
        quality: {
          default: 144,
          options: [144, 1080],
        },
      }}
    />
  );

  return <div className="w-full lg:w-[1280px]">{plyrVideo}</div>;
};

export default PlyrComponent;
