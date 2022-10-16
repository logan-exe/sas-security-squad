import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Chart as ChartJS, registerables } from "chart.js";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
// import Page from "./map.html";

import {
  Chart,
  Pie,
  getElementAtEvent,
  PolarArea,
  Bar,
  Line,
} from "react-chartjs-2";
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

// var htmlDoc = { __html: Page };

export default function Building() {
  const params = useLocation();
  const chartRef = useRef();
  const [loading, setLoading] = useState();

  const navigate = useNavigate();

  const [showSuspicious, setShowSuspicious] = useState(false);
  const [showNormal, setShowNormal] = useState(false);
  const [showAreaChart, setShowAreaChart] = useState(false);

  const [susBuildingStats, SetSusBuildingStats] = useState();
  const [globalSusObj, setGlobalSusObj] = useState();
  const [mostSuspiciousGuys, setMostSuspiciousGuys] = useState([]);
  const [normalList, setNormalLsit] = useState();
  const [suspiciousList, setSuspiciousList] = useState();
  const [currentSus, setCurrentSus] = useState();

  //preloading data
  useEffect(() => {
    const normalHoursStudents = [];
    const outsideHoursStudents = [];

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

    setNormalLsit(normalHoursStudents);
    setSuspiciousList(outsideHoursStudents);
    setLoading(false);
  }, []);

  const onClick = (event) => {
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
      if (sValues[i][0] === susId) {
        setCurrentSus(sValues[i][1]);
        let time = sValues[i][3];
        let enterTime = parseInt(time.split("-")[0]);
        let exitTime = parseInt(time.split("-")[1]);
        timeLineObj[sValues[i][2]] = {};
        timeLineObj[sValues[i][2]]["enterTime"] = enterTime;
        timeLineObj[sValues[i][2]]["exitTime"] = exitTime;

        while (enterTime < exitTime) {
          timeLine[Math.floor(enterTime / 100)] = sValues[i][2];

          enterTime += 100;
        }
      }
    }

    for (let i = 0; i < sValues.length; i++) {
      let time = sValues[i][3];
      let enterTime = parseInt(time.split("-")[0]);
      let exitTime = parseInt(time.split("-")[1]);

      while (enterTime < exitTime) {
        if (timeLine[Math.floor(enterTime / 100)] === sValues[i][2]) {
          susData.push(sValues[i]);
        }
        enterTime += 100;
      }
    }

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

    setGlobalSusObj(timeLineObj);

    setShowAreaChart(true);

    //mapping societies with people he met!

    const studentValues = params.state.studentValues;

    let susSocieties;
    //FETCHING SOCIETIES OF ABDUL MURPHY
    for (let i = 0; i < studentValues.length; i++) {
      if (studentValues[i][0] === susId) {
        susSocieties = studentValues[i][8];
      }
    }

    //checking socities together/

    for (let i = 0; i < filteredSusData.length; i++) {
      let networkId = filteredSusData[i][0];

      let currentSocities = [];

      for (let j = 0; j < studentValues.length; j++) {
        if (studentValues[j][0] === networkId) {
          if (studentValues[j][5] === "English Literature") {
            filteredSusData[i].push(true);
            filteredSusData[i].push(studentValues[j][5]);
          } else {
            filteredSusData[i].push(false);
            filteredSusData[i].push(studentValues[j][5]);
          }
          if (studentValues[i][8] !== "N/A") {
            let arrayString = studentValues[i][8].slice(
              2,
              studentValues[i][8].length - 2
            );

            currentSocities = arrayString.split("', '");
          }
        }
        var count = 0;
        for (let k = 0; k < currentSocities.length; k++) {
          if (
            susSocieties.includes(currentSocities[k]) &&
            currentSocities[k] !== "Brunei Society"
          ) {
            count++;
          }
        }
      }

      filteredSusData[i].push(count);
      filteredSusData[i].push(currentSocities);
    }

    setMostSuspiciousGuys(filteredSusData);
  };
  return (
    <div>
      <div
        style={{
          width: "100vw",
          background: "lightgreen",
          display: "flex",
          justifyContent: "center",
          height: "40px",
          alignItems: "center",
          cursor: "pointer",
        }}
        onClick={() => navigate("/fullAnalysis")}
      >
        View Full Analysis
      </div>
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
                    backgroundColor: ["rgb(255, 99, 132)", "rgb(255, 205, 86)"],
                    hoverOffset: 4,
                  },
                ],
              }}
              options={{
                indexAxis: "y",
                plugins: {
                  title: {
                    display: true,
                    text: "Building Suspect Chart!",
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
            />
          </div>
          {/* show table of suspicious */}
          <center>
            <div style={{ marginTop: "12px" }}>
              Click on the row to know more
            </div>
          </center>
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
          <div
            style={{
              height: "300px",
              overflow: "scroll",
              width: "500px",
              margin: "auto",
              position: "relative",
              marginTop: "20px",
            }}
          >
            <h3
              style={{
                position: "sticky",
                top: 0,
                background: "white",
                display: "flex",
                justifyContent: "center",
              }}
            >
              Less Suspicious
            </h3>
            <table>
              <tr>
                <th>Number</th>
                <th>Name</th>
                <th>Building</th>
                <th>Time</th>
              </tr>
              {normalList?.map((val, key) => {
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
          </div>
          {showAreaChart ? (
            <center style={{ width: "50vw", margin: "auto" }}>
              <h3 style={{ marginTop: "80px" }}>
                Time Spent in Each Building by {currentSus}!
              </h3>
              {currentSus === "Abdul Murphy" ? (
                <>
                  <button
                    style={{
                      background: "yellow",
                      width: "100px",
                      height: "40px",
                      marginBottom: "20px",
                    }}
                    onClick={() => {
                      navigate("/map");
                    }}
                  >
                    View On Map
                  </button>
                </>
              ) : (
                ""
              )}
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
                        "rgba(245, 66, 66,0.5)",
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
          {mostSuspiciousGuys.length > 0 ? (
            <div style={{ height: "100px" }}>
              <center>
                <h3 style={{ marginTop: "100px" }}>
                  Table of Interconnections with {currentSus}!!
                </h3>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "50px",
                  }}
                >
                  <div style={{ display: "flex", marginRight: "40px" }}>
                    <div
                      style={{
                        width: "20px",
                        height: "20px",
                        background: "rgba(66, 245, 84,0.5)",
                        marginRight: "20px",
                      }}
                    ></div>
                    <div>People with less common things</div>
                  </div>
                  <div style={{ display: "flex" }}>
                    <div
                      style={{
                        width: "20px",
                        height: "20px",
                        background: "rgba(245, 66, 66)",
                        marginRight: "20px",
                      }}
                    ></div>
                    <div>People with more common things</div>
                  </div>
                </div>
              </center>
              <Table
                style={{
                  border: "1px solid black",
                  width: "80vw",
                  margin: "auto",
                  maxHeight: "300px",
                  overflowY: "scroll",
                }}
                triped
                bordered
                hover
                size="sm"
              >
                <tr>
                  <th>S.no</th>
                  <th>Number</th>
                  <th>Name</th>
                  <th>Building</th>
                  <th>Time</th>
                  <th> Course Together</th>
                  <th>Course Name</th>
                  <th>Society Together Count</th>
                  <th>Common Socities</th>
                </tr>
                {mostSuspiciousGuys?.map((val, key) => {
                  if (val[6] > 0) {
                    return (
                      <tr key={key} style={{ background: "rgba(245, 66, 66)" }}>
                        <td>{key}</td>
                        <td>{val[0]}</td>
                        <td>{val[1]}</td>
                        <td>{val[2]}</td>
                        <td>{val[3]}</td>
                        <td>{val[4] ? "true" : "false"}</td>
                        <td>{val[5]}</td>
                        <td>{val[6]}</td>
                        <td>{val[7]}</td>
                      </tr>
                    );
                  } else {
                    return (
                      <tr
                        key={key}
                        style={{ background: "rgba(66, 245, 84,0.5)" }}
                      >
                        <td>{key}</td>
                        <td>{val[0]}</td>
                        <td>{val[1]}</td>
                        <td>{val[2]}</td>
                        <td>{val[3]}</td>
                        <td>{val[4] ? "true" : "false"}</td>
                        <td>{val[5]}</td>
                        <td>{val[6]}</td>
                        <td>{val[7]}</td>
                      </tr>
                    );
                  }
                })}
              </Table>
            </div>
          ) : (
            ""
          )}
        </>
      )}
    </div>
  );
}
