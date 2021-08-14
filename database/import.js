const { exec } = require('child_process');

const models = require('./models.json');

for (const model of models) {
  for (const collection of model.collections) {
    exec(`mongoimport -d ${model.database} -c ${collection} --file ./data/${model.database}_${collection}.json`, (err, stdout, stderr) => {
      if (err) {
        console.log('NodeError:', err);
      } else if (stderr) {
        console.log('CommandError:', stderr);
      } else {
        console.log(`Imported ${model.database}_${collection}.json`);
      }
    });
  }
}
