const spsave = require("spsave").spsave;
const path = require("path");
const chalk = require("chalk");

const buildDir = path.join(__dirname, "../dist");

const coreOptions = {
  siteUrl: "http://cornerstone/apps",
  notification: true
};

const creds = {
  username: "zspPRDFarmsvc",
  password: "Passw0rd1268",
  domain: "nzblood"
};

const fileOptions = {
  glob: `${buildDir}/**/*.*`,
  base: "dist",
  folder: "nzbs_applications/kanban_cards"
};

function successHandler() {
  console.log(chalk.green("Successfully upload files to Sharepoint "));
}
function errorHandler(err) {
  console.log(chalk.red("Error uploading files to", JSON.stringify(err, null, 2)));
}

console.log(chalk.green("Beginning to upload files to Sharepoint "));

spsave(coreOptions, creds, fileOptions)
  .then(successHandler)
  .catch(errorHandler);
