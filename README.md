# Introduction

Ng-Zorro Admin Starter Template (Angular-Electron)
Bootstrap and package your project with Angular 16 and Electron 25 (Typescript + SASS + Hot Reload) for creating Desktop applications.

Currently runs with:

- Angular v17.3.6
- Electron v30.0.1


With this sample, you can:

- Run your app in a local development environment with Electron & Hot reload
- Run your app in a production environment
- Package your app into an executable file for Linux, Windows & Mac

/!\ Hot reload only pertains to the renderer process. The main electron process is not able to be hot reloaded, only restarted.

/!\ Angular CLI & Electron Builder needs Node 14 or later to work correctly.

## Getting Started

*Clone this repository locally:*

``` bash
git clone https://github.com/devzepto/ng-electron-zorro-starter.git
```

*Install dependencies with npm (used by Electron renderer process):*

``` bash
npm install
```

There is an issue with `yarn` and `node_modules` when the application is built by the packager. Please use `npm` as dependencies manager.

If you want to generate Angular components with Angular-cli , you **MUST** install `@angular/cli` in npm global context.
Please follow [Angular-cli documentation](https://github.com/angular/angular-cli) if you had installed a previous version of `angular-cli`.

``` bash
npm install -g @angular/cli
```

*Install NodeJS dependencies with npm (used by Electron main process):*

``` bash
cd app/
npm install
```

Why two package.json ? This project follow [Electron Builder two package.json structure](https://www.electron.build/tutorials/two-package-structure) in order to optimize final bundle and be still able to use Angular `ng add` feature.

## References
https://github.com/maximegris/angular-electron
https://github.com/huajian123/ng-ant-admin
