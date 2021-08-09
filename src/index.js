import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from "history";
import { Provider } from "react-redux"
import { store } from "./state/store"

const history = createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store} >
      <Router history={history} >
          <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
