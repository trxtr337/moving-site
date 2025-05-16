document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".quote-form");
  const thankYou = document.getElementById("thank-you");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
    }).then(response => {
      if (response.ok) {
        form.reset();
        thankYou.style.display = "block";
        thankYou.scrollIntoView({ behavior: "smooth" });
      } else {
        alert("Something went wrong. Please try again.");
      }
    });
  });
});
