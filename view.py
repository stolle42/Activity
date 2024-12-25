from flask import Flask, render_template

app=Flask(__name__)

@app.route("/stats/<name>")
def statistics_of(name):
    return "Statistics of "+name

@app.route("/stats")
def statistics_general():
    return "statistic page"

@app.route("/")
def mainapp():
    return render_template("index.html")


if __name__=='__main__':
    app.run(debug=True)