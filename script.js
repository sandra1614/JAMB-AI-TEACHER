
"use strict";

// ========================================
// 1. FIND WEBSITE ELEMENTS
// ========================================

const subjectsSection = document.getElementById("subjects");
const mathTopics = document.getElementById("mathTopics");
const lessonPanel = document.getElementById("lessonPanel");
const lessonTitle = document.getElementById("lessonTitle");
const lessonMessage = document.getElementById("lessonMessage");
const closeLessonButton = document.getElementById("closeLesson");

// ========================================
// 2. START LEARNING BUTTONS
// ========================================

function startLearning() {
  if (subjectsSection) {
    subjectsSection.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
}

const startButton = document.getElementById("startButton");
const ctaButton = document.getElementById("ctaButton");

if (startButton) {
  startButton.addEventListener("click", startLearning);
}

if (ctaButton) {
  ctaButton.addEventListener("click", startLearning);
}

// ========================================
// 3. INDICES LESSONS
// ========================================

const mathematicsLessons = [
  {
    title: "Lesson 1: Introduction to Indices",
    explanation:
      "Indices tell us how many times a number is multiplied by itself. For example, 2³ means 2 × 2 × 2.",
    example:
      "Example: 2³ = 2 × 2 × 2 = 8. The number 2 is the base, and 3 is the index.",
    question: "What is 3²?",
    options: ["6", "9", "5", "12"],
    answer: 1,
    reason: "3² means 3 × 3, which equals 9."
  },
  {
    title: "Lesson 2: Multiplying Indices",
    explanation:
      "When multiplying powers with the same base, add their indices.",
    example:
      "Example: 2² × 2³ = 2⁵ = 32. We add the indices: 2 + 3 = 5.",
    question: "Simplify 5² × 5³.",
    options: ["5⁶", "5⁵", "10⁵", "5¹"],
    answer: 1,
    reason: "Add the indices: 2 + 3 = 5. The answer is 5⁵."
  },
  {
    title: "Lesson 3: Dividing Indices",
    explanation:
      "When dividing powers with the same non-zero base, subtract the indices.",
    example:
      "Example: 3⁴ ÷ 3² = 3² = 9. We subtract: 4 − 2 = 2.",
    question: "Simplify 2⁵ ÷ 2².",
    options: ["2⁷", "2³", "2²", "4³"],
    answer: 1,
    reason: "Subtract: 5 − 2 = 3. So 2³ = 8."
  }
];

let currentLessonIndex = 0;

// ========================================
// 4. DISPLAY A LESSON
// ========================================

function showMathematicsLesson(index) {
  const lesson = mathematicsLessons[index];

  if (!lessonPanel || !lessonTitle || !lessonMessage || !lesson) {
    return;
  }

  lessonTitle.textContent = lesson.title;
  lessonMessage.textContent =
    lesson.explanation + " " + lesson.example;

  lessonPanel.hidden = false;

  let oldContent = document.getElementById("lessonActivities");

  if (oldContent) {
    oldContent.remove();
  }

  const activities = document.createElement("div");
  activities.id = "lessonActivities";
  activities.className = "lesson-activities";

  const questionHeading = document.createElement("h3");
  questionHeading.textContent = "Test Your Understanding";

  const questionText = document.createElement("p");
  questionText.textContent = lesson.question;

  const answerList = document.createElement("div");
  answerList.className = "lesson-answer-list";

  const feedback = document.createElement("p");
  feedback.className = "lesson-feedback";
  feedback.setAttribute("role", "status");

  let answered = false;

  lesson.options.forEach(function (option, optionIndex) {
    const answerButton = document.createElement("button");

    answerButton.type = "button";
    answerButton.className = "lesson-answer";
    answerButton.textContent =
      String.fromCharCode(65 + optionIndex) + ". " + option;

    answerButton.addEventListener("click", function () {
      if (answered) {
        return;
      }

      answered = true;

      if (optionIndex === lesson.answer) {
        feedback.textContent = "Correct! " + lesson.reason;
        feedback.classList.add("correct");
      } else {
        feedback.textContent = "Not quite. " + lesson.reason;
        feedback.classList.add("incorrect");
      }

      answerList.querySelectorAll("button").forEach(function (item) {
        item.disabled = true;
      });
    });

    answerList.appendChild(answerButton);
  });

  const navigation = document.createElement("div");
  navigation.className = "lesson-navigation";

  const previousButton = document.createElement("button");
  previousButton.type = "button";
  previousButton.className = "lesson-nav-button";
  previousButton.textContent = "← Previous lesson";
  previousButton.disabled = index === 0;

  previousButton.addEventListener("click", function () {
    if (currentLessonIndex > 0) {
      currentLessonIndex--;
      showMathematicsLesson(currentLessonIndex);
    }
  });

  const nextButton = document.createElement("button");
  nextButton.type = "button";
  nextButton.className = "lesson-nav-button";
  nextButton.textContent = "Next lesson →";
  nextButton.disabled = index === mathematicsLessons.length - 1;

  nextButton.addEventListener("click", function () {
    if (currentLessonIndex < mathematicsLessons.length - 1) {
      currentLessonIndex++;
      showMathematicsLesson(currentLessonIndex);
    }
  });

  navigation.append(previousButton, nextButton);

  activities.append(
    questionHeading,
    questionText,
    answerList,
    feedback,
    navigation
  );

  lessonPanel.appendChild(activities);

  lessonPanel.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
}

// ========================================
// 5. TOPIC MENU
// ========================================

const topicButtons = document.querySelectorAll("[data-topic]");

topicButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const topic = button.dataset.topic;

    if (topic === "indices") {
      currentLessonIndex = 0;
      showMathematicsLesson(currentLessonIndex);
      return;
    }

    if (lessonPanel && lessonTitle && lessonMessage) {
      const topicNames = {
        fractions: "Fractions",
        algebra: "Algebra",
        quadratics: "Quadratic Equations"
      };

      lessonTitle.textContent = topicNames[topic] || "Mathematics";

      lessonMessage.textContent =
        "This topic is on our learning roadmap. We will add its explanations and practice questions next.";

      lessonPanel.hidden = false;

      const oldContent = document.getElementById("lessonActivities");

      if (oldContent) {
        oldContent.remove();
      }

      lessonPanel.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }
  });
});

// ========================================
// 6. SUBJECT BUTTONS
// ========================================

const subjectButtons = document.querySelectorAll("[data-subject]");

subjectButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const subject = button.dataset.subject;

    if (!lessonPanel || !lessonTitle || !lessonMessage) {
      return;
    }

    if (subject === "Mathematics") {
      if (mathTopics) {
        mathTopics.hidden = false;
        mathTopics.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }

      lessonPanel.hidden = true;
      return;
    }

    if (mathTopics) {
      mathTopics.hidden = true;
    }

    lessonTitle.textContent = "Welcome to " + subject + "!";

    lessonMessage.textContent =
      "You selected " + subject +
      ". We will add lessons and practice questions for this subject next.";

    lessonPanel.hidden = false;

    const oldContent = document.getElementById("lessonActivities");

    if (oldContent) {
      oldContent.remove();
    }

    lessonPanel.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  });
});

// ========================================
// 7. CLOSE LESSON
// ========================================

if (closeLessonButton && lessonPanel) {
  closeLessonButton.addEventListener("click", function () {
    lessonPanel.hidden = true;
  });
}

// ========================================
// 8. NAVIGATION LINKS
// ========================================

const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    navLinks.forEach(function (item) {
      item.classList.remove("active");
    });

    link.classList.add("active");
  });
});
