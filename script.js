// Get references to HTML elements
const timeDisplay = document.getElementById("timeDisplay"); // Display element for the time
const startBtn = document.getElementById("startBtn");       // "Start" button
const stopBtn = document.getElementById("stopBtn");         // "Stop" button
const resetBtn = document.getElementById("resetBtn");       // "Reset" button
const lapBtn = document.getElementById("lapBtn");
const toggleThemeBtn = document.getElementById("toggleThemeBtn");
const lapsContainer = document.getElementById("laps");

// Variables to track timing
let startTime = 0;          // Timestamp when timer starts
let elapsedTime = 0;        // Total elapsed time in milliseconds
let timerInterval;          // Holds the interval ID (used to stop the timer)
let lapCount = 0;           //Lap Counter

/**
 * Pad single-digit numbers with a leading zero.
 * Example: 5 → "05"
 */
function pad(unit) {
  return unit < 10 ? '0' + unit : unit;
}

/**
 * Update the time display on the page.
 * Converts milliseconds to hours:minutes:seconds.
 */
function updateTimeDisplay() {
  const totalSeconds = Math.floor(elapsedTime / 1000); // Convert ms to full seconds
  const hours = Math.floor(totalSeconds / 3600);       // Get full hours
  const minutes = Math.floor((totalSeconds % 3600) / 60); // Get remaining minutes
  const seconds = totalSeconds % 60;                   // Get remaining seconds
  const ms = elapsedTime % 100; // Milliseconds
  
  timeDisplay.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${ms
          .toString()
          .padStart(2, "0")}`;
}

/**
 * Starts the timer.
 * Sets an interval that updates elapsed time and display every second.
 */
function startTimer() {
  if (!timerInterval) { // Only start if not already running
    startTime = Date.now() - elapsedTime; // Account for previously elapsed time (e.g., if resumed)
    timerInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime; // Update elapsed time
      updateTimeDisplay();                  // Refresh the display
    }, 100); // Update every second
  }
}

/**
 * Stops (pauses) the timer.
 */
function stopTimer() {
  clearInterval(timerInterval); // Clear the interval
  timerInterval = null;         // Reset the interval flag
}

/**
 * Resets the timer back to zero.
 */
function resetTimer() {
  stopTimer();           // Stop the timer if running
  elapsedTime = 0;       // Reset time to 0
  updateTimeDisplay();   // Update the display to show 00:00:00
  lapsContainer.innerHTML =""; // Clear laps
  lapCount = 0;
}

/**
       * Records a lap time.
       */
      function lapTimer() {
        if (timerInterval) {
          lapCount++;
          const lap = document.createElement("p");
          lap.textContent = `Lap ${lapCount}: ${timeDisplay.textContent}`;
          lapsContainer.prepend(lap);
        }
      }

  /**
       * Toggles between dark and light themes.
       */
      function toggleTheme() {
        document.body.classList.toggle("light");

        // Change icon based on theme
        if (document.body.classList.contains("light")) {
          toggleThemeBtn.textContent = "☀️"; // Light mode
        } else {
          toggleThemeBtn.textContent = "🌙"; // Dark mode
        }
      }

// Add event listeners to buttons
startBtn.addEventListener("click", startTimer); // Start when Start button is clicked
stopBtn.addEventListener("click", stopTimer);   // Stop when Stop button is clicked
resetBtn.addEventListener("click", resetTimer); // Reset when Reset button is clicked
lapBtn.addEventListener("click", lapTimer);
toggleThemeBtn.addEventListener("click", toggleTheme);

// Initialize the time display to 00:00:00 on page load
updateTimeDisplay();
