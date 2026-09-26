import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';
import { v2 as cloudinary } from 'cloudinary';
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';

const ffmpegPath = ffmpegInstaller.path;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const videos = [
  { name: '1868', src: 'vide edititng/IMG_1868.MOV', id: 'smartlygrow/video_editing/video_1868' },
  { name: '1863', src: 'vide edititng/IMG_1863.MOV', id: 'smartlygrow/video_editing/video_1863' },
  { name: '2556', src: 'vide edititng/IMG_2556.MOV', id: 'smartlygrow/video_editing/video_2556' },
  { name: '3373', src: 'vide edititng/IMG_3373.MOV', id: 'smartlygrow/video_editing/video_3373' }
];

const outDir = path.resolve('temp_encoded');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const results = {};

for (const v of videos) {
  const mp4Path = path.join(outDir, `${v.name}.mp4`);
  const thumbPath = path.join(outDir, `${v.name}.jpg`);

  console.log(`\n========================================`);
  console.log(`[1/3] Transcoding ${v.name} (${v.src}) with ffmpeg...`);
  const ffmpegCmd = `"${ffmpegPath}" -y -i "${v.src}" -c:v libx264 -crf 22 -preset fast -pix_fmt yuv420p -movflags +faststart -c:a aac -b:a 128k "${mp4Path}"`;
  execSync(ffmpegCmd, { stdio: 'inherit' });

  console.log(`[2/3] Generating poster thumbnail for ${v.name}...`);
  const thumbCmd = `"${ffmpegPath}" -y -ss 00:00:01 -i "${mp4Path}" -vframes 1 -q:v 2 "${thumbPath}"`;
  execSync(thumbCmd, { stdio: 'inherit' });

  const mp4Size = fs.statSync(mp4Path).size;
  console.log(`Compressed ${v.name}: ${(mp4Size / 1024 / 1024).toFixed(2)} MB`);

  console.log(`[3/3] Uploading ${v.name} to Cloudinary...`);
  const uploadRes = await cloudinary.uploader.upload(mp4Path, {
    resource_type: 'video',
    public_id: v.id,
    overwrite: true
  });

  const thumbUpload = await cloudinary.uploader.upload(thumbPath, {
    resource_type: 'image',
    public_id: `${v.id}_thumb`,
    overwrite: true
  });

  results[v.name] = {
    videoUrl: uploadRes.secure_url,
    thumbnailUrl: thumbUpload.secure_url,
    duration: uploadRes.duration
  };

  console.log(`SUCCESS ${v.name}:`, results[v.name]);
}

console.log('\n========================================');
console.log('--- ALL 4 VIDEO EDITING UPLOADS COMPLETE ---');
console.log(JSON.stringify(results, null, 2));

// Save results to json for safety
fs.writeFileSync('src/data/video-editing-cloudinary.json', JSON.stringify(results, null, 2));
