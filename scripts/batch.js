// Description:
//   Example scripts for you to examine and try out.
//
// Commands:
//   hubot s <query> | search <query> - search videos/channels
//   hubot lc | list categories
//   hubot mpc <category_id> | most popular by category <category_id>
//   hubot r <video_id> | related <video_id> - show related to <video_id>
//   hubot n <query> | news <query> - search news using <query>

const YouTube = require('youtube-node');
const request = require('request');

module.exports = (robot) => {

  robot.respond(/n\s+(.+)$|news\s+(.+)$/, (res) => {

    let searchValue = res.match[1]

    let url = 'https://newsapi.org/v2/everything?q=' + searchValue + '&apiKey=' + process.env.NEWSAPI_ORG_API_KEY;

    request(url, function(error, response, body) {
      if (error) {
        res.send(JSON.stringify(error));
      }
      else {
        
        var data = {};
        try {
          data = JSON.parse(body);
        } catch(e) {
          data = {};
        }

        if (response.statusCode == 200) {
          data.articles.forEach(function(item) {
            let post = '**' + item.title + '**' + '\n' +
                       item.source.name + '\n' +
                       item.author + '\n' +
                       '[link to article](' + item.url + ')' + '\n' +
                       'published at: ' + item.publishedAt + '\n' +
                       'tsearch ' + item.description;
            res.send(post)
          })
        }
        else {
          res.send(data.error);
        }
      }
    });
  })

  robot.respond(/s\s+(.*)$|search\s+(.*)$/, (res) => {

    let searchValue = res.match[1]

    let youTube = new YouTube();
    youTube.setKey(process.env.YOUTUBE_API_KEY);

    youTube.search(searchValue, 10, function(error, result) {
      if (error) {
        res.send(JSON.stringify(error));
      }
      else {
        result.items.forEach(function(item) {
          if (item.id.kind === 'youtube#video') {
            const envelope = {
              user: {
                reply_to: parseInt(res.match[1])
              }
            }
            res.send(formatItem(item))
          }
        })
      }
    });
  })

  robot.respond(/r\s+(.+)$|related\s+(.+)$/, (res) => {

    let searchValue = res.match[1]

    let youTube = new YouTube();
    youTube.setKey(process.env.YOUTUBE_API_KEY);

    youTube.related(searchValue, 10, function(error, result) {
      if (error) {
        res.send(error.message)
      }
      else {
        result.items.forEach(function(item) {
          if (item.id.kind === 'youtube#video') {
            res.send(formatItem(item))
          }
        })
      }
    });

  })

  robot.respond(/lc$|list categories$/, (res) => {

    let youTube = new YouTube();
    youTube.setKey(process.env.YOUTUBE_API_KEY);
    youTube.clearParams();
    youTube.clearParts();
    youTube.addPart('snippet');
    youTube.addParam('regionCode', 'US');
    youTube.addParam('part', youTube.getParts());
    youTube.request(youTube.getUrl('videoCategories'), function(error, result) {
      if (error) {
        res.send('********** error ' + JSON.stringify(error));
      }
      else {
        post = ''
        result.items.forEach(function(item) {
          post += '|' + item.id + '|' + item.snippet.title + '|\n';
        })
        res.send(post)
      }
    });
  })

  robot.respond(/mpc\s+(\d+)$|most popular by category\s+(\d+)$/, (res) => {

    let searchValue = res.match[1]

    let youTube = new YouTube();
    youTube.setKey(process.env.YOUTUBE_API_KEY);

    youTube.getMostPopularByCategory(10, searchValue, function(error, result) {
      if (error) {
        res.send(error.message)
      }
      else {
        result.items.forEach(function(item) {
          if (item.kind === 'youtube#video') {
            res.send(formatItem(item))
          }
        })
      }
    });
  })
}

var formatItem = (item) => {
    let url = 'https://www.youtube.com/watch?v=' + item.id.videoId;
    let lines = []
    lines.push(['|', '**' + item.snippet.title.substr(0, 40) + '**', '|', item.snippet.description, '|'].join(''))
    lines.push(['|', url, '|', 'Published at: ' + item.snippet.publishedAt, '|'].join(''))
    if (item.id.videoId) {
        lines.push(['|', ':point_right: related', '|', 'tr ' + item.id.videoId, '|'].join(''));
    }
    lines.push(['|', ':projector: search videos', '|', 'ts ' + item.snippet.title.substr(0, 40), '|'].join(''));
    lines.push(['|', ':newspaper: search news', '|', 'tn ' + item.snippet.title.substr(0, 40), '|'].join(''));
    let formatted = lines.join('\n');
    return formatted
}
