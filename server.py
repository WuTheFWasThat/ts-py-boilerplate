import os
import threading
import time
import random

from collections import defaultdict
import fire
from flask import Flask, jsonify, request

def main(
        logs=None,
        port=6006,
        flask_debug=True,
        static_dir=None,
):

    if static_dir is None:
        static_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), "build")
    print("static dir", static_dir)
    app = Flask(__name__, static_url_path="/", static_folder=static_dir)

    questions = {
        123: dict(
            qid=123,
            chunks=["foo " * 100, "bar " * 250, "baz " * 200]
        ),
        456: dict(
            qid=456,
            chunks=["cookie " * 128, "carrot " * 150, "more cookies " * 100]
        ),
    }

    answers = {
        qid: [] for qid in questions
    }
    @app.route("/")
    def root():
        return app.send_static_file("index.html")

    @app.route("/get_question", methods=["GET", "POST"])
    def get_question():
        qid = random.choice(questions.keys())
        question = questions[qid]
        return jsonify(error=None, result=dict(question=question))

    @app.route("/submit_answer", methods=["POST"])
    def submit_answer():
        qid = request.get_json().get(
            'qid'
        )
        if qid not in questions:
            return jsonify(error="No such qid found", result=None)
        answer = request.get_json().get(
            'answer'
        )
        answers[qid].append(answer)
        return jsonify(error=None)

    app.run(host="0.0.0.0", port=port, debug=flask_debug)


if __name__ == "__main__":
    fire.Fire(main)
