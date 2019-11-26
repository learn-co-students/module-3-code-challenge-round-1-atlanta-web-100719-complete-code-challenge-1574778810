document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 4021 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`






  fetch(imageURL)
  .then(res => res.json())
  .then(data => {
    const imgCardURL = document.querySelector('#image').src = data.url
    const imgName = document.querySelector('#name')
    imgName.innerText = data.name

    let imgLikes = document.querySelector('#likes')
    imgLikes.innerHTML = data.like_count

    const likeBtn = document.querySelector('#like_button')

    likeBtn.addEventListener('click', (event) => {

      fetch(likeURL, {
        method: 'POST',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify({ image_id: imageId })
      })
      .then(res => res.json())
      .then(likes => {likes.like_count += 1})
      
    })

    




    const imgCommentsUl = document.querySelector('#comments')
    
    function listComments(){
    for (let i = 0; i < data.comments.length; i++){

      let li = document.createElement('li')
      li.innerText = data.comments[i].content
      imgCommentsUl.appendChild(li)
    }
  }
  listComments()

    const commentsForm = document.querySelector('#comment_form')
    commentsForm.addEventListener('submit', (event) => {
      event.preventDefault()

       fetch(commentsURL, {
        method: 'POST', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ image_id: imageId, content: event.target.comment.value })

      })
      .then(res => res.json())
      .then(comment => {  })

      event.target.reset()
    })






    




  })



})



