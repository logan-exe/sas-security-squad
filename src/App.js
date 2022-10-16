import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Map from "./Map";
import { useRef } from "react";
import { Bar, Line, getDatasetAtEvent } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import { Chart } from "react-chartjs-2";
import { useState } from "react";
import Papa from "papaparse";
import {
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";
import About from "./About";
import Building from "./Building";
import Home from "./Home";
import FullAnalysis from "./FullAnalysis";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  plugins: {
    title: {
      display: true,
      text: "Chart.js Bar Chart - Stacked",
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: [100, 200, 300, 400],
      backgroundColor: "rgb(255, 99, 132)",
    },
    {
      label: "Dataset 2",
      data: [100, 200, 300, 400],
      backgroundColor: "rgb(75, 192, 192)",
    },
    {
      label: "Dataset 3",
      data: [100, 200, 300, 400],
      backgroundColor: "rgb(53, 162, 235)",
    },
  ],
};

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="building" element={<Building />} />
          <Route path="Map" element={<Map />} />
          <Route path="fullAnalysis" element={<FullAnalysis />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
