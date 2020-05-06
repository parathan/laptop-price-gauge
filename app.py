from flask import Flask, render_template, request
from models import *

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "postgres://gzfnsdetfsuvth:13c378d6706b5f1ddb71976728e7ff788ed335f2859e883ae65281eb0ec923af@ec2-52-71-231-180.compute-1.amazonaws.com:5432/d4ao2h63kam1sh"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)

@app.route("/")
def lpg_home():
    return render_template("LPG_Home.html")

@app.route("/LPG")
def lpg_tool():
    gpus = GPUs.query.all()
    cpus = CPUs.query.all()
    return render_template("LPG.html", gpus=gpus, cpus=cpus)

@app.route("/Calculation", methods=["POST"])
def calculation():
    cpu1 = request.form.get("CPU1")
    cpu2 = request.form.get("CPU2")
    gpu1 = request.form.get("GPU1")
    gpu2 = request.form.get("GPU2")
    ram1 = request.form.get("RAM1")
    ram2 = request.form.get("RAM2")
    hdd1 = request.form.get("HDD1")
    hdd2 = request.form.get("HDD2")
    ssd1 = request.form.get("SSD1")
    ssd2 = reqeust.form.get("SSD2")
    return render_template("LPG_Home.html")

@app.route("/LPG_About")
def lpg_about():
    return render_template("LPG_About.html")

if __name__ == "__main__":
    app.run()
