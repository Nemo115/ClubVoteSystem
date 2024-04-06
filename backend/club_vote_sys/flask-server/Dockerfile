FROM python:latest
WORKDIR /app

COPY . .
RUN pip install -r requirements.txt
ENV FLASK_ENV production

EXPOSE 5000
CMD ["python", "main.py"]