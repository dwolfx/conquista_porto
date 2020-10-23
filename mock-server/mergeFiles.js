const path = require('path');
const fs = require('fs');

module.exports = function() {
  const dir = path.join(__dirname, './fixtures/');
  var summaryFiles = [];

  // read directory
  const fileNames = fs.readdirSync(dir);

  fileNames.forEach((filename) => {
    // get current file path
    const filepath = path.resolve(dir, filename);

    // get information about the file
    const stat = fs.statSync(filepath);

    // check if the current path is a file or a folder
    const isFile = stat.isFile();

    // exclude folders
    if (isFile) {
      console.log('carregando JSON: ', filepath);

      const content = fs.readFileSync(filepath, 'utf-8');

      // Valdiate
      JSON.parse(content);

      // eslint-disable-next-line no-useless-escape
      const newContent = content.replace('{', '').replace(/\}([^\}]*)$/, '$1');

      // const jsonFile = JSON.parse(content);
      summaryFiles.push(newContent);
    }
  });

  // Formata e valida JSON pra leitura
  const summarizedFiles = JSON.stringify(
    JSON.parse(`{${summaryFiles.join(',')}}`),
    null,
    '\t',
  );

  const db = path.join(__dirname, 'db.log');
  fs.writeFileSync(db, summarizedFiles);

  // eslint-disable-next-line no-console
  console.log('Criando arquivo db.json');
};
