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


// --- Toggle update log ---
const toggleButton = document.getElementById("toggle-update-log");
const updateLog = document.getElementById("update-log");

toggleButton.addEventListener("click", () => {
  updateLog.style.display = (updateLog.style.display === "none" || updateLog.style.display === "") ? "block" : "none";
});


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


// --- Licznik online (Firebase) ---

const firebaseConfig = {
  apiKey: "AIzaSyC3KORgygWHumB2ihi-bNXm4Xi4oNcMOEU",
  authDomain: "plan-2f.firebaseapp.com",
  databaseURL: "https://plan-2f-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "plan-2f",
  storageBucket: "plan-2f.firebasestorage.app",
  messagingSenderId: "872812572425",
  appId: "1:872812572425:web:a7f1580fc115486fc16dd8",
  measurementId: "G-BWZY17K58L"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const onlineRef = db.ref("onlineUsers");
const sessionId = Math.random().toString(36).substring(2);

// Dodaj użytkownika do online
onlineRef.child(sessionId).set(true);

// Usuń przy wyjściu ze strony
window.addEventListener("beforeunload", () => {
  onlineRef.child(sessionId).remove();
});

// Wyświetl licznik online w czasie rzeczywistym
onlineRef.on("value", snapshot => {
  const count = snapshot.numChildren();
  document.getElementById("online-count").textContent = count;
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


