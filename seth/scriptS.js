const cat = document.getElementById('cat')
const rock = document.getElementById('rock')
const score = document.getElementById('score')

function jump() {
    cat.classList.add('jump-animation');
    setTimeout(() => {
    cat.classList.remove('jump-animation');
    }, 250);
}

document.addEventListener("keypress", function() {
  if (cat.classList.contains('jump-animation')) {
    jump(); 
  }  
});

setInterval(() => {
const catTop = parseInt(window.getComputedStyle(cat)
    .getPropertyValue('top'))
    console.log(catTop)
}, 50); 