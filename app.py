from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def LPG():
    return render_template("LPG.html")
