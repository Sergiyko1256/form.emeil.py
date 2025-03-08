// Отримуємо елементи
const modal = document.getElementById("modal");
const openModalBtn = document.getElementById("openModalBtn");
const closeBtn = document.getElementById("closeBtn");

// Відкриття модального вікна при натисканні на картинку
openModalBtn.addEventListener("click", function () {
    modal.classList.remove("hidden");  // Показуємо модальне вікно
});

// Закриття модального вікна при натисканні на кнопку "×"
closeBtn.addEventListener("click", function () {
    modal.classList.add("hidden");  // Приховуємо модальне вікно
});

// Закриття модального вікна при натисканні за його межами
window.addEventListener("click", function (event) {
    if (event.target === modal) {
        modal.classList.add("hidden");  // Приховуємо модальне вікно
    }
});

// Валідація форми перед відправкою
document.getElementById("emailForm").addEventListener("submit", function (event) {
    event.preventDefault();
    let isValid = true;

    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const emailError = document.getElementById("emailError");
    const messageError = document.getElementById("messageError");

    emailError.textContent = "";
    messageError.textContent = "";

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
        emailError.textContent = "Поле email не може бути порожнім.";
        isValid = false;
    } else if (!emailPattern.test(email)) {
        emailError.textContent = "Введіть коректний email.";
        isValid = false;
    }

    if (!message) {
        messageError.textContent = "Поле повідомлення не може бути порожнім.";
        isValid = false;
    }

    if (isValid) {
        alert("Форма успішно відправлена!");
        document.getElementById("emailForm").submit();
    }
});
