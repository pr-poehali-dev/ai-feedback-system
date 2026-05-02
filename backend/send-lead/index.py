"""
Отправка заявки с сайта на email v.kolchanov@granat.land
"""
import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": headers, "body": ""}

    body = json.loads(event.get("body") or "{}")
    name = body.get("name", "").strip()
    phone = body.get("phone", "").strip()

    if not name or not phone:
        return {
            "statusCode": 400,
            "headers": headers,
            "body": json.dumps({"error": "Укажите имя и телефон"}, ensure_ascii=False),
        }

    smtp_user = os.environ["SMTP_USER"]
    smtp_password = os.environ["SMTP_PASSWORD"]
    to_email = "v.kolchanov@granat.land"

    msg = MIMEMultipart("alternative")
    msg["Subject"] = f"Новая заявка с сайта — {name}"
    msg["From"] = smtp_user
    msg["To"] = to_email

    html = f"""
    <div style="font-family: Arial, sans-serif; max-width: 500px; padding: 24px; border: 1px solid #eee; border-radius: 8px;">
        <h2 style="color: #c0392b; margin-top: 0;">Новая заявка на показ</h2>
        <p style="margin: 8px 0;"><strong>Имя:</strong> {name}</p>
        <p style="margin: 8px 0;"><strong>Телефон:</strong> <a href="tel:{phone}">{phone}</a></p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 16px 0;">
        <p style="color: #888; font-size: 13px;">Заявка получена с сайта «Дворцовые предместья» — Гранат Лэнд</p>
    </div>
    """

    msg.attach(MIMEText(html, "html"))

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        server.login(smtp_user, smtp_password)
        server.sendmail(smtp_user, to_email, msg.as_string())

    return {
        "statusCode": 200,
        "headers": headers,
        "body": json.dumps({"ok": True}),
    }