from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class GPUs(db.Model):
    __tablename__ = "gpus"
    id = db.Column(db.Integer, primary_key=True)
    gpu = db.Column(db.String, nullable=False)
    gpubench = db.Column(db.Float, nullable=False)

class CPUs(db.Model):
    __tablename__ = "cpus"
    id = db.Column(db.Integer, primary_key=True)
    cpu = db.Column(db.String, nullable=False)
    cpubench = db.Column(db.Integer, nullable=False)
