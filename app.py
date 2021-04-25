from flask import Flask, render_template, request, redirect, g , url_for, session
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

def get_GpuBenchMark(gpu: str):
    return query_db('select Benchmark from GPU where Model=?', (gpu,))

def get_CpuBenchMark(cpu: str):
    return query_db('select Benchmark from CPU where Model=?', (cpu,))

def fieldChecker(comp: dict):
    missing=""
    if 'GPU1' not in comp:
        missing=missing + "GPU from first computer, "
    if 'GPU2' not in comp:
        missing=missing + "GPU from second computer, "
    if 'CPU1' not in comp:
        missing=missing + "CPU from first computer, "
    if 'CPU2' not in comp:
        missing=missing + "CPU from second computer, "
    if 'RAM1' not in comp:
        missing=missing + "RAM from first computer, "
    if 'RAM2' not in comp:
        missing=missing + "RAM from second computer, "
    if 'HDD1' not in comp:
        missing=missing + "HDD from first computer, "
    if 'HDD2' not in comp:
        missing=missing + "HDD from second computer, "
    if 'SSD1' not in comp:
        missing=missing + "SSD from first computer, "
    if 'SSD2' not in comp:
        missing=missing + "SSD from second computer, "
    return missing
    
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

@app.route("/LPG", methods=["GET", "POST"])
def lpg_tool():
    msg = ""
    gpus = get_allGpu()
    cpus = get_allCpu()
    if request.method == "POST":
        session['comp'] = request.form
        msg = fieldChecker(session['comp'])
        if(len(msg)==0):
            return redirect(url_for("calculate"))
        else:
            msg = "You were missing " + msg[:-2] + ". Please try again and enter all the fields!"
            return render_template("LPG.html", msg=msg, gpus=gpus, cpus=cpus)
    return render_template("LPG.html", msg=msg, gpus=gpus, cpus=cpus)

@app.route("/calculation")
def calculate():
    comp = session['comp']
    print(comp)
    gpu1=get_GpuBenchMark(comp['GPU1'])[0]['Benchmark']
    gpu2=get_GpuBenchMark(comp['GPU2'])[0]['Benchmark']
    cpu1=get_CpuBenchMark(comp['CPU1'])[0]['Benchmark']
    cpu2=get_CpuBenchMark(comp['CPU2'])[0]['Benchmark']
    max_cpubench = 200
    max_gpubench = 1000

    compare_result = compare(max_cpubench, max_gpubench, cpu1, cpu2, gpu1, gpu2, int(comp['RAM1']), int(comp['RAM2']), int(comp['HDD1']), int(comp['HDD2']), int(comp['SSD1']), int(comp['SSD2']))
    print(compare_result)

    return render_template("calculation.html", compare_result=compare_result, factor=10)

@app.route("/LPG_About")
def lpg_about():
    return render_template("LPG_About.html")

if __name__ == "__main__":
    app.run()
