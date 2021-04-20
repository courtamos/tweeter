$(document).ready(function() {
  $('#tweet-text').on('input', function() {
    const textarea = $(this);
    const characterCount = textarea.val().length; // char count in textarea
    const form = textarea.closest('form'); // traversing up DOM tree to find form
    const counter = form.find('.counter'); // traversing down DOM tree to find counter

    counter.html(140 - characterCount); // changin html to render updated charcount

    if (characterCount > 140) {
      $(counter).addClass('over-count');
    } else {
      $(counter).removeClass('over-count');
    }
  });
});