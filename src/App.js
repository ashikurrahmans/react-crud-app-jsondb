import { React } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Component/Home";
import View from "./Component/View";
import Edit from "./Component/Edit";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/student/:id" element={<View />} />
        <Route path="/student/profile/:id" element={<Edit />} />
      </Routes>
    </>
  );
}

export default App;
