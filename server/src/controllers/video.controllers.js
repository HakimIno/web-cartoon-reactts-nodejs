import { createError } from "../error.js";
import User from "../models/User.js";
import Video from "../models/Video.js";
import { v4 as uuidv4 } from "uuid";
import AWS from "aws-sdk";

import { uploadImageFileToS3, uploadVideoToS3 } from "../middewere/videos.middewere.js";

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

export const addVideo = async (req, res, next) => {
  const video = req.files && req.files.videoUrl && req.files.videoUrl[0];
  const image = req.files && req.files.imageUrl && req.files.imageUrl[0];
  const qualities = ['480', '1080'];

  try {
    const imgUrl = await uploadImageFileToS3(image);
    const videoUrl = await Promise.all(qualities.map((quality) => uploadVideoToS3(video, quality)));

    const newVideo = new Video({
      userId: req.user.id,
      imgUrl,
      videoUrl,
      ...req.body,
    });

    newVideo.save((error, video) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.status(200).send({
          message:
            "Video uploaded successfully && Images uploaded successfully",
        });
      }
    });
  } catch (error) {
    next(error);
  }
};

export const updateVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, "Video not found!"));

    if (req.user.id === video.userId) {
      const updatedVideo = await Video.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedVideo);
    } else {
      return next(createError(403, "You can update only your video!"));
    }
  } catch (error) {
    next(error);
  }
};

export const deleteVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, "Video not found!"));

    if (req.user.id === video.userId) {
      await Video.findOneAndDelete(req.params.id);
      res.status(200).json(" The video has been deleted!");
    } else {
      return next(createError(403, "You can update only your video!"));
    }
  } catch (error) {
    next(error);
  }
};

export const getVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);

    const URL = video.videoUrl.split("?")[0];
    const splitUrl = URL.substring(URL.indexOf("/") + 1);
    const splitTwoUrl = splitUrl.substring(splitUrl.indexOf("/") + 1);
    const key = splitTwoUrl.substring(splitTwoUrl.indexOf("/") + 1);

    if (!video) {
      return res.status(404).send("Video not found");
    }

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME_VIDEO,
      Key: key,
      Expires: 60 * 60 * 2,
    };

    const videoUrl = s3.getSignedUrl("getObject", params); // Get pre-signed URL

    const responseData = { videoUrl: videoUrl, video: video };
    res.status(200).json(responseData);
  } catch (error) {
    next(error);
  }
};

export const addView = async (req, res, next) => {
  try {
    await Video.findOneAndUpdate(req.params.id, {
      $inc: { views: 1 },
    });

    res.status(200).json("The view has been increased");
  } catch (error) {
    next(error);
  }
};

export const trend = async (req, res, next) => {
  try {
    const videos = await Video.find().sort({ views: -1 });

    res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
};

export const random = async (req, res, next) => {
  try {
    const videos = await Video.aggregate([{ $sample: { size: 40 } }]);

    res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
};

export const sub = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    const subscribedChannels = user.subscribedUsers;

    const list = await Promise.all(
      subscribedChannels.map((channelId) => {
        return Video.find({ userId: channelId });
      })
    );

    res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
  } catch (error) {
    next(error);
  }
};
