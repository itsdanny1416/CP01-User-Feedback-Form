document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("feedback-form");
  const feedbackDisplay = document.getElementById("feedback-display");
  const comments = document.getElementById("comments");
  const charCount = document.querySelector(".char-count");

  // Step 3a: Character count
  comments.addEventListener("input", (e) => {
    let length = e.target.value.length;
    if (length > 200) {
      e.target.value = e.target.value.substring(0, 200);
      length = 200;
    }
    charCount.textContent = `${length}/200`;
  });

  // Step 3b: Tooltip show/hide (event bubbling + delegation)
  form.addEventListener("mouseover", (e) => {
    if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") {
      const tooltip = e.target.parentElement.querySelector(".tooltip");
      tooltip.style.display = "block";
    }
  });

  form.addEventListener("mouseout", (e) => {
    if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") {
      const tooltip = e.target.parentElement.querySelector(".tooltip");
      tooltip.style.display = "none";
    }
  });

  // Step 3c: Form validation and submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid = true;

    [...form.elements].forEach((el) => {
      if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
        const errorMessage = el.parentElement.querySelector(".error-message");
        if (!el.value.trim()) {
          errorMessage.textContent = `${el.name} is required`;
          isValid = false;
        } else {
          errorMessage.textContent = "";
        }
      }
    });

    if (isValid) {
      const entry = document.createElement("div");
      entry.classList.add("feedback-entry");
      entry.innerHTML = `
        <strong>${form.username.value}</strong> (${form.email.value})<br>
        <p>${form.comments.value}</p>
      `;
      feedbackDisplay.appendChild(entry);

      form.reset();
      charCount.textContent = "0/200";
    }
  });

  // Step 5: Stop propagation on form clicks
  form.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  // Background click event just for demo
  document.body.addEventListener("click", () => {
    console.log("Background clicked (form events ignored due to stopPropagation)");
  });
});
