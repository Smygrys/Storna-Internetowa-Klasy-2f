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

