document.addEventListener("DOMContentLoaded", function () {
  const downloadBtns = document.querySelectorAll(".download-button");
  downloadBtns.forEach((btn) => {
    btn.addEventListener("mouseenter", function () {
      const tooltip = btn.querySelector(".tooltip");
      tooltip.style.visibility = "visible";
      tooltip.style.opacity = "1";
    });

    btn.addEventListener("mouseleave", function () {
      const tooltip = btn.querySelector(".tooltip");
      tooltip.style.visibility = "hidden";
      tooltip.style.opacity = "0";
    });
  });

  const participantsBtn = document.getElementById("edit-participants-btn");
  const descriptionBtn = document.getElementById("edit-description-btn");
  const agendaBtn = document.getElementById("edit-agenda-btn");
  const actionItemsBtn = document.getElementById("edit-action-items-btn");
  const addActionItemButton = document.getElementById("add-action-item-btn");
  const titleBtn = document.getElementById("edit-title-btn");
  const minuteBtn = document.getElementById("edit-minutes-btn");

  function toggleEditMode(
    button,
    sectionId,
    inputType = "input",
    multiline = false
  ) {
    const section = document.getElementById(sectionId);
    let isEditing = section.querySelector(inputType + ".edit-mode") != null;
    console.log(sectionId, multiline);

    if (isEditing) {
      // Save changes
      const input = section.querySelector(inputType + ".edit-mode");
      const newText = input.value;

      if (inputType === "textarea") {
        const keywords = [
          "Event Overview and Objectives",
          "Venue and Logistics",
          "Budget and Fundraising",
          "Marketing and Promotion",
          "Volunteer Coordination",
          "Entertainment and Activities",
          "Safety and Health Measures",
          "Post-Event Evaluation",
          "Next Steps and Follow-Up",
          "Agenda Summaries",
        ];

        let formattedText = newText.replace(/\n/g, "<br>");

        keywords.forEach((keyword) => {
          const regex = new RegExp(`(${keyword})`, "g");
          formattedText = formattedText.replace(
            regex,
            "<strong><u>$1</u></strong>"
          );
        });

        section.innerHTML = `<p id="${sectionId}-text" class="description-text">${formattedText}</p>`;
        section.classList.remove("overflow-hidden");
      } else {
        section.innerHTML = newText;
      }

      button.innerHTML = '<i class="bi bi-pencil"></i>Edit';
      isEditing = false;
    } else {
      // Enter edit mode
      const currentText = section.innerText.trim();
      const input = document.createElement(inputType);
      input.value = currentText;
      input.classList.add("edit-mode");
      if (multiline) {
        input.style.width = "100%";
        if (sectionId === "minutes-text") {
          section.classList.add("overflow-hidden");
          input.style.height = "auto";
          input.style.minHeight = "50vh";
        } else {
          input.style.height = "auto";
        }
      }
      section.innerHTML = "";
      section.appendChild(input);

      button.innerHTML = '<i class="bi bi-save"></i>Save';
      isEditing = true;
    }
  }

  minuteBtn.addEventListener("click", () =>
    toggleEditMode(minuteBtn, "minutes-text", "textarea", true)
  );

  participantsBtn.addEventListener("click", () =>
    toggleEditMode(participantsBtn, "participants")
  );
  descriptionBtn.addEventListener("click", () =>
    toggleEditMode(descriptionBtn, "description-text", "textarea", true)
  );
  agendaBtn.addEventListener("click", () => {
    const agendaList = document.getElementById("agenda-list");
    const agendaItems = agendaList.querySelectorAll("li");
    let isEditing = agendaList.querySelector("input.edit-mode") != null;

    if (isEditing) {
      // Save changes
      agendaItems.forEach((item) => {
        const input = item.querySelector("input.edit-mode");
        if (input) {
          const newText = input.value;
          item.innerHTML = newText;
        }
      });

      agendaBtn.innerHTML = '<i class="bi bi-pencil"></i>Edit';
      isEditing = false;
    } else {
      // Enter edit mode
      agendaItems.forEach((item) => {
        const currentText = item.innerText.trim();
        const input = document.createElement("input");
        input.value = currentText;
        input.classList.add("edit-mode");
        item.innerHTML = "";
        item.appendChild(input);
      });

      agendaBtn.innerHTML = '<i class="bi bi-save"></i>Save';
      isEditing = true;
    }
  });

  actionItemsBtn.addEventListener("click", function () {
    const actionItems = document.querySelectorAll("#action-items li");
    let isEditing = actionItems[0].querySelector("input.edit-mode") != null;

    if (isEditing) {
      // Save changes
      actionItems.forEach((listItem) => {
        const input = listItem.querySelector("input.edit-mode");
        const span = document.createElement("span");
        span.innerText = input.value;
        listItem.insertBefore(span, input);
        listItem.removeChild(input);
      });

      // Disable assign inputs
      document.querySelectorAll(".assign-input").forEach((input) => {
        if (input.value) {
          input.classList.add("assign-label");
        }
        input.disabled = true;
      });

      addActionItemButton.style.display = "none";
      actionItemsBtn.innerHTML = '<i class="bi bi-pencil"></i>Edit';
      isEditing = false;
    } else {
      // Enter edit mode
      actionItems.forEach((listItem) => {
        const span = listItem.querySelector("span");
        const currentText = span.innerText;
        const input = document.createElement("input");
        input.type = "text";
        input.value = currentText;
        input.classList.add("edit-mode");
        listItem.insertBefore(input, span);
        listItem.removeChild(span);
      });

      // Enable assign inputs
      document.querySelectorAll(".assign-input").forEach((input) => {
        input.disabled = false;
        input.classList.remove("assign-label");
      });

      addActionItemButton.style.display = "block";
      actionItemsBtn.innerHTML = '<i class="bi bi-save"></i>Save';
      isEditing = true;
    }
  });

  addActionItemButton.addEventListener("click", function () {
    const actionItemsList = document.getElementById("action-items");
    const newListItem = document.createElement("li");
    newListItem.classList.add("action-item-row");

    const newSpan = document.createElement("span");
    newSpan.innerText = "New Action Item";

    const newInput = document.createElement("input");
    newInput.type = "text";
    newInput.placeholder = "Assign to …";
    newInput.style.position = "relative";
    newInput.classList.add("assign-input");

    const newSuggestionList = document.createElement("div");
    newSuggestionList.classList.add("suggestion-list");

    newListItem.appendChild(newSpan);
    newListItem.appendChild(newInput);
    newListItem.appendChild(newSuggestionList);
    actionItemsList.appendChild(newListItem);

    // Make the new input editable
    newSpan.addEventListener("click", function () {
      const currentText = newSpan.innerText;
      const input = document.createElement("input");
      input.type = "text";
      input.value = currentText;
      input.classList.add("edit-mode");
      newListItem.insertBefore(input, newSpan);
      newListItem.removeChild(newSpan);
    });

    // Enable new input for assignment
    newInput.addEventListener("input", function () {
      const value = this.value.toLowerCase();
      const suggestionBox = this.nextElementSibling;

      suggestionBox.innerHTML = ""; // Clear previous suggestions

      if (value) {
        const suggestions = participants
          .filter((name) => name.toLowerCase().startsWith(value))
          .slice(0, 5);
        suggestions.forEach((suggestion) => {
          const div = document.createElement("div");
          div.innerText = suggestion;
          div.addEventListener("click", () => {
            newInput.value = suggestion;
            suggestionBox.innerHTML = ""; // Clear suggestions after selection
            newInput.disabled = false;
          });
          suggestionBox.appendChild(div);
        });
      }
    });

    newInput.addEventListener("blur", function () {
      setTimeout(() => {
        this.nextElementSibling.innerHTML = ""; // Clear suggestions when input loses focus
      }, 200); // Delay to allow click event on suggestion to fire
    });

    newInput.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === "Tab") {
        newInput.disabled = false;
      }
    });

    newInput.addEventListener("focus", function () {
      if (newInput.classList.contains("assign-label")) {
        newInput.classList.remove("assign-label");
        newInput.disabled = false;
      }
    });
  });

  // Assign Participants
  const participants = "<%= @meeting&.participants || '' %>".split(", ");

  document.querySelectorAll(".assign-input").forEach((input) => {
    input.addEventListener("input", function () {
      const value = this.value.toLowerCase();
      const suggestionBox = this.nextElementSibling;

      suggestionBox.innerHTML = ""; // Clear previous suggestions

      if (value) {
        const suggestions = participants
          .filter((name) => name.toLowerCase().startsWith(value))
          .slice(0, 5);
        suggestions.forEach((suggestion) => {
          const div = document.createElement("div");
          div.innerText = suggestion;
          div.addEventListener("click", () => {
            input.value = suggestion;
            suggestionBox.innerHTML = ""; // Clear suggestions after selection
            input.disabled = false;
          });
          suggestionBox.appendChild(div);
        });
      }
    });

    input.addEventListener("blur", function () {
      setTimeout(() => {
        this.nextElementSibling.innerHTML = ""; // Clear suggestions when input loses focus
      }, 200); // Delay to allow click event on suggestion to fire
    });

    input.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === "Tab") {
        input.disabled = false;
      }
    });

    input.addEventListener("focus", function () {
      if (input.classList.contains("assign-label")) {
        input.classList.remove("assign-label");
        input.disabled = false;
      }
    });
  });

  // Edit Title
  titleBtn.addEventListener("click", function () {
    const titleElement = document.getElementById("meeting-title");
    let isEditing = titleElement.querySelector("input.edit-mode") != null;

    if (isEditing) {
      // Save changes
      const input = titleElement.querySelector("input.edit-mode");
      const newText = input.value;
      titleElement.innerHTML = newText;

      titleBtn.innerHTML = '<i class="bi bi-pencil"></i>Edit';
      isEditing = false;
    } else {
      // Enter edit mode
      const currentText = titleElement.innerText.trim();
      const input = document.createElement("input");
      input.value = currentText;
      input.classList.add("edit-mode");
      titleElement.innerHTML = "";
      titleElement.appendChild(input);

      titleBtn.innerHTML = '<i class="bi bi-save"></i>Save';
      isEditing = true;
    }
  });
minuteBtn.click();
setTimeout(() => minuteBtn.click(), 0); 
});
