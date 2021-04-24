from flask import Flask, render_template, request, redirect 
import sqlite3
import os
import models
import calculation
from models import *
from calculation import *

app = Flask(__name__)

DATABASE='./CoreComponents.db'
app.debug = True
app.secret_key=os.urandom(12)
app.secret_key='lpg'

#copypasta
def get_db():
    db=getattr(g,'_database',None)
    if db is None:
        db=g._database=sqlite3.connect(DATABASE)
    db.row_factory = make_dicts
    return db

#copypasta
def make_dicts(cursor,row):
    return dict((cursor.description[idx][0], value)
                for idx,value in enumerate(row))

#copypasta
@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

def get_allCpu():
    return query_db('select Model from CPU')

def get_allGpu():
    return query_db('select Model from GPU')

def get_GpuBenchMark():
    return

def get_CpuBenchMark():
    return 


#copypasta
def query_db(query, args=(), one=False):
    cur = get_db().execute(query, args)
    rv = cur.fetchall()
    cur.close()
    return (rv[0] if rv else None) if one else rv

#new function, executes operations that modify the database
def modify_db(query, args=(), one=False):
    db = get_db()
    cur = db.execute(query, args)
    db.commit()
    cur.close()

@app.route("/")
def lpg_home():
    return render_template("LPG_Home.html")

@app.route("/LPG")
def lpg_tool():
    gpus = get_allGpu()
    cpus = get_allCpu()
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

    return render_template("calculation.html", compare_result=compare_result, factor=factorvalue)

@app.route("/LPG_About")
def lpg_about():
    return render_template("LPG_About.html")

if __name__ == "__main__":
    app.run()
