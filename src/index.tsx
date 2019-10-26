import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Question, Answer, parse_query_string } from './Utils';

async function render() {
  // const query_dict = parse_query_string();

  async function fetch_data() {
    let result: any;
    if (process.env.NODE_ENV === 'development') {
      const questions = [
        {
          qid: 123,
          chunks: ["foo ".repeat(100), "bar ".repeat(250), "baz ".repeat(200)],
        },
        {
          qid: 456,
          chunks: ["cookie ".repeat(128), "carrot ".repeat(150), "more cookies ".repeat(100)],
        },
      ];
      result = questions[Math.floor(Math.random() * questions.length)];
      console.log(Math.floor(Math.random() * questions.length))
      console.log(result)
    } else {
      try {
        const response = await fetch('/get_question', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify({
          }),
        });
        result = (await response.json()).result;
      } catch (e) {
        alert(e);
        throw e
      }
    }
    return {
      id: Math.random(),
      question: result as Question,
    };
  }

  async function submit_answer(qid: number, answer: Answer) {
    let result: any;
    if (process.env.NODE_ENV === 'development') {
      console.log('submitted');
    } else {
      try {
        const response = await fetch('/submit_answer', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify({
            qid: qid,
            answer: answer,
          }),
        });
        result = (await response.json()).result;
      } catch (e) {
        alert(e);
        throw e
      }
    }
    // get a new question
    await fetch_and_rerender();
  }


  async function fetch_and_rerender() {
    const data = await fetch_data();
    console.log('data', data)
    ReactDOM.render(
      React.createElement(App, {
        question: data.question,
        submit_answer: (answer) => submit_answer(data.question.qid, answer),
        // request_new_question: fetch_and_rerender,
      }),
      document.getElementById('main')
    );
  }

  await fetch_and_rerender();
}

render();
