const { Router } = require('express');
const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const { removeBackgroundFromImageFile } = require("remove.bg");
 const router = Router();

const upload = multer({ dest: 'uploads/' });

router.post('/process-image', upload.single('image'), async (req, res) => {
  const { format, quality, width, height, rotate, flip,removeBackground } = req.body;
  console.log(req.body);
  const inputPath = req.file.path; 
  const outputPath = `processed-image${Date.now()}.${format || 'jpeg'}`; 

  try {
    
    let image = sharp(inputPath);
    if (width || height) {
      image = image.resize(Number(width) || null, Number(height) || null,
                            {fit: 'contain'});
    }
    if (rotate) {
      image = image.rotate(Number(rotate));
    }
    if (flip === 'yes') {
      image = image.flip();
    }
    if (quality>0) {
      image = image.jpeg({ quality: Number(quality) });
    }

    if (format!=null) {
      image = image.toFormat(format);
    }
    if (removeBackground === 'yes') {
      try {
        await removeBackgroundFromImageFile({
          path: inputPath,
          apiKey: 'add api key here',
          size: "auto",
          type: "auto",
          outputFile: outputPath,
        });
        console.log("Background removed successfully!");
      } catch (err) {
        console.error("Failed to remove background:", err);
        return res.status(500).json({ error: "Failed to remove background from image" });
      }
    } else {
      await image.toFile(outputPath);
    }
    res.sendFile(path.resolve(outputPath), (err) => {
      console.log('File sent:', outputPath);
      fs.unlinkSync(inputPath);
      fs.unlinkSync(outputPath); 
      if (err) {
        console.error('Error sending file:', err);
      }
    });
  } catch (err) {
    console.error('Error processing image:', err);
    res.status(500).json({ error: 'Failed to process image' });
  }
});
module.exports = router;


