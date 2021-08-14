const { exec } = require('child_process');
const { v4: uuid } = require('uuid');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const { signMailToken, signMediaToken } = require('../../shared/tokens');

const archives = path.join(__dirname, '..', '..', 'storage', 'archives');
const files = path.join(__dirname, '..', '..', 'storage', 'files');

const audioTypes = ['audio/mp3', 'audio/wav', 'audio/ogg', 'audio/mpeg'];
const imageTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'];
const videoTypes = ['video/mp4', 'video/webm', 'video/mkv', 'video/ogg'];
function uniqueName(ext) {
  return uuid() + ext;
}
function urlToFile(data, name) {
  const fileName = uniqueName(path.extname(name));
  const filePath = path.join(files, fileName);
  const regex = /^data:.+\/(.+);base64,(.*)$/;
  const matches = data.match(regex);
  const buffer = Buffer.from(matches[2], 'base64');
  sharp(buffer).toFile(filePath);
  return fileName;
}
function saveFile(arcs = {}, accept = false) {
  return new Promise(async (res, rej) => {
    try {
      
      const fls = Object.keys(arcs).map((i) => ({
        path: arcs[i].path,
        size: arcs[i].size,
        type: arcs[i].type,
      }));
      if (fls.length <= 0) {
        res([]);
      }
      
      const uploads = [];
      
      for (const item of fls) {
        const ext = path.extname(item.path);
        if (!['mp3', 'mp4', 'wav, ogg', 'mpeg', 'png', 'jpg', 'jpeg', 'webm', 'gif'].includes(ext.substr(1)) && !accept) {
          rej('Invalid media.');
        }
        const fileName = uuid() + ext;
        let type = '';
        let duration;
        const filePath = path.join(files, fileName);
        if (imageTypes.includes(item.type)) {
          if (item.size > 10240000) {
            rej({ status: 413, message: 'File is too large.' });
          }
          // replace it
          // sharp(item.path).toFile(filePath, (err) => {
          //   if (err) {
          //     console.log(err);
          //     rej({ status: 500, message: 'Invalid media.' });
          //   } else {
          //     uploads[0]={ fileName, type, duration };
          //     res(uploads)
          //   }
          // });
          // type = item.type;
           
          fs.copyFile(item.path, filePath, (err, dat) => {
            type = item.type;
            if (err) {
              rej({ status: 406, message: 'Invalid media.' });
            } else {
              uploads[0]={ fileName, type, duration };
              res(uploads)
            }
          });
          duration = await getDuration(filePath);
          type = item.type;

        } else if (videoTypes.includes(item.type)) {
          if (item.size > 102400000) {
            rej({ status: 413, message: 'File is too large.' });
          }
          fs.copyFile(item.path, filePath, (err, dat) => {
            type = item.type;
            if (err) {
              rej({ status: 406, message: 'Invalid media.' });
            } else {
              uploads[0]={ fileName, type, duration };
              res(uploads)
            }
          });
          duration = await getDuration(filePath);
          type = item.type;
        } else if (audioTypes.includes(item.type)) {
          if (item.size > 10240000) {
            rej({ status: 413, message: 'File is too large.' });
          }
          fs.copyFile(item.path, filePath, (err) => {
            type = item.type;
            if (err) {
              rej({ status: 406, message: 'Invalid media.' });
            }else {
             
              uploads[0]={ fileName, type, duration };
              res(uploads)
            }
          });
          duration = await getDuration(filePath);
          type = item.type;
        } else {
          if (accept) {
            if (item.size > 10240000) {
              rej({ status: 413, message: 'File is too large.' });
            }
            fs.copyFile(item.path, filePath, (err) => {
              if (err) {
                rej({ status: 406, message: 'Invalid media.' });
              }
            });
            type = item.type;
          } else {
            rej({ status: 406, message: 'Invalid media type.' });
          }
        }
        uploads.push({ fileName, type, duration });
      }
      res(uploads);
    } catch (error) {
      rej(error);
    }
  });
}
function removeFile(file) {
  fs.unlink(path.join(files, file), (err) => {
    if (err) throw err;
  });
}
function exists(filePath) {
  return fs.existsSync(path.join(files, filePath));
}
function generate(file, id, uid, options = { h: 0, w: 0, p: 360 }) {
  const token = signMediaToken({ id, uid });
  const ext = path.extname(file).substr(1);
  if (['mp4', 'webm', 'avi', 'ogg'].includes(ext)) {
    return `/v/${id}.${ext}?t=${token}`;
  } else if (['png', 'jpg', 'jpeg', 'gif'].includes(ext)) {
    const h = ~~options.h;
    const w = ~~options.w;
    let query = '';
    if (h && w) {
      query = `?h=${h}&w=${w}&t=${token}`;
    } else if (h && !w) {
      query = `?h=${h}&t=${token}`;
    } else if (!h && w) {
      query = `?w=${w}&t=${token}`;
    } else {
      query = `?t=${token}`;
    }
    return `/i/${id}.${ext}${query}`;
  } else if (['mp3', 'ogg', 'wav', 'mpeg'].includes(ext)) {
    return `/a/${id}.${ext}?t=${token}`;
  } else {
    return '';
  }
}
function generateArch(id, name, uid) {
  const ext = path.extname(name);
  const token = signMailToken({ id, name, uid });
  return `/data/mail/${token}/archive${ext}`;
}
function saveArchive(archive) {
  if (archive.size > 102400000) {
    return new Error('File is too large.');
  }
  const ext = path.extname(archive.name);
  let fileName = uuid() + ext;
  const filePath = path.join(archives, fileName);
  fs.copyFileSync(archive.path, filePath);
  return fileName;
}
function existsArchive(filePath) {
  return fs.existsSync(path.join(archives, filePath));
}
function getDuration(name) {
  return new Promise(function (resolve, reject) {
    exec(`ffprobe -v error -show_entries format=duration -of csv="p=0" ${name}`, (error, stdout) => {
      if (error) {
        reject('Not valid inout file or ffprobe not installed');
      }
      resolve(parseInt(stdout));
    });
  });
}

module.exports = {
  urlToFile,
  saveFile,
  removeFile,
  exists,
  generate,
  imageTypes,
  videoTypes,
  saveArchive,
  existsArchive,
  generateArch,
};
