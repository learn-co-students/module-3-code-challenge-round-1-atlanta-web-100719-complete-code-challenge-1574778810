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
      console.log(comment)
      li = document.createElement('li');
      li.innerText = comment.content
      ul.appendChild(li);
    }
  }
})
