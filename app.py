from flask import Flask, render_template, request

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db.init_app(app)

@app.route("/")
def main():
    gpus = Gpus.query.all()
    cpus = Cpus.query.all()
    return render_template("LPG.html", gpus=gpus, cpus=cpus)

if __name__ == "__main__":
    app.run()
