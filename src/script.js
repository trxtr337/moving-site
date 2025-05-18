// 📱 Mobile Nav Toggle
function toggleMenu() {
  const menu = document.getElementById("nav-links");
  menu.classList.toggle("show");
}

function closeMenu() {
  const menu = document.getElementById("nav-links");
  menu.classList.remove("show");
}

// 📩 AJAX Form Submission + Secure Telegram Notification
const form = document.querySelector(".quote-form");
const thankYou = document.getElementById("thank-you");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault(); // ⛔️ stop page reload

    const data = new FormData(form);
    const endpoint = "https://formspree.io/f/xnndwabo";

    // Собираем данные
    const name = form.querySelector('input[name="name"]').value;
    const phone = form.querySelector('input[name="phone"]').value;
    const date = form.querySelector('input[name="date"]').value;
    const address = form.querySelector('input[name="address"]').value;
    const message = form.querySelector('textarea[name="message"]').value;

    // 👇 Отправляем в Netlify Function (Telegram)
    fetch("/.netlify/functions/sendToTelegram", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone, date, address, message })
    });

    // 👇 Отправляем на Formspree
    fetch(endpoint, {
      method: "POST",
      body: data,
      headers: {
        Accept: "application/json"
      }
    })
    .then(response => {
      if (response.ok) {
        form.style.display = "none";
        thankYou.style.display = "block";
        thankYou.scrollIntoView({ behavior: "smooth" });
      } else {
        alert("Something went wrong. Please try again later.");
      }
    })
    .catch(() => {
      alert("Error connecting to server. Please try again.");
    });
  });
}
