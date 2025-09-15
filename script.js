// --- Podświetlanie aktualnej lekcji ---
function highlightCurrentLesson() {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  document.querySelectorAll("td.time").forEach(cell => {
    const [startH, startM] = cell.dataset.start.split(":").map(Number);
    const [endH, endM] = cell.dataset.end.split(":").map(Number);

    const startTime = startH * 60 + startM;
    const endTime = endH * 60 + endM;
    const currentTime = currentHour * 60 + currentMinute;

    if(currentTime >= startTime && currentTime <= endTime){
      cell.parentElement.classList.add("current-lesson");
    } else {
      cell.parentElement.classList.remove("current-lesson");
    }
  });
}

highlightCurrentLesson();
setInterval(highlightCurrentLesson, 30000);
function updateClock() {
  const now = new Date();
  
  const days = ["Niedziela","Poniedziałek","Wtorek","Środa","Czwartek","Piątek","Sobota"];
  const months = ["stycznia","lutego","marca","kwietnia","maja","czerwca",
                  "lipca","sierpnia","września","października","listopada","grudnia"];
  
  const dayName = days[now.getDay()];
  const day = now.getDate();
  const month = months[now.getMonth()];
  const year = now.getFullYear();
  
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  
  // dodaj zero przed cyframi <10
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  
  const timeStr = `${hours}:${minutes}:${seconds}`;
  const dateStr = `${dayName}, ${day} ${month} ${year}`;
  
  document.getElementById("clock").textContent = `${dateStr} ⏰ ${timeStr}`;
}

// pierwsze wywołanie
updateClock();
// aktualizacja co sekundę
setInterval(updateClock, 1000);

// --- Przełączanie grup ---
document.getElementById("btn-gr1").addEventListener("click", () => {
  document.body.classList.remove("gr2-active");
  document.getElementById("btn-gr1").classList.add("active");
  document.getElementById("btn-gr2").classList.remove("active");
});

document.getElementById("btn-gr2").addEventListener("click", () => {
  document.body.classList.add("gr2-active");
  document.getElementById("btn-gr2").classList.add("active");
  document.getElementById("btn-gr1").classList.remove("active");
});

// --- Drukowanie ---
document.getElementById("btn-print").addEventListener("click", () => {
  window.print();
});
