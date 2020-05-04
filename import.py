import csv
import os

from flask import Flask, render_template, request
from models import *

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "DATABASE_URL"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db.init_app(app)

def main():
    db.create_all()
    f = open("cpus.csv")
    reader = csv.reader(f)
    for cpu, cpubench in reader:
        cpu_data = CPUs(cpu=cpu, cpubench=cpubench)
        db.session.add(cpu_data)
        print(f"Added {cpu} with benchmark {cpubench}.")
    f = open("gpus.csv")
    reader = csv.reader(f)
    for gpu, gpubench in reader:
        gpu_data = GPUs(gpu=gpu, gpubench=gpubench)
        db.session.add(gpu_data)
        print(f"Added {gpu} with benchmark {gpubench}.")
    db.session.commit()

if __name__ == "__main__":
    with app.app_context():
        main()
