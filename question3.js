document.addEventListener("DOMContentLoaded", function () {
  const minutesTextDiv = document.getElementById("minutes-text");
  const editMinutesBtn = document.getElementById("edit-minutes-btn");

  const checkMinutesText = function () {
    const minutesText = minutesTextDiv.innerText.toLowerCase();
    const budgetAndFundraisingIndex = minutesText.indexOf(
      "budget and fundraising"
    );

    if (budgetAndFundraisingIndex !== -1) {
      const searchText =
        "established a fundraising goal of $5,000 with a breakdown of expected contributions from sponsors and ticket sales".toLowerCase();
      const textAfterBudget = minutesText.substring(budgetAndFundraisingIndex);
      if (textAfterBudget.includes(searchText)) {
        const questionElement = document.getElementById("question3");
        if (questionElement) {
          questionElement.style.display = "block";
        }
      }
    }
  };

  // Initial check
  checkMinutesText();

  // Add event listener to the Save button
  editMinutesBtn.addEventListener("click", function () {
    checkMinutesText();
  });
});
