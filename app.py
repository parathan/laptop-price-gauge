from flask import Flask, render_template, request

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "postgres://gzfnsdetfsuvth:13c378d6706b5f1ddb71976728e7ff788ed335f2859e883ae65281eb0ec923af@ec2-52-71-231-180.compute-1.amazonaws.com:5432/d4ao2h63kam1sh"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

@app.route("/")
def lpg_home():
    return render_template("LPG_Home.html")

@app.route("/LPG")
def lpg_tool():
    return render_template("LPG.html")

@app.route("/LPG_About")
def lpg_about():
    return render_template("LPG_About.html")

if __name__ == "__main__":
    app.run()
