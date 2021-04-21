/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

/*
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
  },
  {
    "user": {
      "name": "Courtney",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@aRareCourt" },
    "content": {
      "text": "Hello, a test from the object!"
    },
    "created_at": 1618976578348
  },
  {
    "user": {
      "name": "Dare",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SuperToastyDev"
    },
    "content": {
      "text": "Another test tweet w/ the time rn"
    },
    "created_at": 1618976741716
  },
  {
    "user": {
      "name": "Kiara",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@lilNaughty" },
    "content": {
      "text": "Woof, woof, woof, I am a (naughty) dog"
    },
    "created_at": 1618977304595
  }
];
*/

const renderTweets = function(tweets) {
  let $tweet = ''; // var to hold tweet

  for (const tweet of tweets) { // loop through tweets in data array
    $tweet += createTweetElement(tweet); // create tweet from data
  }

  $('#tweets-container').append($tweet); // inserting new tweets into #tweets-container section of html
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
      <span class="need_to_be_rendered">${timeago.format(tweet.created_at)}</span>
      <span>
        <i class="fas fa-bookmark"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      </span>
    </footer>
  </article>`;

  return $tweet;
};

$(document).ready(function() {
  const $form = $('#tweet-form');

  $form.on('submit', function(event) { // event listener to prevent deafult of submit
    console.log('submitting form - tweet button clicked');
    event.preventDefault();

    $.ajax({
      url: "/tweets/",
      method: "POST",
      data: $form.serialize()
    }).then((res) => {
      console.log('data: ', $form.serialize());
      console.log('data being sent to server');
    }).catch((err) => {
      console.log(err);
    });
  });


  const loadTweets = () => {
    $.ajax({
      url: "/tweets/",
      method: "GET",
    }).then((res) => {
      renderTweets(res);
    });
  };

  loadTweets();


  // renderTweets(data);
});