const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

let createTweetElement = function(obj) {
  let htmlUnit = `
  <article>
    <header>
      <img class="profile-placeholder" src="${obj.user.avatars}"> 
      <h4 class="users-name">${obj.user.name}</h4>
      <h5 class="user-handle">${obj.user.handle}</h5>
    </header>
    <body><div class='tweet-body'>
      ${escape(obj.content.text)}
    </div></body>
    <footer>
      <div class="timestamp">
      <label>${timeago.format(obj.created_at)}</label>
      </div>
      <div class="user-buttons">
      <i class="far fa-thumbs-up fa-lg"></i>
      <i class="fas fa-recycle fa-lg"></i>
      <i class="far fa-flag"></i>
    </div>
    </footer>
  </article>`
  return htmlUnit;
};

const message = function(err) {
  let mess = "";
  if (err === "empty") {
    mess = "Seems like you forgot to put words on the page before posting...nice one."
  } else {
    mess = "You have too many characters...great, try again."
  }
  const injection = `<div class="message">
  <i class="fas fa-exclamation-circle"></i>
  ${mess}<i class="fas fa-exclamation-circle"></i></div>`
  return injection;
};

const renderTweets = function(tweets) {
  $('.twittcontainer').empty();
  for (let tweet of tweets) {
    const newhtmlUnit = createTweetElement(tweet);
    $('.twittcontainer').append(newhtmlUnit)
  }
};

 const loadTweets = function() {
   let url = 'http://localhost:8080/tweets';
   $.ajax({
     url,
     method: "GET"
   })
   .done((result) => {
  renderTweets(result);
  })
   .fail(() => console.log('fail'))
   .always(() => console.log('as always; this request is completed.'))
 };

 const postTweets = function(formData) {
  $.ajax({
    method: "POST",
    url: 'http://localhost:8080/tweets',
    data: formData,
    success: function() {
      console.log('tweet successfuly added in database');
      loadTweets()
    }
  })
    .done(() => $('textarea').val(''))
    .fail(() => console.log('failed to post'))
};

$(document).ready(function() {
  loadTweets()
  $('#twittform').on('submit', function(event) {
    event.preventDefault();
     const tweet = $(this).children("textarea").val();
     if (tweet === "") {
      $(".warning").html(message("empty")).slideDown(1000).fadeOut(4000)
     } else if (tweet.length > 140) {
      $(".warning").html(message("limit")).slideDown(1000).fadeOut(4000)
     } else {
      const formData = $(this).serialize();
      postTweets(formData);
     }
  })
});
