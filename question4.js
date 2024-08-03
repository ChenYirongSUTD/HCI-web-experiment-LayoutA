document.addEventListener("DOMContentLoaded", function () {
  const downloadButton = document.querySelector(".btn.download-button");
  // Add event listener to the Download button
  downloadButton.addEventListener("click", function () {
    console.log("download clicked!");
    const questionElement = document.getElementById("question4");
    questionElement.style.display = "block";
  });
});
