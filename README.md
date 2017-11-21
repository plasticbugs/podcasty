# Podcast Machine

A podcast & MP3 generator for YouTube that creates iTunes-friendly XML podcast feeds with enclosures from YouTube channels.

## Demo
[![Podcast Machine Video](https://img.youtube.com/vi/WzPvl2aQLkc/0.jpg)](https://www.youtube.com/watch?v=WzPvl2aQLkc "Podcast Machine Demo")

### Features
* Transcodes YouTube videos into MP3s via FFmpeg
* Generates an XML podcast feed from the 20 most recently uploaded videos
* Temporarily caches server-generated XML with Redis to reduce server load and limit API calls

### Installing System Dependencies (Mac with Homebrew)

[Get Homebrew](https://brew.sh/) then run...

```
brew install node
brew install redis
brew install mongodb
brew install ffmpeg
```

### Install Project Dependencies

```
npm install
```

## Running the App

Get a developer key from Google and obtain credentials so you can access the YouTube Data API. [Instructions here](https://developers.google.com/youtube/v3/getting-started)

Rename `\example.config.js` to `config.js` and add your API Key from the [Google Developer Console](https://console.developers.google.com/)

To run your Redis server (for XML caching): `redis-server`

To run MongoDB: `mongod`

To transpile jsx & run server: `npm start`

Load a YouTube channel and begin transcoding videos by visiting: `http://localhost:3000/youtube_channel_name`
