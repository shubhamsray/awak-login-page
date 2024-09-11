// Function to toggle password visibility
function togglePassword() {
  const passwordField = document.getElementById("password");
  const toggleIcon = document.querySelector(".toggle-password ion-icon");

  // Toggle the type attribute
  if (passwordField.type === "password") {
    passwordField.type = "text";
    toggleIcon.setAttribute("name", "eye-off");
  } else {
    passwordField.type = "password";
    toggleIcon.setAttribute("name", "eye");
  }
}

// Select the wrapper element
const wrapper = document.querySelector(".wrapper");

// Button to open the login popup
const btnPopup = document.querySelector(".btnLogin-popup");
btnPopup.addEventListener("click", () => {
  wrapper.classList.add("active-popup");
});

// Button to close the popup
const iconClose = document.querySelector(".icon-close");
iconClose.addEventListener("click", () => {
  wrapper.classList.remove("active-popup");
});

// Form validation and API integration
const form = document.getElementById("loginForm");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const usernameError = document.getElementById("usernameError");
const passwordError = document.getElementById("passwordError");
const loginButton = document.querySelector(".btn");
const spinner = document.getElementById("spinner");
const message = document.getElementById("message");
const toast = document.getElementById("toast");

// Event listener for form input to enable/disable the login button based on validation
form.addEventListener("input", () => {
  const isValid = validateForm();
  loginButton.disabled = !isValid;
});

// Event listener for form submission
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  loginButton.disabled = true;
  spinner.style.display = "block";

  const username = usernameInput.value;
  const password = passwordInput.value;

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    console.log("Response:", response);

    if (response.ok) {
      showToast("Login successful!");
    } else {
      message.textContent = "Login failed. Please try again.";
      message.style.color = "red";
    }
  } catch (error) {
    console.error("Error:", error);
    message.textContent = "An error occurred. Please try again later.";
    message.style.color = "red";
  } finally {
    spinner.style.display = "none";
    loginButton.disabled = false;
  }
});

// Function to validate the form
function validateForm() {
  let isValid = true;

  if (!usernameInput.value) {
    usernameError.textContent = "Username/Email is required.";
    usernameError.style.display = "block";
    isValid = false;
  } else if (!validateEmail(usernameInput.value)) {
    usernameError.textContent = "Invalid email format.";
    usernameError.style.display = "block";
    isValid = false;
  } else {
    usernameError.style.display = "none";
  }

  if (!passwordInput.value) {
    passwordError.textContent = "Password is required.";
    passwordError.style.display = "block";
    isValid = false;
  } else if (passwordInput.value.length < 6) {
    passwordError.textContent = "Password must be at least 6 characters long.";
    passwordError.style.display = "block";
    isValid = false;
  } else {
    passwordError.style.display = "none";
  }

  return isValid;
}

// Function to validate email format
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Function to show the toast notification
function showToast(message) {
  toast.querySelector(".toast-message").textContent = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}
