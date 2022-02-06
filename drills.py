
from cmath import log
from flask import Flask, render_template, jsonify, request, url_for
import json
import logging
import os
import glob

logging.basicConfig(level=logging.DEBUG)
THIS_FOLDER = os.path.dirname(os.path.abspath(__file__))
def load_drills():
    
    with open(os.path.join(THIS_FOLDER, 'static/drills/drills.json')) as json_file:
        drills = json.load(json_file)['drills']
        logging.info("drills read from json")
    return drills

def getpath(drills):
    return [f"{drill['path']}/komplett.png" for drill in drills]

def getname(drills):
    return [drill['name'] for drill in drills]

app = Flask(__name__)



@app.route("/")
def home():
    drills = load_drills()
    return render_template('/alldrills.html', drills=drills)

@app.route("/singledrill/<name>", methods=['GET','POST'])
def singledrill(name):
    selecteddrill = None
    drills = load_drills()
    for drill in drills:
        if drill['name'] == str(name).strip():
            selecteddrill = drill  

    if selecteddrill != None:
        logging.info("selected drill: " + str(selecteddrill))
        folder = os.listdir(os.path.join(THIS_FOLDER, "static/" + selecteddrill['path']))
        images = [selecteddrill['path'] +"/"+ file for file in folder]

        print(images)
        print(selecteddrill['name'])
        return render_template('/singledrill.html', drill=selecteddrill, images=images, drillname=selecteddrill['name'])

    return ("<h1>404 - Drill not found!</h1>")

@app.route('/alldrills')
def alldrills():    
    return jsonify(load_drills())

@app.route('/singledrillJSON/<name>', methods=['GET'])
def singledrillJSON(name):    
    selecteddrill = None
    drills = load_drills()
    for drill in drills:
        if drill['name'] == str(name).strip():
            selecteddrill = drill 

    if selecteddrill != None:
        folder = os.listdir(os.path.join(THIS_FOLDER, "static/" + selecteddrill['path']))
        images = [url_for('static', filename=selecteddrill['path'] +"/"+ file) for file in folder]
        selecteddrill['images'] = images
    return jsonify(selecteddrill)

if __name__ == "__main__":
    app.run(debug=True)