# ParentZone Gallery Downloader

This script allows you to download all the images and videos from your ParentZone account.

I built this project to create an easy automatic solution to download the gallery without having to manually download each individual item which is a very slow process and prone to error.

This solution will download all the media and package it up inside its own directory. You can re-run it periodically to get the latest media and it will skip items you've already downloaded.

It will also save the files with a date stamp so you can easily identify when the item was taken.

```
YYYY-MM-DD-ID.jpeg
```

## How To Use

The only prerequisite is to have [Node.js](https://nodejs.org/en/download) installed on your computer.

### Step 1:

Install the node modules:

```bash
npm i
```

### Step 2:

Run the script:

```bash
npm run dev
```

### Step 3:

It will then ask you 3 basic questions where you can fill in your details.

- Email address used to login to your ParentZone account
- Password used to login to your ParentZone account
- Directory where you want the media downloaded to (defaults to `media`)
