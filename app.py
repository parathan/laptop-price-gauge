from flask import Flask, render_template, request
from sqlalchemy import func
from models import *
from calculation import *

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
    cpu1name = request.form.get("CPU1")
    cpu2name = request.form.get("CPU2")
    gpu1name = request.form.get("GPU1")
    gpu2name = request.form.get("GPU2")
    ram1 = request.form.get("RAM1")
    ram2 = request.form.get("RAM2")
    hdd1 = request.form.get("HDD1")
    hdd2 = request.form.get("HDD2")
    ssd1 = request.form.get("SSD1")
    ssd2 = reqeust.form.get("SSD2")
    price1 = request.form.get("PRICE1")
    price2 = request.form.get("PRICE2")
    type = request.form.get("type")

    cpu1id=CPUs.query.filter_by(cpu=cpu1name).first()
    cpu1=cpu1id.cpubench
    cpu2id=CPUs.query.filter_by(cpu=cpu2name).first()
    cpu2=cpu2id.cpubench

    gpu1id=GPUs.query.filter_by(gpu=gpu1name).first()
    gpu1=gpu1id.gpubench
    gpu2id=GPUs.query.filter_by(gpu=gpu2name).first()
    gpu2=gpu2id.gpubench

    max_cpubench = CPUs.query(func.max(CPUs.cpubench)).scalar()
    max_gpubench = GPUs.query(func.max(GPUs.gpubench)).scalar()

    compare_result = compare(type, max_cpubench, max_gpubench, cpu1, cpu2, gpu1, gpu2, ram1, ram2, hdd1, hdd2, ssd1, ssd2, price1, price2)

    return render_template("LPG_Home.html", compare_result)

@app.route("/LPG_About")
def lpg_about():
    return render_template("LPG_About.html")

if __name__ == "__main__":
    app.run()
