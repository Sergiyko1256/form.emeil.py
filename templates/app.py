import os
from flask import Flask, render_template, request
import smtplib
from email.message import EmailMessage
from dotenv import load_dotenv

# Завантаження змінних середовища з .env файлу
load_dotenv()

# Створюємо Flask додаток
app = Flask(__name__)

# Головна сторінка, яка відображає HTML
@app.route("/")
def index():
    return render_template("index.html")

# Обробка POST запиту для надсилання email
@app.route("/send_email", methods=["POST"])
def send_email():
    sender_email = os.getenv("EMAIL_USERNAME")  # Витягуємо з .env файл
    sender_password = os.getenv("EMAIL_PASSWORD")  # Витягуємо з .env файл
    smtp_server = os.getenv("SMTP_SERVER")  # Витягуємо з .env файл
    smtp_port = int(os.getenv("SMTP_PORT"))  # Витягуємо з .env файл

    recipient_email = request.form["email"]  # Отримуємо email з форми
    message = request.form["message"]  # Отримуємо повідомлення з форми

    # Формуємо email повідомлення
    email = EmailMessage()
    email["From"] = sender_email
    email["To"] = recipient_email
    email["Subject"] = "Без теми"  # Якщо не вказана тема, ставимо дефолтну
    email.set_content(message)

    try:
        # Підключаємося до SMTP сервера та надсилаємо лист
        with smtplib.SMTP_SSL(smtp_server, smtp_port) as server:
            server.login(sender_email, sender_password)
            server.send_message(email)
        return "Лист надіслано успішно!"  # Повідомлення про успішну відправку
    except Exception as e:
        # У випадку помилки
        return f"Помилка: {str(e)}"  # Виводимо текст помилки

# Запуск додатку
if __name__ == "__main__":
    app.run(host="localhost", port=5000, debug=True)
