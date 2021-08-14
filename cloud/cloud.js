const { existsSync, createReadStream, statSync } = require("fs");
const express = require("express");
const sharp = require("sharp");
const path = require("path");

const { verifyMailToken, verifyMediaToken } = require("../shared/tokens");
const { Media, Archive } = require("../database/cloud");

const archives = path.join(__dirname, "..", "storage", "archives");
const files = path.join(__dirname, "..", "storage", "files");

const app = express();

app.get("/i/:iid", async (req, res) => {
  try {
    const {
      params: { iid },
      query: { h, w, t },
    } = req;
    const imageId = iid.substr(0, 24);
    if (!t) {
      return res.status(401).json({ message: "Authentication failed." });
    }
    const media = verifyMediaToken(t);
    if (media.id !== imageId) {
      return res.status(401).json({ message: "Permission denied." });
    }

    const image = await Media.findById(imageId).select("-_id name type");
    const imagePath = path.join(files, image.name);
    if (!existsSync(imagePath)) {
      return res.status(404).send("No media found.");
    }

    if (image.type === "image/gif") {
      res.writeHead(200, { "Content-Type": image.type });
      createReadStream(imagePath).pipe(res);
    } else {
      const buf = await sharp(imagePath)
        .resize(Math.floor(w) || null, Math.floor(h) || null, { fit: "cover" })
        .toBuffer();
      res.writeHead(200, { "Content-Type": image.type });
      res.end(buf);
    }
  } catch (error) {
    console.log(error);
    res.status(404).json("No media found.");
  }
});
app.get("/v/:vid", async (req, res) => {
  try {
    const {
      params: { vid },
      query: { t },
      headers: { range },
    } = req;
    const vidId = vid.substr(0, 24);
    if (!t) {
      return res.status(401).json({ message: "Authentication failed." });
    }
    const media = verifyMediaToken(t);
    if (media.id !== vidId) {
      return res.status(401).json({ message: "Permission denied." });
    }
    const video = await Media.findById(vidId).select("-_id name type");
    const videoPath = path.join(files, video.name);
    if (!existsSync(videoPath)) {
      return res.status(404).send("No media found.");
    }
    const { size } = statSync(videoPath);
    if (range) {
      let [start, end] = range.replace(/bytes=/, "").split("-");
      start = parseInt(start);
      end = end ? parseInt(end) : size - 1;
      res.writeHead(206, {
        "Content-range": `bytes ${start}-${end}/${size}`,
        "Accept-Range": "bytes",
        "Content-length": end - start + 1,
        "Content-Type": video.type,
      });
      createReadStream(videoPath, { start, end }).pipe(res);
    } else {
      res.writeHead(200, {
        "Content-Type": video.type,
        "Content-Length": size,
      });
      createReadStream(videoPath).pipe(res);
    }
  } catch (error) {
    console.log(error);
    res.status(404).send("No media found.");
  }
});
app.get("/a/:aid", async (req, res) => {
  try {
    const {
      params: { aid },
      query: { t },
      headers: { range },
    } = req;
    const audioId = aid.substr(0, 24);
    if (!t) {
      return res.status(401).json({ message: "Authentication failed." });
    }
    const media = verifyMediaToken(t);
    if (media.id !== audioId) {
      return res.status(401).json({ message: "Permission denied." });
    }
    const audio = await Media.findById(audioId).select("-_id name type");
    const audioPath = path.join(files, audio.name);
    if (!existsSync(audioPath)) {
      return res.status(404).send("No media found.");
    }

    const { size } = statSync(audioPath);
    if (range) {
      let [start, end] = range.replace(/bytes=/, "").split("-");
      start = parseInt(start);
      end = end ? parseInt(end) : size - 1;
      res.writeHead(206, {
        "Content-range": `bytes ${start}-${end}/${size}`,
        "Accept-Range": "bytes",
        "Content-length": end - start + 1,
        "Content-Type": audio.type,
      });
      createReadStream(audioPath, { start, end }).pipe(res);
    } else {
      res.writeHead(200, {
        "Content-Type": audio.type,
        "Content-Length": size,
      });
      createReadStream(audioPath).pipe(res);
    }
  } catch (error) {
    console.log(error);
    res.status(404).send("No media found.");
  }
});
app.get("/data/mail/:token/:name", async (req, res) => {
  try {
    const { token } = req.params;
    if (!token) {
      return res.status(401).json({ message: "Authentication failed." });
    }
    const { id, name, uid } = verifyMailToken(token);
    const filePath = path.join(archives, name);
    const arch = await Archive.findOne({
      _id: id,
      $or: [{ from: uid }, { to: uid }, { support: true }],
    });
    if (!arch) {
      res.status(404).json({ message: "No file found." });
    }
    const { size } = statSync(filePath);
    res.writeHead(200, { "Content-Type": arch.type, "Content-Length": size });
    createReadStream(filePath).pipe(res);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "No file found." });
  }
});

app.use((req, res) => {
  res.redirect("https://www.micple.com");
});

app.listen(2300, () => console.log("Cloud server started."));
