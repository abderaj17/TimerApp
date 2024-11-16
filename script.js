const setButton = document.getElementById("set-button");
const timersContainer = document.getElementById("timers-container");

setButton.addEventListener("click", () => {
    const hours = parseInt(document.getElementById("hours").value) || 0;
    const minutes = parseInt(document.getElementById("minutes").value) || 0;
    const seconds = parseInt(document.getElementById("seconds").value) || 0;

    let totalSeconds = hours * 3600 + minutes * 60 + seconds;

    // Validate input
    if (totalSeconds <= 0) {
        alert("Please enter a valid time!");
        return;
    }

    // Create the timer
    createTimer(totalSeconds);

    // Clear input fields
    document.getElementById("hours").value = "";
    document.getElementById("minutes").value = "";
    document.getElementById("seconds").value = "";
});

function createTimer(totalSeconds) {
    const noTimersMessage = timersContainer.querySelector("p");
    if (noTimersMessage) {
        noTimersMessage.remove();
    }

    const timerItem = document.createElement("div");
    timerItem.className = "timer-item";

    const timerDisplay = document.createElement("span");
    timerDisplay.textContent = formatTime(totalSeconds);

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.textContent = "Delete";

    const stopButton = document.createElement("button");
    stopButton.className = "stop-button";
    stopButton.textContent = "Stop";

    timerItem.appendChild(timerDisplay);
    timerItem.appendChild(deleteButton);

    timersContainer.appendChild(timerItem);

    // Start countdown
    const intervalId = setInterval(() => {
        totalSeconds--;
        if (totalSeconds <= 0) {
            clearInterval(intervalId);

            // Change appearance when timer ends
            timerItem.classList.add("completed");
            timerItem.textContent = "Timer Is Up!";

            // Add the Stop button
            timerItem.appendChild(stopButton);
        } else {
            timerDisplay.textContent = formatTime(totalSeconds);
        }
    }, 1000);

    // Delete timer
    deleteButton.addEventListener("click", () => {
        clearInterval(intervalId);
        timerItem.remove();
        checkNoTimers();
    });

    // Stop timer
    stopButton.addEventListener("click", () => {
        clearInterval(intervalId);
        timerItem.remove();
        checkNoTimers();
    });
}

function formatTime(totalSeconds) {
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
}

function checkNoTimers() {
    if (!timersContainer.querySelector(".timer-item")) {
        timersContainer.innerHTML = `<p><strong>You have no timers currently!</strong></p>`;
    }
}
