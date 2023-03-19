import React from "react";
import type { FC } from "react";
import "antd/dist/reset.css";
import "./App.css";
import ScrumBoardDashboard from "./views/ScrumBoardDashboard";
import {Autha} from "./auth";

const App: FC = () => (
  <div className="App">
      <Autha/>
  </div>
);

export default App;
