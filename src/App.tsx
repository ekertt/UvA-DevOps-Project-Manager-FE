import React from "react";
import type { FC } from "react";
import { Button } from "antd";
import "antd/dist/reset.css";
import "./App.css";

const App: FC = () => (
  <div className="App">
    <header className="App-header">
      <Button type="primary">Ant Design button</Button>
    </header>
  </div>
);

export default App;
