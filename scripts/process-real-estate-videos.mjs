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
  { name: '1997', src: 'IMG_1997.MOV', id: 'smartlygrow/real_estate/video_1997' },
  { name: '1962', src: 'IMG_1962.MOV', id: 'smartlygrow/real_estate/video_1962' },
  { name: '1959', src: 'IMG_1959.MOV', id: 'smartlygrow/real_estate/video_1959' }
];

const outDir = path.resolve('temp_encoded_re');
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
console.log('--- ALL REAL ESTATE VIDEOS COMPLETE ---');
console.log(JSON.stringify(results, null, 2));

fs.writeFileSync('src/data/real-estate-videos-cloudinary.json', JSON.stringify(results, null, 2));
