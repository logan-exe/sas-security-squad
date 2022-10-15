import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Chart as ChartJS, registerables } from "chart.js";
import { Chart, Pie, getElementAtEvent, PolarArea, Bar } from "react-chartjs-2";
import Papa from "papaparse";
import { useRef } from "react";
import "./App.css";
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

export default function Building() {
  const params = useLocation();
  const chartRef = useRef();
  const [loading, setLoading] = useState();

  const [showSuspicious, setShowSuspicious] = useState(false);
  const [showNormal, setShowNormal] = useState(false);
  const [showAreaChart, setShowAreaChart] = useState(false);

  const [susBuildingStats, SetSusBuildingStats] = useState();
  const [globalSusObj, setGlobalSusObj] = useState();

  useEffect(() => {
    const normalHoursStudents = [];
    const outsideHoursStudents = [];

    // for(let i =0)
    const bValues = params.state.buildingValues;
    const sValues = params.state.scurityValues;

    for (let i = 0; i < params.state.suspiciousStudentList.length; i++) {
      if (
        params.state.suspiciousStudentList[i][2] === params.state.buildingName
      ) {
        outsideHoursStudents.push(params.state.suspiciousStudentList[i]);
      }
    }

    for (let i = 0; i < params.state.normalStudentsList.length; i++) {
      if (params.state.normalStudentsList[i][2] === params.state.buildingName) {
        normalHoursStudents.push(params.state.normalStudentsList[i]);
      }
    }

    for (let i = 0; i < sValues; i++) {}

    console.log(normalHoursStudents);
    console.log(outsideHoursStudents);

    setNormalLsit(normalHoursStudents);
    setSuspiciousList(outsideHoursStudents);
    setLoading(false);
  }, []);
  //   const [buildingValues, setBuildingValues] = useState();
  //   const [securityValues, setSecurityValues] = useState();

  const [normalList, setNormalLsit] = useState();
  const [suspiciousList, setSuspiciousList] = useState();

  console.log(params, "this is params");

  const onClick = (event) => {
    console.log(getElementAtEvent(chartRef.current, event));
    //   setCurrentBuilding(getElementAtEvent(chartRef.current, event)[0].index);

    if (getElementAtEvent(chartRef.current, event)) {
    }
  };

  const ShowUserData = (susId) => {
    const timeLine = [];

    const sValues = params.state.securityValues;
    let susData = [];
    let timeLineObj = {};

    for (let i = 0; i < 24; i++) {
      timeLine.push("");
    }

    for (let i = 0; i < sValues.length; i++) {
      //   console.log(sValues[i][0], "--", susId);
      if (sValues[i][0] === susId) {
        let time = sValues[i][3];
        let enterTime = parseInt(time.split("-")[0]);
        let exitTime = parseInt(time.split("-")[1]);
        timeLineObj[sValues[i][2]] = {};
        timeLineObj[sValues[i][2]]["enterTime"] = enterTime;
        timeLineObj[sValues[i][2]]["exitTime"] = exitTime;
        // Math.floor(enterTime / 100);

        while (enterTime < exitTime) {
          timeLine[Math.floor(enterTime / 100)] = sValues[i][2];

          enterTime += 100;
        }
      }
    }

    for (let i = 0; i < sValues.length; i++) {
      //   console.log(sValues[i][0], "--", susId);

      let time = sValues[i][3];
      let enterTime = parseInt(time.split("-")[0]);
      let exitTime = parseInt(time.split("-")[1]);

      while (enterTime < exitTime) {
        // console.log(
        //   enterTime,
        //   "----",
        //   timeLine[Math.floor(enterTime / 100)],
        //   "----",
        //   sValues[i][2],
        //   "-----",
        //   Math.floor(enterTime / 100),
        //   "---",
        //   timeLine[Math.floor(enterTime / 100)] === sValues[i][2]
        // );
        if (timeLine[Math.floor(enterTime / 100)] === sValues[i][2]) {
          susData.push(sValues[i]);
        }
        enterTime += 100;
      }
    }

    // for(int i )

    SetSusBuildingStats(timeLine);

    //filtersus data

    let filteredSusData = [];

    for (let i = 0; i < susData.length; i++) {
      let present = true;
      for (let j = 0; j < filteredSusData.length; j++) {
        if (susData[i][0] === filteredSusData[j][0]) {
          present = false;
          break;
        }
      }

      if (present && susData[i][0] !== susId) {
        filteredSusData.push(susData[i]);
      }
    }

    console.log(timeLineObj);
    setGlobalSusObj(timeLineObj);
    console.log(Object.values(timeLineObj), "this is global sus values");
    setShowAreaChart(true);

    console.log(filteredSusData, "this is susData");

    //mapping societies with people he met!

    const studentValues = params.state.studentValues;

    console.log(studentValues, "this is student values..");

    let susSocieties;
    //STEP1 - FETCHING SOCIETIES OF ABDUL MURPHY
    for (let i = 0; i < studentValues.length; i++) {
      if (studentValues[i][0] === susId) {
        susSocieties = studentValues[i][8];
      }
    }

    console.log(susSocieties, "this is susSocieties!");

    //checking socities together/

    for (let i = 0; i < filteredSusData; i++) {
      let networkId = filteredSusData[i][0];
      let count = 0;
      let linkSocities = [];
      if (filteredSusData[i][8] !== "N/A") {
        for (let j = 0; j < filteredSusData[i][8]; j++) {}
      }
    }
    console.log(susSocieties, "these are sus socities!");
  };
  return (
    <div>
      {loading ? (
        <center>Loading data... Please wait</center>
      ) : (
        <>
          {" "}
          <div
            style={{
              width: "500px",
              margin: "auto",
            }}
          >
            <Pie
              style={{ height: "500px" }}
              datasetIdKey="id"
              ref={chartRef}
              data={{
                labels: ["Normal", "Suspicious"],
                datasets: [
                  {
                    label: "My First Dataset",
                    data: [normalList?.length, suspiciousList?.length],
                    backgroundColor: [
                      "rgb(255, 99, 132)",
                      //   "rgb(54, 162, 235)",
                      "rgb(255, 205, 86)",
                    ],
                    hoverOffset: 4,
                  },
                ],
              }}
              options={{
                indexAxis: "y",
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
              }}
              // onClick={onClick}
            />
          </div>
          {/* show table of suspicious */}
          <center>
            <h3>Suspicious List!</h3>
            <table>
              <tr>
                <th>Number</th>
                <th>Name</th>
                <th>Building</th>
                <th>Time</th>
              </tr>
              {suspiciousList?.map((val, key) => {
                return (
                  <tr
                    key={key}
                    className="tableRow"
                    onClick={() => ShowUserData(val[0])}
                  >
                    <td>{val[0]}</td>
                    <td>{val[1]}</td>
                    <td>{val[2]}</td>
                    <td>{val[3]}</td>
                  </tr>
                );
              })}
            </table>
          </center>
          {showAreaChart ? (
            <center style={{ width: "50vw", margin: "auto" }}>
              <h3>Suspicious Time Spent inEach Building!</h3>
              <Bar
                data={{
                  labels: Object.keys(globalSusObj),
                  datasets: [
                    {
                      label: "# Time spent in each building",
                      data: Object.values(globalSusObj).map((res) => {
                        return [res.enterTime / 100, res.exitTime / 100];
                      }),
                      backgroundColor: [
                        "rgba(255, 99, 132, 0.5)",
                        "rgba(54, 162, 235, 0.5)",
                        "rgba(255, 206, 86, 0.5)",
                        "rgba(75, 192, 192, 0.5)",
                        "red",
                        // "red",
                      ],
                      borderWidth: 1,
                    },
                  ],
                  options: {
                    responsive: true,
                    plugins: {
                      legend: {
                        position: "top",
                      },
                      title: {
                        display: true,
                        text: "Chart.js Floating Bar Chart",
                      },
                    },
                  },
                }}
              />
            </center>
          ) : (
            ""
          )}
          {/* <table style={{ border: "1px solid black" }}>
            <tr>
              <th>Number</th>
              <th>Name</th>
              <th>Building</th>
              <th>Time</th>
            </tr>
            {normalList?.map((val, key) => {
              return (
                <tr key={key}>
                  <td>{val[0]}</td>
                  <td>{val[1]}</td>
                  <td>{val[2]}</td>
                  <td>{val[3]}</td>
                </tr>
              );
            })}
          </table> */}
        </>
      )}
    </div>
  );
}
