import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import 'semantic-ui-css/semantic.min.css'

// Redux
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./redux/rootReducer";
const store = createStore(rootReducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

