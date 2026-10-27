
"use strict";

// Find the website sections and learning panel.
const subjectsSection = document.getElementById("subjects");
const lessonPanel = document.getElementById("lessonPanel");
const lessonTitle = document.getElementById("lessonTitle");
const lessonMessage = document.getElementById("lessonMessage");
const closeLessonButton = document.getElementById("closeLesson");

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

// Connect the bottom Choose a Subject button.
const ctaButton = document.getElementById("ctaButton");

if (ctaButton) {
  ctaButton.addEventListener("click", startLearning);
}

// Connect all four subject buttons.
const subjectButtons = document.querySelectorAll("[data-subject]");

subjectButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const subject = button.dataset.subject;

    if (lessonPanel && lessonTitle && lessonMessage) {
      lessonTitle.textContent = "Welcome to " + subject + "!";

      lessonMessage.textContent =
        "You have selected " + subject +
        ". Your lessons and practice questions will appear here as we build your learning system.";

      lessonPanel.hidden = false;

      lessonPanel.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }
  });
});

// Connect the close button.
if (closeLessonButton && lessonPanel) {
  closeLessonButton.addEventListener("click", function () {
    lessonPanel.hidden = true;
  });
}

// Highlight the navigation link that is clicked.
const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    navLinks.forEach(function (item) {
      item.classList.remove("active");
    });

    link.classList.add("active");
  });
});
