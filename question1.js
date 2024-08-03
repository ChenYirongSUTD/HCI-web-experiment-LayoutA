document.addEventListener("DOMContentLoaded", function () {
  const targetElement = document.getElementById("post-event-evaluation");
  const questionElement = document.getElementById("question1");

  // Observer for post-event-evaluation text content
  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.type === "childList" || mutation.type === "characterData") {
        const textContent = targetElement.textContent.trim().toLowerCase();
        if (textContent === "after action report") {
          questionElement.style.display = "block";
        }
      }
    });
  });

  observer.observe(targetElement, {
    childList: true,
    characterData: true,
    subtree: true,
  });
});
