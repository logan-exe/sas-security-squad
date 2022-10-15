import React, { Suspense } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import { useRef } from "react";
import {
  Bar,
  Line,
  getDatasetAtEvent,
  getElementAtEvent,
  PolarArea,
} from "react-chartjs-2";
import { ArcElement, Chart as ChartJS, registerables } from "chart.js";
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
  RadialLinearScale,
} from "chart.js";
import About from "./About";
import Building from "./Building";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale
);

export default function Home() {
  const chartRef = useRef();
  const [isFunnyChart, setFunnyChart] = useState(true);
  const [parsedData, setParsedData] = useState([]);
  const [tableRows, setTableRows] = useState([]);
  const [securityParsedData, setSecurityParsedData] = useState([]);
  const [buildingParsedData, setBuildingPasrsedData] = useState([]);
  const [buildingValues, setBuildingValues] = useState([]);
  const [buildingRows, setBuildingRows] = useState([]);
  const [securityRows, setSecurityRows] = useState([]);
  const [securityValues, setSecurityValues] = useState([]);
  const [buildingNames, setBuildingNames] = useState([]);
  const [buildingVisitedCount, setBuildingVisitedCount] = useState([]);
  const [outsideHoursCount, setOutsideHoursCount] = useState([]);
  const [dataUploaded, setDataUploaded] = useState(false);
  const [currentBuilding, setCurrentBuilding] = useState();
  const [normalStudentsList, setNormalStudentsList] = useState();
  const [suspiciousStudentList, setSuspiciousStudentList] = useState();
  const [studentValues, setStudentValues] = useState();

  // const []

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  //State to store the values
  const [values, setValues] = useState([]);
  const onClick = (event) => {
    console.log(getElementAtEvent(chartRef.current, event));
    setCurrentBuilding(getElementAtEvent(chartRef.current, event)[0].index);

    // alert(getElementAtEvent(chartRef.current, event)[0].index);
    navigate("/building", {
      state: {
        buildingName:
          buildingNames[getElementAtEvent(chartRef.current, event)[0].index],
        buildingValues: buildingValues,
        securityValues: securityValues,
        normalStudentsList: normalStudentsList,
        suspiciousStudentList: suspiciousStudentList,
        studentValues: studentValues,
      },
    });
  };

  //building-info
  const buildingInfoHandler = (event) => {
    console.log(event.target.files[0]);
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const rowsArray = [];
        const valuesArray = [];
        const buildingNamesArray = [];

        // Iterating data to get column name and their values
        results.data.map((d) => {
          rowsArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
        });
        for (let i = 0; i < valuesArray.length; i++) {
          buildingNamesArray.push(valuesArray[i][0]);
        }

        setBuildingNames(buildingNamesArray);

        console.log(buildingNamesArray, "this is building names array");
        // Parsed Data Response in array format

        console.log(valuesArray);
        setBuildingPasrsedData(results.data);

        // Filtered Column Names
        setBuildingRows(rowsArray[0]);

        // Filtered Values
        setBuildingValues(valuesArray);
      },
    });
  };

  //security-logs.

  const securityInfoHandler = (event) => {
    console.log(event.target.files[0]);
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const rowsArray = [];
        const valuesArray = [];

        // Iterating data to get column name and their values
        results.data.map((d) => {
          rowsArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
        });

        // Parsed Data Response in array format

        console.log(valuesArray);
        setSecurityParsedData(results.data);

        // Filtered Column Names
        setSecurityRows(rowsArray[0]);

        // Filtered Values
        setSecurityValues(valuesArray);
      },
    });
  };

  //find suspcious

  //compare

  const peopleDataHandler = (event) => {
    console.log(event.target.files[0]);
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const rowsArray = [];
        const valuesArray = [];
        const buildingNamesArray = [];

        // Iterating data to get column name and their values
        results.data.map((d) => {
          rowsArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
        });

        // Parsed Data Response in array format

        console.log("lol", valuesArray);
        // setParsedData(results.data);
        // for (let i = 0; i < valuesArray.length; i++) {
        //   studentValues.push(valuesArray[i][0]);
        // }
        setStudentValues(valuesArray);

        // setBuildingNames(buildingNamesArray);

        // console.log(buildingNamesArray, "this is building names array");

        // Filtered Column Names
        // setTableRows(rowsArray[0]);

        // Filtered Values
        // setValues(valuesArray);
      },
    });
  };
  // Chart.register(CategoryScale);

  const findThief = () => {
    setLoading(true);
    let susArrayEnterTime = [];
    let susArrayClosingTime = [];
    var outOfHours = {};
    var totalHours = {};

    var normalStudents = [];
    var suspiciousStudents = [];
    var totalHoursArray = [];
    var outofHoursArray = [];

    // console.log("Building values------", buildingValues);
    // console.log("Security Values----", securityValues);

    for (let i = 0; i < securityValues.length; i++) {
      let building = securityValues[i][2];
      let time = securityValues[i][3];
      let enterTime = parseInt(time.split("-")[0]);
      let exitTime = parseInt(time.split("-")[1]);
      let openingTime;
      let closingTime;

      console.log(securityValues[i][2]);

      for (let j = 0; j < buildingValues.length; j++) {
        if (building === buildingValues[j][0]) {
          openingTime = parseInt(buildingValues[j][2].split("-")[0]);
          closingTime = parseInt(buildingValues[j][2].split("-")[1]);
        }
      }

      if (enterTime < openingTime) {
        susArrayEnterTime.push(securityValues[i][0]);
      }

      if (
        exitTime > closingTime &&
        building !== "Kelvingrove Park" &&
        building !== "Library"
      ) {
        // console.log(securityValues[i]);
        susArrayClosingTime.push(securityValues[i][0]);
        if (!outOfHours[securityValues[i][2]]) {
          outOfHours[securityValues[i][2]] = 1;
          suspiciousStudents.push(securityValues[i]);
          console.log(outOfHours, "this is dict1", securityValues[i]);
        } else {
          outOfHours[securityValues[i][2]] =
            outOfHours[securityValues[i][2]] + 1;
          suspiciousStudents.push(securityValues[i]);
          console.log(outOfHours, "this is dict1", securityValues[i]);
        }
      } else if (building === "Library") {
        if (exitTime > closingTime && exitTime < openingTime) {
          susArrayClosingTime.push(securityValues[i][0]);
          if (!outOfHours[securityValues[i][2]]) {
            outOfHours[securityValues[i][2]] = 1;
            suspiciousStudents.push(securityValues[i]);
            console.log(outOfHours, "this is dict3", securityValues[i]);
          } else {
            outOfHours[securityValues[i][2]] =
              outOfHours[securityValues[i][2]] + 1;
            suspiciousStudents.push(securityValues[i]);
            console.log(outOfHours, "this is dict4", securityValues[i]);
          }
        }

        // if (enterTime > 1800 && enterTime < 2000) {
        //   if (exitTime > 1800 && exitTime < 2000)
        //     console.log(
        //       securityValues[i],
        //       "other suspicious",
        //       enterTime,
        //       exitTime
        //     );
        // }
      } else {
        if (!totalHours[securityValues[i][2]]) {
          totalHours[securityValues[i][2]] = 1;
          normalStudents.push(securityValues[i]);
          if (!outOfHours[securityValues[i][2]]) {
            outOfHours[securityValues[i][2]] = 0;
          }
        } else {
          totalHours[securityValues[i][2]] =
            totalHours[securityValues[i][2]] + 1;
          normalStudents.push(securityValues[i]);
          if (!outOfHours[securityValues[i][2]]) {
            outOfHours[securityValues[i][2]] = 0;
          }
        }
      }

      //splitting based on building.
    }
    // console.log(susArrayClosingTime);
    // console.log(susArrayEnterTime);

    // for (let i = 0; i < susArrayClosingTime.length; i++) {
    //   if (!dict[susArrayClosingTime[i]]) {
    //     dict[susArrayClosingTime[i]] = 1;
    //   } else {
    //     dict[susArrayClosingTime[i]] = dict[susArrayClosingTime[i]] + 1;
    //   }
    // }
    console.log(totalHours, "this is dict");
    console.log(outOfHours, "this is dict2");

    // console.log(outOfHours, "this is dict");
    //  var keys = Object.keys();
    var bNames = Object.keys(totalHours);

    setBuildingNames(bNames);
    var bVisitedCount = Object.values(totalHours);

    setBuildingVisitedCount(bVisitedCount);

    var oof = Object.values(outOfHours);

    setOutsideHoursCount(oof);

    setNormalStudentsList(normalStudents);
    setSuspiciousStudentList(suspiciousStudents);
    setDataUploaded(true);
    setLoading(false);

    // var oof = Object.values
  };
  return (
    <>
      {" "}
      <div>
        <center>
          <h1>Team 03</h1>
        </center>
      </div>
      {dataUploaded ? (
        <div style={{ padding: "20px 100px 100px 100px" }}>
          <Bar
            // style={{ minHeight: "500px" }}
            datasetIdKey="id"
            ref={chartRef}
            data={{
              labels: buildingNames.map((res) => res),
              datasets: [
                {
                  type: "line",
                  label: "Total present Out of Hours",
                  data: outsideHoursCount.map((res) => res),
                  fill: false,
                  borderColor: "rgb(54, 162, 235)",
                  backgroundColor: "red",
                },
                {
                  type: "bar",
                  label: "Total present in Hours",
                  data: buildingVisitedCount.map((res) => {
                    console.log(res, "this is res");
                    return res;
                  }),
                  borderColor: "rgb(255, 99, 132)",
                  backgroundColor: "rgba(52, 235, 131,0.5)",
                },
                {
                  type: "bar",
                  label: "Total present Out of Hours",
                  data: outsideHoursCount.map((res) => res),
                  fill: false,
                  borderColor: "rgb(54, 162, 235)",
                  backgroundColor: "red",
                },

                // {
                //   type: "line",
                //   label: "Total present Out of Hours",
                //   data: [0, 0, 1, 0],
                //   fill: false,
                //   borderColor: "rgb(54, 162, 235)",
                //   backgroundColor: "red",
                // },
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
            onClick={onClick}
          />
        </div>
      ) : (
        <>
          <center>
            <h1>Upload location_data</h1>
          </center>
          <input
            type="file"
            name="file"
            accept=".csv"
            style={{ display: "block", margin: "10px auto" }}
            onChange={buildingInfoHandler}
          />
          {/* Input security data */}
          <center>
            <h1>Upload security_logs</h1>
          </center>
          <input
            type="file"
            name="file"
            accept=".csv"
            style={{ display: "block", margin: "10px auto" }}
            onChange={securityInfoHandler}
          />

          <center>
            <h1>Upload people_data </h1>
          </center>
          <input
            type="file"
            name="file"
            accept=".csv"
            style={{ display: "block", margin: "10px auto" }}
            onChange={peopleDataHandler}
          />
          <center>
            <button onClick={() => findThief()}>Find Suspicious!</button>
          </center>
        </>
      )}
      <div style={{ marginTop: "20px" }}>
        {loading ? <>Finding Thief...</> : <> {/* Input building data */}</>}
      </div>
    </>
  );
}
