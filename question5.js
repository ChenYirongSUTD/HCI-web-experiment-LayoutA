document.addEventListener("DOMContentLoaded", function () {
  const minutesTextDiv = document.getElementById("minutes-text");
  const editMinutesBtn = document.getElementById("edit-minutes-btn");

  const checkMinutesText = function () {
    const minutesText = minutesTextDiv.innerText.toLowerCase();
    const budgetAndFundraisingIndex = minutesText.indexOf(
      "next steps and follow-up"
    );

    if (budgetAndFundraisingIndex !== -1) {
      const searchText = "Seek out Casey".toLowerCase();
      const textAfterBudget = minutesText.substring(budgetAndFundraisingIndex);
      console.log(textAfterBudget);
      console.log(searchText);
      console.log(textAfterBudget.includes(searchText));
      console.log("edit clicked!");
      if (
        textAfterBudget.includes(searchText) &&
        textAfterBudget.length <= 200
      ) {
        const questionElement = document.getElementById("question5");
        if (questionElement) {
          questionElement.style.display = "block";
        }
      }
    }
  };

  // Add event listener to the Save button
  editMinutesBtn.addEventListener("click", function () {
    setTimeout(function () {
      checkMinutesText();
    }, 10);
  });
});
