// --- Zegar ---
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
  
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  
  const timeStr = `${hours}:${minutes}:${seconds}`;
  const dateStr = `${dayName}, ${day} ${month} ${year}`;
  
  document.getElementById("clock").textContent = `${dateStr} ⏰ ${timeStr}`;
}
updateClock();
setInterval(updateClock, 1000);


// Odlicznik do wakacji
function updateCountdown() {
  const now = new Date();
  // ustaw datę wakacji (np. 26 czerwca 2026)
  const vacation = new Date("2026-06-26T00:00:00");

  const diffMs = vacation - now;
  if(diffMs <= 0){
    document.getElementById("countdown").textContent = "WAKACJE!!! 🎉";
    return;
  }

  const diffDays = Math.floor(diffMs / (1000*60*60*24));
  const diffHours = Math.floor((diffMs % (1000*60*60*24)) / (1000*60*60));
  const diffMinutes = Math.floor((diffMs % (1000*60*60)) / (1000*60));
  const diffSeconds = Math.floor((diffMs % (1000*60)) / 1000);

  document.getElementById("countdown").textContent =
    `Do wakacji pozostało: ${diffDays} dni, ${diffHours} godzin, ${diffMinutes} minut, ${diffSeconds} sekund`;
}

// odświeżanie co sekundę
updateCountdown();
setInterval(updateCountdown, 1000);


// odświeżanie co minutę
updateCountdown();
setInterval(updateCountdown, 60000);

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


// --- Podświetlanie aktualnej lekcji ---
function highlightCurrentLesson() {
  const now = new Date();
  const currentTime = now.getHours() * 60 + now.getMinutes();

  document.querySelectorAll("td.time").forEach(cell => {
    const [startH, startM] = cell.dataset.start.split(":").map(Number);
    const [endH, endM] = cell.dataset.end.split(":").map(Number);

    const startTime = startH * 60 + startM;
    const endTime = endH * 60 + endM;

    if(currentTime >= startTime && currentTime <= endTime){
      cell.parentElement.classList.add("current-lesson");
    } else {
      cell.parentElement.classList.remove("current-lesson");
    }
  });
}
highlightCurrentLesson();
setInterval(highlightCurrentLesson, 30000);
