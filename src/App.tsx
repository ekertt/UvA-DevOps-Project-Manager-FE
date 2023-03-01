import React from "react";
import type { FC } from "react";
import "antd/dist/reset.css";
import "./App.css";
import ScrumBoardDashboard from "./views/ScrumBoardDashboard";

const App: FC = () => (
  <div className="App">
    <ScrumBoardDashboard />
  </div>
);

export default App;
