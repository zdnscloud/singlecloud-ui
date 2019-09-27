const fs = require('fs');
const glob = require('glob');

const run = async (dir = process.env.READ_DIR) => {

  if (!dir) {
    console.error('muse set {READ_DIR} env');
    process.exit(1);
  }

  if (!fs.existsSync(dir)) {
    console.error(`<${dir}> directory is not exists!`);
    process.exit(2);
  }
  // console.log(dir);

  const files = await new Promise((resolve, reject) => {
    glob(`${dir}/*.json`, {}, (er, f) => {
      if (er) {
        reject(er);
      } else {
        resolve(f);
      }
    });
  });
  // console.log(files);

  const data = [];
  for (let i = 0; i < files.length; i += 1) {
    const name = files[i];
    const content = require(name);
    data.push(content);
  }
  // console.log(data);
  return data;
};

module.exports = run;

// run();
