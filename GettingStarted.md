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

### First things first

#### Edit the readme.md

Every plugin should describe what it does and how the user can install and use it. We suggest that you edit the Readme.md file
to describe what your plugin does, installation steps.

#### Don't forget to add screenshots

#### Here is a checklist for you to go through the flow

- [ ] Copied the template.
- [ ] Cloned the repository
- [ ] Added a short repository description.
- [ ] Edited package.json.
- [ ] Added code.
- [ ] Added tests.
- [ ] Checked GitHub workflow with release.
- [ ] Tried using the plugin using (plugin test) mode in rclone.
- [ ] Created a tag
- [ ] Created a pull request for the plugin to be accepted in the rclone store.
- [ ] Added screenshots for readme.md.
- [ ] Had fun doing it.


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

### Running the plugin for the first time

Ensure that you have `npm` or `yarn` installed.    
You can then install the dependencies
```shell script
npm install
```
OR
```shell script
yarn install
```
After that is done, run the following to open a browser window with your plugin in it.
```shell script
npm run start
```
OR
```shell script
yarn start
```

**PRO TIP**: You can run the plugin on a different port if needed by using PORT=<port_no> before running
Eg:
```shell script
PORT=3006 npm run start
```
The plugin can authenticate with rclone only when you run it through the webui, or you provide the credentials manually to it.

So to add credentials you can specify them into the url as basic auth:

Eg: if your plugin is running at `http://localhost:3000` you can add credentials by specifing `http://<username>:<password>@localhost:3000/` 

### File Handler Plugin

The file handler plugin is automatically opened by rclone when a request is received to open a file in the rclone explorer.
The following parameters are passed to the plugin.

1. **loadURL**: This url specifies the web address where the file being opened can be found.
2. **MimeType**: MimeType is the mime type detected by rclone in the remote. Eg `video/mp4`, `audio/mp3`.

Based on this data, your plugin can load relevant files.

### Dashboard plugins

The dashboard plugins are shown as a widget on the rclone dashboard. The user can customize their tiling according to his
liking.
Eg:

<!--TODO: Add image here--> 

### Using rclone api in plugin

The rclone rc can be accessed via the `rclone-api` dependency on npm. This dependency automatically handles credentials.
It also provides a promise based calls to all rclone rc calls without you having to worry about interfacing with rclone.

You can install it in your existing project using

```bash
npm install --save rclone-api
```
The documentation can be found here: https://github.com/rclone/rclone-js-api or `npm`: https://www.npmjs.com/package/rclone-api

### Writing tests for your plugin
We use jest for testing which comes with `react-scripts`

### Creating a release

We have configured a Github actions workflow for you in [release.yml(.github/workflows/release.yml)](.github/workflows/release.yml).
This workflow is pretty simple. It will create a release for you when you create a tag and push it. Seems simple? It is.

```shell script
git tag v0.0.1
```
Use [semver (Semantic Versioning)](https://semver.org/) for versioning. It is the standard used by rclone to know when your plugins should be updated.

You can then push the tags to GitHub for [Github Actions](https://github.com/features/actions) to do its thing.
```shell script
git push --tags
```


### Submitting a pull request for rclone store

You can keep your plugin private, or you can submit a request for your plugin to be listed in the official rclone store.

At the time of writing this, we are manually reviewing the plugins, so merging the PR might take a while.

Go to [Plugins Repo (Issues)](https://github.com/rclone/rclone-plugins-repo/issues) and create an issue in the following format

```json5
{
            "name" : "Video Player",
            "description": "A video player for rclone",
            "author": "negative0",
            "longDescription": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            "icon": "",
            "repo": "https://github.com/negative0/rclone-video-plugin/",
            "bugs": "https://github.com/negative0/rclone-video-plugin/issues"
}
```