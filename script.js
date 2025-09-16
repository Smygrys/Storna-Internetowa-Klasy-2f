// --- Zegar w nagłówku ---
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
  
  const clockEl = document.getElementById("clock");
  if(clockEl) clockEl.textContent = `${dateStr} ⏰ ${timeStr}`;
}
updateClock();
setInterval(updateClock, 1000);


// --- Odliczanie do wakacji ---
function updateCountdown() {
  const now = new Date();
  const vacation = new Date("2026-06-26T00:00:00");
  const diffMs = vacation - now;

  const countdownEl = document.getElementById("countdown");
  if (!countdownEl) return;

  if(diffMs <= 0){
    countdownEl.textContent = "WAKACJE!!! 🎉";
    return;
  }

  const diffDays = Math.floor(diffMs / (1000*60*60*24));
  const diffHours = Math.floor((diffMs % (1000*60*60*24)) / (1000*60*60));
  const diffMinutes = Math.floor((diffMs % (1000*60*60)) / (1000*60));
  const diffSeconds = Math.floor((diffMs % (1000*60)) / 1000);

  countdownEl.textContent =
    `Do wakacji pozostało: ${diffDays} dni, ${diffHours} godzin, ${diffMinutes} minut, ${diffSeconds} sekund`;
}
updateCountdown();
setInterval(updateCountdown, 1000);


// --- Podświetlenie aktualnej lekcji ---
let lessonCountdownInterval = null;

function updateLessonHighlightAndCountdown() {
  const now = new Date();
  let found = false;

  // Usuń poprzednie podświetlenia i liczniki
  document.querySelectorAll("td.current-lesson").forEach(td => td.classList.remove("current-lesson"));
  document.querySelectorAll(".lesson-countdown").forEach(el => el.remove());

  const dayIndex = now.getDay(); // 0=niedziela,1=poniedziałek,...
  if(dayIndex < 1 || dayIndex > 5) return; // tylko dni p-pt
  const colIndex = dayIndex + 1; // tabela: 0=nr,1=godz,2=pon,...

  document.querySelectorAll("td.time").forEach(cell => {
    const [sH, sM] = cell.dataset.start.split(":").map(Number);
    const [eH, eM] = cell.dataset.end.split(":").map(Number);

    const startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), sH, sM);
    const endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), eH, eM);

    if(now >= startDate && now < endDate && !found) {
      found = true;
      const row = cell.parentElement;
      const subjectCell = row.children[colIndex];

      if(subjectCell && subjectCell.textContent.trim() !== "") {
        subjectCell.classList.add("current-lesson");

        const countdownSpan = document.createElement("div");
        countdownSpan.className = "lesson-countdown";
        countdownSpan.setAttribute("data-end-ts", endDate.getTime());
        subjectCell.appendChild(countdownSpan);

        if(lessonCountdownInterval) clearInterval(lessonCountdownInterval);

        lessonCountdownInterval = setInterval(() => {
          const now2 = new Date();
          const endTs = Number(countdownSpan.getAttribute("data-end-ts"));
          const secsLeft = Math.max(0, Math.floor((endTs - now2.getTime()) / 1000));
          countdownSpan.textContent = `⏳ ${Math.floor(secsLeft/60)}m ${secsLeft%60}s`;
          if(secsLeft <= 0){
            clearInterval(lessonCountdownInterval);
            lessonCountdownInterval = null;
            updateLessonHighlightAndCountdown();
          }
        }, 1000);
      }
    }
  });
}
updateLessonHighlightAndCountdown();
setInterval(updateLessonHighlightAndCountdown, 10000);


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

// --- Theme changer ---
const themeToggleBtn = document.getElementById("btn-theme");

function applyTheme(theme) {
  if(theme === "dark") {
    document.body.classList.add("dark-theme");
  } else {
    document.body.classList.remove("dark-theme");
  }
}

themeToggleBtn.addEventListener("click", () => {
  if(document.body.classList.contains("dark-theme")) {
    applyTheme("light");
    localStorage.setItem("theme", "light");
  } else {
    applyTheme("dark");
    localStorage.setItem("theme", "dark");
  }
});

// Load saved theme
const savedTheme = localStorage.getItem("theme") || "light";
applyTheme(savedTheme);
