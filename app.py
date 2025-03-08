import os
from flask import Flask, render_template, request
import smtplib
from email.message import EmailMessage
from dotenv import load_dotenv

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
    smtp_port = int(os.getenv("SMTP_PORT"))

    recipient_email = request.form["email"]
    subject = request.form["subject"]
    message = request.form["message"]

    # Формуємо email правильно
    email = EmailMessage()
    email["From"] = sender_email
    email["To"] = recipient_email
    email["Subject"] = subject
    email.set_content(message)

    try:
        with smtplib.SMTP_SSL(smtp_server, smtp_port) as server:
            server.login(sender_email, sender_password)
            server.send_message(email)
        return "Лист надіслано успішно!"
    except Exception as e:
        return f"Помилка: {str(e)}"

if __name__ == "__main__":
    app.run(host="localhost", port=5000, debug=True)