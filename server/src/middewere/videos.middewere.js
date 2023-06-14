import { v4 as uuidv4 } from "uuid";
import ffmpeg from 'fluent-ffmpeg'
import stream from 'stream'
import AWS from "aws-sdk";

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

export async function uploadVideoToS3(file, quality) {
  const token = uuidv4();
  const encoder = ffmpeg(file.buffer);
  const ffmpegArgs = ["-preset", "slow", "-crf", "18"];
  const encodingParams = {
    480: {
      resolution: "854x480",
      bitrate: "1500k",
    },
    1080: {
      resolution: "1920x1080",
      bitrate: "6000k",
    },
  };
  const { resolution, bitrate } = encodingParams[quality];
  encoder
    .size(resolution)
    .videoBitrate(bitrate)
    .audioCodec("aac")
    .format("mp4")
    .outputOptions(ffmpegArgs)
    .output(`output_${quality}.mp4`)
    .on("end", () => {
      const readStream = new stream.PassThrough();
      readStream.end(fs.readFileSync(`output_${quality}.mp4`));
      const params = {
        Bucket: process.env.AWS_BUCKET_NAME_VIDEO,
        Key: `${token}/${file.originalname.replace(
          /\.[^/.]+$/,
          ""
        )}_${quality}p.mp4`,
        Body: readStream,
        ContentType: file.mimetype,
        ACL: "public-read",
      };
      s3.upload(params, (err, data) => {
        if (err) {
          console.log(err);
        }
        console.log(`File uploaded successfully. ${data.Location}`);
      });
    })
    .run();
}

export async function uploadImageFileToS3(file) {
  const token = uuidv4(); // Generate a unique token
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME_IMAGE,
    Key: `${token}/${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
  };
  const { Location } = await s3.upload(params).promise(); // Upload file to S3 and get its URL
  return `${Location}?token=${token}`; // Append token to URL
}
