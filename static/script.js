// Отримуємо елементи
const modal = document.getElementById("modal");
const openModalBtn = document.getElementById("openModalBtn");
const closeBtn = document.getElementById("closeBtn");
const emailForm = document.getElementById("emailForm");
const emailError = document.getElementById("emailError");
const messageError = document.getElementById("messageError");
const statusMessage = document.getElementById("statusMessage");

// Відкриття модального вікна при натисканні на картинку
openModalBtn.addEventListener("click", function () {
    modal.style.display = "flex";  // Показуємо модальне вікно
});

// Закриття модального вікна при натисканні на кнопку "×"
closeBtn.addEventListener("click", function () {
    modal.style.display = "none";  // Приховуємо модальне вікно
});

// Закриття модального вікна при натисканні за його межами
window.addEventListener("click", function (event) {
    if (event.target === modal) {
        modal.style.display = "none";  // Приховуємо модальне вікно
    }
});

// Валідація форми перед відправкою
emailForm.addEventListener("submit", function (event) {
    event.preventDefault();  // Запобігаємо стандартній поведінці форми
    let isValid = true;

    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    // Очистка старих помилок
    emailError.textContent = "";
    messageError.textContent = "";
    statusMessage.textContent = "";  // Очищаємо повідомлення про статус

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
        // Виконуємо асинхронний запит
        const formData = new FormData(emailForm);

        fetch('/send_email', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())  // Очікуємо JSON
        .then(data => {
            if (data.status === "success") {
                statusMessage.style.color = "green";
                statusMessage.textContent = data.message;
            } else {
                statusMessage.style.color = "red";
                statusMessage.textContent = data.message;
            }
        })
        .catch(error => {
            statusMessage.style.color = "red";
            statusMessage.textContent = "Сталася помилка при відправці.";
        });
    }
});

// Акордеон
const accordionItems = document.querySelectorAll(".accordion-item");

// Додаємо обробник подій для кожного питання в акордеоні
accordionItems.forEach(item => {
    item.addEventListener("click", function () {
        const content = item.nextElementSibling;

        // Перемикаємо видимість контенту
        if (content.style.display === "block") {
            content.style.display = "none";  // Закриваємо
        } else {
            content.style.display = "block";  // Відкриваємо
            item.classList.add('open'); // Додаємо клас відкритого акордеону
        }
    });
});
