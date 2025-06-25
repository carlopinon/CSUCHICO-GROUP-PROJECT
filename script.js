  // Once the page detects a click, it plays the audio
  document.addEventListener("click", function playOnce() {
    const audio = document.getElementById("bg-music");
    if (audio.paused) {
      audio.play().catch(err => console.warn("Autoplay blocked:", err));
    }
    // Remove the listener so this runs just once
    document.removeEventListener("click", playOnce);
  });