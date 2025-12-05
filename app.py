from flask import Flask, request, jsonify, render_template, redirect, url_for
from flask_cors import CORS
import smtplib
import ssl
import json
import requests
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

app = Flask(__name__)
CORS(app)

with open("config.json", "r") as f:
    config = json.load(f)

PROJECT_ID = config["firebase_project_id"]
API_KEY = config["firebase_api_key"]
GMAIL_USER = config["gmail_user"]
GMAIL_APP_PASSWORD = config["gmail_app_password"]

FIRESTORE_URL = f"https://firestore.googleapis.com/v1/projects/{PROJECT_ID}/databases/(default)/documents/portfolio_messages?key={API_KEY}"

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/contact", methods=["POST"])
def contact():
    try:
        name = request.form.get("name")
        email = request.form.get("email")
        message = request.form.get("message")

        firestore_payload = {
            "fields": {
                "name": {"stringValue": name},
                "email": {"stringValue": email},
                "message": {"stringValue": message}
            }
        }

        # FIXED: Proper request with headers + debugging
        response = requests.post(
            FIRESTORE_URL,
            headers={"Content-Type": "application/json"},
            json=firestore_payload
        )

        print("FIRESTORE RESPONSE:", response.status_code, response.text)

        # send email
        subject = f"New Portfolio Contact — {name}"
        body = f"Name: {name}\nEmail: {email}\n\nMessage:\n{message}"

        msg = MIMEMultipart()
        msg["From"] = GMAIL_USER
        msg["To"] = GMAIL_USER
        msg["Subject"] = subject
        msg.attach(MIMEText(body, "plain"))

        context = ssl.create_default_context()
        with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context) as server:
            server.login(GMAIL_USER, GMAIL_APP_PASSWORD)
            server.sendmail(GMAIL_USER, GMAIL_USER, msg.as_string())

        return redirect(url_for("home"))

    except Exception as e:
        print("ERROR:", e)
        return jsonify({"status": "error", "message": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
