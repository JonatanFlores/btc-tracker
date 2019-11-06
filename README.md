# BTC Tracker

Simple App made with Electron. It tracks BitCoin price using the **CryptoCompare API**

## Install

Download the source code

```bash
$ git clone https://github.com/jonatanflores/btc-tracker.git
```

Go to the application root folder

```bash
$ cd btc-track
```

Install the dependencies

```bash
$ npm install
```

## Running

To run the application on development, use the following

```bash
$ npm start
```

## Build

To make the application installers, use the following commands according to target Operating System (OS)

> **FOR WINDOWS BUILD**
> USE Windows 10 or Greater and don't forget to install the `windows-build-tools` package by `running as administrator` the following command on `PowerShell`:

```bash
$ npm i -g --production windows-build-tools
```

Now you can generate the application "installers"

> **FOR WINDOWS BUILD**
> Run the following command USING Windows 10 `PowerShell` running as Administrator:

```bash
$ npm run pack
$ npm run dist
```
