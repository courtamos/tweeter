/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

const renderTweets = function(tweets) {
  let $tweet = '';

  for (const tweet of tweets) { // loop through tweets
    console.log('tweets in render: ', tweet);
    $tweet += createTweetElement(tweet);
  }

  $('#tweets-container').append($tweet);
};

const createTweetElement = function(tweet) {
  const $tweet = `<article class="tweet">
    <header>
      <div class="user-info">
        <img src="${tweet.user.avatars}">
        <h3 class="name">${tweet.user.name}</h3>
      </div>
      <h3 class="user">${tweet.user.handle}</h3>
    </header>
    <div class="users-tweet">
      <p>${tweet.content.text}</p>
    </div>
    <footer>
      <span class="need_to_be_rendered" datetime="${tweet.created_at}"></span>
      <span>
        <i class="fas fa-bookmark"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      </span>
    </footer>
  </article>`;

  console.log('tweet create: ', $tweet);

  return $tweet;
};

$(document).ready(function() {
  renderTweets(data);
});