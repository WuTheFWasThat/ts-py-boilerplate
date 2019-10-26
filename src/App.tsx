import React from 'react';
import './App.css';
import Component from './Component';
// import { debounce } from 'lodash';
import {
  encode_query_params, parse_query_string, Question, Answer
} from './Utils';


type AppProps = {
  submit_answer: (answer: Answer) => void
  question: Question,
};
type AppState = {
};


type EditorProps = {
  text: string, buttonText: string, onSubmit: (text: string) => void
};
type EditorState = {text: string};
class Editor extends React.Component<EditorProps, EditorState> {
  constructor(props: EditorProps) {
    super(props);
    this.state = {
      text: this.props.text
    };
  }

  handleStateChange(event: any) { // KeyboardEvent
    this.setState({ text: event.target.value });
  }

  componentDidUpdate(oldProps: EditorProps) {
    if (oldProps.text !== this.props.text) {
      this.setState({
        text: this.props.text
      });
    }
  }

  render() {
    return (
      <div>
        <textarea value={this.state.text} onChange={this.handleStateChange.bind(this)}
          style={{width: '100%', minHeight: '200px'}}
        />
        <button onClick={this.props.onSubmit.bind(this, this.state.text)}>{this.props.buttonText || 'Submit'}</button>
      </div>
    );
  }
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    // const query_dict = parse_query_string();

    this.state = {
    };
    // this.updateQueryParams();
  }

  componentDidUpdate(prevProps: AppProps) {
    // this.updateQueryParams();
    // if (this.props.all_data.id !== prevProps.all_data.id) {
    //   this.setState(newState as any)
    // }
  }

  updateQueryParams() {
    // const d: any = {
    // }
    // const newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + encode_query_params(d);
    // window.history.pushState({ path: newurl }, '', newurl);
  }

  updateState(update: any) {
    this.setState(update);
    console.log('update', update);

    setImmediate(() => {
      this.updateQueryParams();
    });
  }

  handleStateChange(key: string, event: any) { // KeyboardEvent
    const update: any = {};
    update[key] = event.target.value;
    this.updateState(update);
  }

  showError(err: any) {
    // TODO: better
    console.error(err);
    alert(err);
  }

  render() {
    console.log('rerender');

    return (
      <div>
        <Component
            message='test'
        />
        <Editor text="placeholder" buttonText="submit" onSubmit={
          (text) => this.props.submit_answer({answer: text})
        }/>
      </div>
    );
  }
}

export default App;
