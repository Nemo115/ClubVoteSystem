from flask import Flask, render_template, request, redirect, flash, url_for

app = Flask(__name__)

@app.route('/')
def home():
    return {"Foo": ["Foo1", "Foo2", "Foo3"]}


if __name__ == "__main__":
    app.run(debug = True)