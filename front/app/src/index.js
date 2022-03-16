import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import * as serviceWorker from "./serviceWorker";
import Wrapper from "./components/Wrapper/Wrapper";

ReactDOM.render(
  <Wrapper>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Wrapper>,

  document.getElementById("root")
);

serviceWorker.unregister();
