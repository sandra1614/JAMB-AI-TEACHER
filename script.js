
"use strict";

// Find the subjects section.
const subjectsSection = document.getElementById("subjects");

// Show a small notification on the page.
function showMessage(title, message) {
  // Remove an older notification if one exists.
  const oldToast = document.querySelector(".toast");

  if (oldToast) {
    oldToast.remove();
  }

  // Create the notification.
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.setAttribute("role", "status");
  toast.setAttribute("aria-live", "polite");

  const closeButton = document.createElement("button");
  closeButton.className = "toast-close";
  closeButton.type = "button";
  closeButton.textContent = "×";
  closeButton.setAttribute("aria-label", "Close notification");

  closeButton.addEventListener("click", function () {
    toast.remove();
  });

  const heading = document.createElement("strong");
  heading.textContent = title;

  const paragraph = document.createElement("p");
  paragraph.textContent = message;

  toast.append(closeButton, heading, paragraph);
  document.body.appendChild(toast);
}

// Scroll to the subjects section.
function startLearning() {
  if (subjectsSection) {
    subjectsSection.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
}

// Connect the main Start Learning button.
const startButton = document.getElementById("startButton");

if (startButton) {
  startButton.addEventListener("click", startLearning);
}

// Connect the bottom call-to-action button.
const ctaButton = document.getElementById("ctaButton");

if (ctaButton) {
  ctaButton.addEventListener("click", startLearning);
}

// Handle clicks on individual subject cards.
const subjectButtons = document.querySelectorAll("[data-subject]");

subjectButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const subject = button.dataset.subject;

    showMessage(
      subject + " selected!",
      "Your " + subject +
      " learning area is being prepared. The next step is to add lessons, practice questions, and AI teaching."
    );
  });
});

// Update the active navigation link when clicked.
const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    navLinks.forEach(function (item) {
      item.classList.remove("active");
    });

    link.classList.add("active");
  });
});
