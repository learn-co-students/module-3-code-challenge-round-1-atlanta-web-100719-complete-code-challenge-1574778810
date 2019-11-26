document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 4020 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`


  fetchPhoto();

  function fetchPhoto() {
    fetch(imageURL)
      .then(res => res.json())
      .then(showPhoto)
  }

  function showPhoto(photo) {
    img = document.querySelector('#image');
    img.src = photo.url;

    h4 = document.querySelector('#name');
    h4.innerText = photo.name;

    span = document.querySelector('#likes');
    span.innerText = photo.like_count;

    ul = document.querySelector('#comments');
    for (const comment of photo.comments) {
      // li = document.createElement('li');
      // li.innerText = comment.content
      // ul.appendChild(li);
      appendComment(comment.content, ul)
    }
  }

  function appendComment(comment, ul) {
    li = document.createElement('li');
    li.innerText = comment
    ul.appendChild(li);
  }

  button = document.querySelector('#like_button');
  button.addEventListener('click', addLike);

  function addLike(event) {
    const span = document.querySelector('#likes');
    numLikes = Number.parseInt(span.innerText)
    span.innerText = ++numLikes;

    updateLikes();
  }

  function updateLikes() {
    fetch(likeURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        image_id: imageId
      })
    })
  }

  form = document.querySelector('#comment_form');
  form.addEventListener('submit', addComment);

  function addComment(event) {
    event.preventDefault();
    appendComment(event.target.comment.value, ul)
    event.target.reset();
  }

})
