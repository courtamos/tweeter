const escape = function(str) { // function to prevent XSS
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const renderTweets = function(tweets) {
  tweets.sort((a, b) => b.created_at - a.created_at); // sorting tweets by created_at
  let $tweet = '';

  for (const tweet of tweets) { // loop through tweets in data array
    $tweet += createTweetElement(tweet); // create tweet from data
  }

  $('#tweets-container').append($tweet); // inserting new tweets into #tweets-container
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
      <p>${escape(tweet.content.text)}</p>
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

  $form.on('submit', function(event) { // event listener for #tweet-form button
    event.preventDefault(); // to prevent deafult of submit

    const $tweetText = $('#tweet-text').val(); // input text of tweet

    if ($tweetText.length > 140 || $tweetText.length === 0) { // checking for invalid tweets
      alert('Error: Inavlid tweet. Please try again!');
    }

    $.ajax({ // ajax post request to send new tweet from #tweet-from
      url: "/tweets/",
      method: "POST",
      data: $form.serialize()
    }).then((res) => {
      document.getElementById("tweet-form").reset(); // resetting form after valid submit
      
      const newTweet = createTweetElement(res); // creating new tweet
      $('#tweets-container').prepend(newTweet); // making tweet go to top of page/tweets
    }).catch((err) => {
      console.log(err);
    });
  });


  const loadTweets = () => { // rending tweets from 'database'
    $.ajax({
      url: "/tweets/",
      method: "GET",
    }).then((res) => {
      renderTweets(res);
    });
  };

  loadTweets();
});