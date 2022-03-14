const fs = require("fs");

// create paths to send to build and send all
const paths = {
  build: {
    root: "./build",
    assets: "./build/assets",
  },
  src: {
    imageAssets: "./src/assets/img",
    jsonAssets: "./src/assets/mapData",
  },
};

if (!fs.existsSync(paths.build.root)) {
  fs.mkdirSync(paths.build.root);
}

if (!fs.existsSync(paths.build.assets)) {
  const imageAssets = fs.readdirSync(paths.src.imageAssets);
  const jsonAssets = fs.readdirSync(paths.src.jsonAssets);

  fs.mkdirSync(paths.build.assets);

  for (const asset of imageAssets) {
    fs.copyFileSync(
      `${paths.src.imageAssets}/${asset}`,
      `${paths.build.assets}/${asset}`
    );
  }

  for (const asset of jsonAssets) {
    fs.copyFileSync(
      `${paths.src.jsonAssets}/${asset}`,
      `${paths.build.assets}/${asset}`
    );
  }
}

// Call parcel
require("child_process").spawn(
  "parcel",
  ["index.html", "-p 8000", "--open", "--dist-dir", "build"],
  {
    stdio: ["ignore", "inherit", "inherit"],
    shell: true,
  }
);
