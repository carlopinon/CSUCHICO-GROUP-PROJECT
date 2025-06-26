document.addEventListener('DOMContentLoaded', () => {
  const seeds = {
    sunflower: { time: 3 * 60, img: 'garden/sunflower.png' },
    roses: { time: 4 * 60, img: 'garden/roses.png' },
    iris: { time: 5 * 60, img: 'garden/iris.png' },
    lily: { time: 6 * 60, img: 'garden/lily.png' }
  };

  const grid = document.getElementById('grid');

  for (let i = 0; i < 16; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cell.ondragover = (e) => e.preventDefault();
    cell.ondrop = (e) => handleDrop(e, cell);
    grid.appendChild(cell);
  }

  function drag(event) {
    event.dataTransfer.setData("type", event.target.dataset.type);
    event.dataTransfer.setData("action", event.target.dataset.action);
  }

  function handleDrop(e, cell) {
    e.preventDefault();
    const type = e.dataTransfer.getData("type");
    const action = e.dataTransfer.getData("action");

    if (type && !cell.dataset.planted) {
      const seed = seeds[type];
      cell.dataset.planted = 'true';
      cell.dataset.seedType = seed.img;
      cell.dataset.totalTime = seed.time;
      cell.dataset.remainingTime = seed.time;
      cell.dataset.fertilized = 'false';

      const timer = document.createElement('div');
      timer.classList.add('timer-label');
      timer.textContent = 'Water to start';
      cell.appendChild(timer);

    } else if (action === 'water' && cell.dataset.planted && !cell.dataset.timerStarted) {
      cell.dataset.timerStarted = 'true';
      let time = parseInt(cell.dataset.remainingTime);
      const timer = cell.querySelector('.timer-label');

      const interval = setInterval(() => {
        if (cell.dataset.fertilized === 'true' && !cell.dataset.halved) {
          time = Math.floor(time / 2);
          cell.dataset.remainingTime = time;
          cell.dataset.halved = 'true';
        }
        if (time > 0) {
          time--;
          cell.dataset.remainingTime = time;
          let minutes = Math.floor(time / 60);
          let seconds = time % 60;
          timer.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        } else {
          clearInterval(interval);
          timer.textContent = 'Bloomed!';
          const img = document.createElement('img');
          img.src = cell.dataset.seedType;
          img.classList.add('plant-img');
          cell.appendChild(img);
        }
      }, 1000);

    } else if (action === 'fertilizer' && cell.dataset.planted && cell.dataset.fertilized === 'false') {
      let remaining = parseInt(cell.dataset.remainingTime);
      let adjusted = Math.ceil(remaining / 2);
      cell.dataset.remainingTime = adjusted;
      cell.dataset.fertilized = 'true';
      const timer = cell.querySelector('.timer-label');
      timer.textContent = `Time halved: ${Math.floor(adjusted / 60)}:${(adjusted % 60).toString().padStart(2, '0')}`;

    } else if (action === 'shovel' && cell.dataset.planted) {
      ['planted', 'seed-type', 'total-time', 'remaining-time', 'fertilized', 'timer-started', 'halved'].forEach(attr => {
        cell.removeAttribute('data-' + attr);
      });
      cell.innerHTML = '';
    }
  }

  // Add clouds at random vertical positions
  const sky = document.getElementById('sky');
  for (let i = 0; i < 10; i++) {
    const cloud = document.createElement('div');
    cloud.className = 'cloud';
    cloud.style.top = Math.random() * 120 + 'px';
    cloud.style.animationDelay = (Math.random() * 10) + 's';
    const img = document.createElement('img');
    img.src = 'garden/clouds.png';
    cloud.appendChild(img);
    sky.appendChild(cloud);
  }

  // Attach drag handler globally (for all draggable images)
  document.querySelectorAll('#controls img').forEach(img => {
    img.addEventListener('dragstart', drag);
  });

});