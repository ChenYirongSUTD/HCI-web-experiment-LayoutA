document.addEventListener("DOMContentLoaded", function () {
  const removeCaseyInput = document.getElementById("remove-casey");
  const editActionItemsBtn = document.getElementById("edit-action-items-btn");

  const isNotAssignLabelAndNotInEditMode = function () {
    return (
      !removeCaseyInput.classList.contains("assign-label") &&
      editActionItemsBtn.textContent.trim() === "Edit"
    );
  };

  const checkAndLogStatus = function () {
    if (isNotAssignLabelAndNotInEditMode()) {
      console.log(
        "The input does not have the 'assign-label' class and the button text is 'Edit'."
      );
      const questionElement = document.getElementById("question2");
      questionElement.style.display = "block";
    } else {
      console.log(
        "The input either has the 'assign-label' class or the button text is not 'Edit'."
      );
    }
  };

  // Initial check
  checkAndLogStatus();

  // Monitor changes to the class attribute of removeCaseyInput
  const classObserver = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "class"
      ) {
        checkAndLogStatus();
      }
    });
  });

  classObserver.observe(removeCaseyInput, {
    attributes: true,
    attributeFilter: ["class"],
  });

  // Monitor changes to the text content of the editActionItemsBtn
  const textObserver = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.type === "childList") {
        checkAndLogStatus();
      }
    });
  });

  textObserver.observe(editActionItemsBtn, {
    childList: true,
    subtree: true,
  });
});
