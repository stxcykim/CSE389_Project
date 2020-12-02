//inputs from the form
const myForm = document.querySelector('#my-form');
const nameInput = document.querySelector('#name');
const reviewInput = document.querySelector('#review');
const itemInput = document.querySelector('#item-select');
const msg = document.querySelector('.msg');
const reviewList = document.querySelector('#reviews');
const stars = document.querySelectorAll('#rating span');
var rating = 0;

//add listener when star is hovered over
for(var i=0; i < stars.length; i++){
    stars[i].setAttribute('data-count', i);
    stars[i].addEventListener('mouseenter', enterStarListener);

}

//remove hover when mouse leaves star
document.querySelector('#rating').addEventListener('mouseleave', leaveStarListener);
//get rating when clicked
document.querySelector('#rating').addEventListener('click', getRating);

function getRating(e){
  rating = 0;
  //determine which star is hovered over and set rating
  for (let i = 0; i < stars.length; i++) {
    if (stars[i].classList.contains('hover')){
      rating++
    }
  }
  //fill stars
  for (var i = 0; i < rating; i++){
    stars[i].classList.add('fill');
  }
  //console.log(rating);
  //console.log(stars);
}

function enterStarListener(e){
    fillStars(e.target)
};

function leaveStarListener(e) {
    fillStars(null);
};

function fillStars(el) {
    // Remove all hover states:
    for (var i = 0; i < stars.length; i++) {
      if (el == null || stars[i].getAttribute('data-count') > el.getAttribute('data-count')) {
        stars[i].classList.remove('hover');
      }
      //add hover 
      else {
        stars[i].classList.add('hover');
      }
    }
  };
  

  
//form gets submitted
myForm.addEventListener('submit', onSubmit);

function onSubmit(e) {
    e.preventDefault();
    //make user submit all fields
    if(nameInput.value === '' || reviewInput.value === '' || rating == 0){
        msg.classList.add('error');
        msg.innerHTML = 'Please enter all fields';
        setTimeout(() => msg.remove(), 3000);
    } else{

        //creating span element for element being reviewed
        var span = document.createElement('span');
        span.style.fontSize = "35px";
        span.appendChild(document.createTextNode(`${itemInput.value}`))
        

        //create list element and span element for the star rating
        const li = document.createElement('li');
        var starspan = document.createElement('span');

        //set star size
        starspan.style.fontSize = "35px";

        li.appendChild(span)
        li.appendChild(document.createElement("br"));
        
        //determine number of stars to display
        if (rating == 1){
          starspan.appendChild(document.createTextNode('★'));
          li.appendChild(starspan);
          
        }
        if (rating == 2){
          starspan.appendChild(document.createTextNode('★★'));
          li.appendChild(starspan);
        }
        if (rating == 3){
          starspan.appendChild(document.createTextNode('★★★'));
          li.appendChild(starspan);
        }
        if (rating == 4){
          starspan.appendChild(document.createTextNode('★★★★'));
          li.appendChild(starspan);
        }
        if (rating == 5){
          starspan.appendChild(document.createTextNode('★★★★★'));
          li.appendChild(starspan);
        }

        //add review and user name
        li.appendChild(document.createElement("br"));
        li.appendChild(document.createTextNode(`"${reviewInput.value}"`));
        li.appendChild(document.createElement("br"));
        li.appendChild(document.createTextNode(`-${nameInput.value}`));
        
        //add list element to the user list and reset values
        reviewList.appendChild(li);
        nameInput.value = '';
        reviewInput.value = '';
        rating = 0;
        for (var i = 0; i < stars.length; i++){
          stars[i].classList.remove('fill');
          stars[i].classList.remove('hover');
        }
    
    }
}
