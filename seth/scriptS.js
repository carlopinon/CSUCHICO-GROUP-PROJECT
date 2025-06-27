const cat = document.getElementById('cat')
const rock = document.getElementById('rock')
const score = document.getElementById('score')

function jump() {
   if (!cat.classList.contains('jump-animation')) {
    cat.classList.add('jump-animation');
    setTimeout(() => {
      cat.classList.remove('jump-animation');
    }, 500);
  }
}

document.addEventListener("keydown", jump);
  

setInterval(() => {
score.innerText++;  
const catTop = parseInt(window.getComputedStyle(cat)
    .getPropertyValue('top'));
const rockLeft = parseInt(window.getComputedStyle(rock)
    .getPropertyValue('left')); 
    
   if(rockLeft < 0) {
    rock.style.display = 'none'; 
   } else {
    rock.style.display = '';
   }

   if (rockLeft < 50 && rockLeft > 0 && catTop > 150 ) {
    alert("Your Score:" + score.innerText + 
    " Want to try again?");
    location.reload();
   }


  
  }, 50);  