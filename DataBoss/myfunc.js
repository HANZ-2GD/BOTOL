import fs from 'fs';
import Jimp from 'jimp';
import { sizeFormatter } from 'human-readable';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Mendefinisikan __filename dan __dirname untuk ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



export const generateProfilePicture = async (buffer) => {
    const jimp = await Jimp.read(buffer);
    const min = jimp.getWidth();
    const max = jimp.getHeight();
    const cropped = jimp.crop(0, 0, min, max);
    return {
        img: await cropped.scaleToFit(720, 720).getBufferAsync(Jimp.MIME_JPEG),
        preview: await cropped.scaleToFit(720, 720).getBufferAsync(Jimp.MIME_JPEG)
    };
};


// Auto Reload File
fs.watchFile(__filename, () => {
    fs.unwatchFile(__filename);
    console.log(chalk.redBright(`Update ${__filename}`));
    import(`${import.meta.url}?update=${Date.now()}`);
});