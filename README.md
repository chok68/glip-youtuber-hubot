# glip-youtuber-hubot 
> HUBOT that links Glip and Youtube

## App features:

- Detect great youtube resources based on popularity and searches
- Search on external new sources to enrich video searches
 
Demo Video: [https://youtu.be/c4Zwj5gaE9E](https://youtu.be/c4Zwj5gaE9E) 

## Setup
- Dev machine: Ubuntu 16.04.3 LTS 
- YouTube API Key (free) [https://console.developers.google.com/start/api?id=youtube](https://console.developers.google.com/start/api?id=youtube)
- News API.org API Key (free) [https://newsapi.org/register](https://newsapi.org/register)
- Nodejs 8 [https://nodejs.org/](https://nodejs.org/)
- Yarn

For more info on setting up please refer to:

- [https://github.com/tylerlong/hubot-glip](https://github.com/tylerlong/hubot-glip)
- [https://github.com/tylerlong/glip-hubot-t](https://github.com/tylerlong/glip-hubot-t)

### Glip

- Create RingCentral dev account
- Test dev version in [https://glip.devtest.ringcentral.com](https://glip.devtest.ringcentral.com)
- Sign in using RingCentral
- Talk with your chatbot (locateed under People) after Setup and Run steps are completed

### Node 8

    curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
    sudo apt-get install -y nodejs

### Yarn

    sudo npm install -g yarn

## Installation

    yarn install

## Run

    HUBOT_GLIP_SERVER=https://platform.devtest.ringcentral.com \
    HUBOT_GLIP_APP_KEY=app-key \
    HUBOT_GLIP_APP_SECRET=app-secret \
    HUBOT_GLIP_BOT_SERVER=https://xxxxxxx.ngrok.io \
    YOUTUBE_API_KEY=your-youtube-api-key \
    NEWSAPI_ORG_API_KEY=newsapi.org-api-key
    ./bin/hubot -a glip -n t

