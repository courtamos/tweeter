const renderTweets = function(tweets) {
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

  $form.on('submit', function(event) { // event listener for #tweet-form button
    // console.log('submitting form - tweet button clicked');
    event.preventDefault(); // to prevent deafult of submit

    const $tweetText = $('#tweet-text').val(); // input text of tweet
    // console.log('tweet text: ', $tweetText);

    if ($tweetText.length > 140 || $tweetText.length === 0) { // checking for invalid tweets
      alert('Error: Inavlid tweet. Please try again!');
    }

    $.ajax({ // ajax post request to send new tweet from #tweet-from
      url: "/tweets/",
      method: "POST",
      data: $form.serialize()
    }).then((res) => {
      // console.log('data: ', $form.serialize());
      // console.log('data being sent to server');
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


  // renderTweets(data);
});