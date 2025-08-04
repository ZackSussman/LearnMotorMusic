// scripts/postbuild.js
import fs from 'fs-extra';
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.resolve(__dirname, '../dist');
const targetDir = "/Users/zacksussman/Documents/code/PersonalSite/public/MotorMusic/LearnMotorMusic";

(async () => {
  try {
    await fs.emptyDir(targetDir); // clear target
    await fs.copy(distDir, targetDir);
    console.log(`✅ Copied dist/ to ${targetDir}`);
  } catch (err) {
    console.error('❌ Error copying build files:', err);
    process.exit(1);
  }
})();