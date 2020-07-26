# Rclone plugin development

## Important Links

| Name                  |    Link                                       |
|---                    |---                                            |
| rclone                | https://rclone.org                            |
| rclone forums         | https://forum.rclone.org                      |
| rclone api            | http://github.com/rclone/rclone-js-api.git    |
| rclone github         | https://github.com/rclone/rclone.git          |
| rclone webui react    | https://github.com/rclone/rclone-webui-react  |

## Getting started

First step to develop a plugin for rlcone is going to be to get the plugin boilerplate code.
rclone-webui is tested to work with react, but technically it should support any deployed web application packaged by 
a framework like webpack.

### Determine the type of plugin you want to build

rclone supports 3 types of plugins currently based on when and how they are loaded.

1. **FILE_HANDLER**: The File handler plugin will be executed when a mime type supported by the plugin is encountered.
1. **DASHBOARD**: The dashboard plugin acts like a dashboard widget on the rclone dashboard.
1. **TERMINAL**: The terminal plugin allows the plugin to run in the terminal section on rclone-webui-react. Eg: https://github.com/negative0/rclone-terminal.git

This plugin type has to be specified in the package.json file.

### Copy this template. 
This repository is designed to get you running with a plugin that you can make yours.

Click on use this template on GitHub, as shown in the image. This will create a copy of this repository under your name. 
You can name the repository with what the plugin is going to do. eg `rclone-video-plugin.` 

The general standard is to prefix the plugin with `rclone-*`. eg: `rclone-video-plugin` or `rclone-dog-photos-plugin`

### Edit Package.json

```json5
{
  "name": "rclone-plugin-template", // This is be the name of the plugin which will be referred by rclone.
  "author": "rclone",               // The name of the author (same as repository name)
  "version": "0.1.0",               // Version of the plugin.
  "private": true,                  // Set this if your github repo is private
  "homepage": "./",   
  "rclone": {                       // rclone contains everything about the plugin
    "handleType": [ 
      "video/mp4"
    ],
    "pluginType": "FILE_HANDLER"
  },
  "dependencies": {
    "@testing-library/jest-dom": "^4.2.4",
    "@testing-library/react": "^9.3.2",
    "@testing-library/user-event": "^7.1.2",
    "react": "^16.13.1",
    "react-dom": "^16.13.1",
    "react-scripts": "3.4.1"
  },
  "devDependencies": {
    "enzyme": "^3.11.0",
    "enzyme-adapter-react-16": "^1.15.2",
    "enzyme-to-json": "^3.5.0"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "test:cov": "react-scripts test --coverage",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": "react-app"
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```

### File Handler Plugin

The file handler plugin is automatically opened by rclone when a request is received to open a file in the rclone explorer.
The following parameters are passed to the plugin.

1. **loadURL**: This url specifies the web address where the file being opened can be found.
2. **MimeType**: MimeType is the mime type detected by rclone in the remote. Eg `video/mp4`, `audio/mp3`.

Based on this data, your plugin can load relevant files.

### Dashboard plugins

The dashboard plugins are shown as a widget on the rclone dashboard. The user can customize their tiling according to his
liking.EG

<!--TODO: Add image here--> 

### Using rclone api in plugin

The rclone rc can be accessed via the `rclone-api` dependency on npm. This dependency automatically handles credentials.
It also provides a promise based calls to all rclone rc calls without you having to worry about interfacing with rclone.

You can install it in your existing project using

```bash
npm install --save rclone-api
```
The documentation can be found here: https://github.com/rclone/rclone-js-api or `npm`: https://www.npmjs.com/package/rclone-api