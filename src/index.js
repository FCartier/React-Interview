import React from "react";
import ReactDOM from "react-dom";
import App from "./solution/App";
import { createStore } from 'redux';
import configureStore from './solution/store/configureStore';
import "./index.css";
import rootReducer from './solution/reducers/rootReducer';
import {Provider} from 'react-redux';

class ErrorBoundary extends React.Component {
  constructor() {
    super();
    this.state = {
      hasError: false
    };
  }

  componentDidCatch(error, info) {
    this.setState({
      hasError: true
    });

    console.error(error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h1>An error has occured. Please check the console.</h1>
        </div>
      );
    }

    return this.props.children;
  }
}

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </Provider>,
  document.getElementById("root")
);
