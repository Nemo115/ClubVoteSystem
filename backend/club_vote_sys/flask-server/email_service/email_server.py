from email.message import EmailMessage
import ssl
import smtplib

def send_email(email_receiver, link):
    bot1 = "smurf31233@gmail.com"
    pw = 'geip ckac gilw lnsk'
    subject = 'Vote Verification'
    body = f"""
    Please verify your email with the following link: {link}
    """

    em = EmailMessage()
    em['From'] = bot1
    em['To'] = email_receiver
    em['Subject']=subject
    em.set_content(body)

    context = ssl.create_default_context()

    with smtplib.SMTP_SSL('smtp.gmail.com', 465, context = context) as smtp:
        smtp.login(bot1, pw)
        smtp.sendmail(bot1, email_receiver, em.as_string())
