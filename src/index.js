let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});


function allToys(){
  fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(toyData => renderToys(toyData))
}

allToys()

function renderToys(toys) {
  toys.forEach(toy => {
    const toyCollection = document.querySelector('#toy-collection')
    const card = document.createElement('div')
    card.className = 'card'

    const h2 = document.createElement('h2')
    h2.textcontent = toy.name

    const img = document.createElement('img')
    img.src = toy.image
    img.className = 'toy-avatar'

    const p = document.createElement('p')
    p.textContent = toy.likes

    const button = document.createElement('button')
    button.className = 'like-btn'
    button.id = toy.id
    button.textContent = 'Like ❤️'

    button.addEventListener('click', () => {
      p.textContent = parseInt(p.textContent) + 1
      fetch('http://localhost:3000/toys/${toy.id}', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Accept: "application/json"},
          body: JSON.stringify({
            likes: parseInt(p.textContent)
          })
      })
    })
    card.append(h2, img, p, button)
    toyCollection.appendChild(card)
    })
}

function addNewToy(){
  const form = document.querySelector("body > div.container > form")
  form.addEventListener('sumbit', (e) => {
    e.preventDefault()
    const inputName = e.target['name'].value
    const inputImage = e.target['image'].value

    const newToy = {
      name: newToy.name,
      image: newToy.image,
      likes: 0
    }
    fetch ('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'},
        body: JSON.stringify(newToy)
    })
    .then(res => res.json())
    .then(toyObj => createCardElement(toyObj))
  })
}
addNewToy()