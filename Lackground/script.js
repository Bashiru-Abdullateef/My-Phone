// Generate 4-digit PIN
function generatePin() {
    let pin = Math.floor(1000 + Math.random() * 9000);
    document.getElementById("Iamhere").innerText = pin;
}

// Run immediately when page loads
generatePin();

let attempts = 0;
let isLocked = false;

// Add number to input
function displayNumber(num) {
    if (isLocked) return;

    let input = document.getElementById("inputNumber");
    input.value += num;
}

// Remove last number
function remove() {
    if (isLocked) return;

    let input = document.getElementById("inputNumber");
    input.value = input.value.slice(0, -1);
}

// Submit Password
function submitPassword() {
    if (isLocked) return;

    let inputValue = document.getElementById("inputNumber").value;
    let realPassword = document.getElementById("Iamhere").innerText;

    console.log("Input:", inputValue, "Real:", realPassword);

    if (inputValue === realPassword) {
        console.log("Password correct, redirecting...");
        // alert("Successful");
        window.location.href = "./ShowData/index.html"; // <-- Redirect works here
    } else {
        attempts++;
        console.log("Wrong attempt:", attempts);
        document.getElementById("inputNumber").value = "";

        if (attempts >= 3) {
            startLock();
        }
    }
}

// Lock system with countdown shown on screen
function startLock() {
    isLocked = true;
    let timeLeft = 20;
    let countdownDisplay = document.getElementById("countdown");

    countdownDisplay.innerText = "Too many attempts! Wait 20 seconds";

    let timer = setInterval(() => {
        timeLeft--;
        countdownDisplay.innerText = "Too many attempts! Wait " + timeLeft + " seconds";

        if (timeLeft <= 0) {
            clearInterval(timer);
            isLocked = false;
            attempts = 0;
            countdownDisplay.innerText = "";
        }
    }, 1000);
}

// Copy password to clipboard
function copyPassword() {
    let password = document.getElementById("Iamhere").innerText;

    navigator.clipboard.writeText(password)
        .then(() => {
            // alert("Password copied!");
        })
        .catch(() => {
            alert("Failed to copy password.");
        });
}