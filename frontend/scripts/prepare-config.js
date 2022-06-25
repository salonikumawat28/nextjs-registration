const fs = require('fs');
const { join } = require('path');

const copyConfig = (filename, sourceDirectory, targetDirectory) => {
  const sourceFilePath = `${sourceDirectory}/${filename}`
  const targetFilePath = `${targetDirectory}/${filename}`

  fs.copyFile(sourceFilePath, targetFilePath, (err) => {
    if (err) throw err;
    console.log(`copied ${sourceFilePath} to ${targetFilePath}`);
  });
};

const prepareConfig = async () => {
  const environment = process.argv.slice(2)[0];

  if (environment === undefined) {
    console.error("Environment argument is missing! Specify an environment as argument to proceed.");
    throw "Environment argument is missing! Specify an environment as argument to proceed."
  }

  const configDirectory = join(__dirname, `../config/${environment}/`)
  const androidTargetDirectory = join(__dirname, "../android/app/")
  const iosTargetDirectory = join(__dirname, "../ios/App/App/")

  copyConfig("google-services.json", configDirectory, androidTargetDirectory);
  copyConfig("GoogleService-Info.plist", configDirectory, iosTargetDirectory);
};

prepareConfig();
