from flask import Flask, render_template, jsonify
import os
import json
import glob
import logging

logging.basicConfig(level=logging.INFO)

def load_drills():
    with open('./static/drills/drills.json') as json_file:
        drills = json.load(json_file)['drills']
        logging.info(drills)
    return drills

def getpath(drills):
    return [f"{drill['path']}/komplett.png" for drill in drills]

app = Flask(__name__)



@app.route("/")
def home():
    drills = load_drills()
    return render_template('/alldrills.html', paths=getpath(drills))

if __name__ == "__main__":
    app.run()