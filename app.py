import os
import smtplib
from flask import Flask, render_template, request, jsonify
from dotenv import load_dotenv

# Завантажуємо змінні середовища
load_dotenv()

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/send_email", methods=["POST"])
def send_email():
    sender_email = os.getenv("EMAIL_USERNAME")
    sender_password = os.getenv("EMAIL_PASSWORD")
    smtp_server = os.getenv("SMTP_SERVER")
    smtp_port = int(os.getenv("SMTP_PORT", 587))  # Значення за замовчуванням

    recipient_email = request.form["email"].strip()
    subject = "Повідомлення з форми"  # Тема фіксована
    message = request.form["message"].strip()

    # Формуємо текст листа у форматі UTF-8
    email_text = f"Subject: {subject}\nMIME-Version: 1.0\nContent-Type: text/plain; charset=utf-8\n\n{message}"

    try:
        with smtplib.SMTP(smtp_server, smtp_port) as server:
            server.starttls()
            server.login(sender_email, sender_password)
            server.sendmail(sender_email, recipient_email, email_text.encode("utf-8"))
        
        return jsonify({"status": "success", "message": "Лист надіслано успішно!"})
    
    except smtplib.SMTPException as e:
        return jsonify({"status": "error", "message": f"Помилка SMTP: {str(e)}"})
    
    except Exception as e:
        return jsonify({"status": "error", "message": f"Помилка: {str(e)}"})

if __name__ == "__main__":
    app.run(host="localhost", port=5000, debug=True)