import "./Style.css";
import React, { useState, useRef, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import SpeedSums from "./SpeedSums";
import Home from "./Home";
import TransformationStation from "./TransformationStation";
import PickACard from "./PickACard";

const Main = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/speed-sums" element={<SpeedSums />} />
      <Route path="/pick-a-card" element={<PickACard />} />
      <Route
        path="/transformation-station"
        element={<TransformationStation />}
      />
    </Routes>
  );
};

export default Main;
