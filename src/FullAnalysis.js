import React from "react";
import Analysis1 from "./Analysis-1.png";
import Analysis2 from "./Analysis-2.png";
import Analysis3 from "./Analysis-3.png";
import Analysis4 from "./Analysis-4.png";
import Analysis5 from "./Analysis-5.png";
import Analysis6 from "./Analysis-6.png";

export default function FullAnalysis() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ marginTop: "100px" }}>
        <h3>
          {" "}
          Number of people in different Major (note that only 1 person is in
          Pharmacy and Pharmacy is not a major in GU)
        </h3>
      </div>
      <img src={Analysis1} alt="no" />
      <div style={{ marginTop: "100px" }}>
        <h3>
          {" "}
          Networkx Node graph depicting Student who are linked (same subject &
          society)
        </h3>
      </div>
      <img src={Analysis2} alt="no" />
      <hr />
      <div style={{ marginTop: "100px" }}>
        <h3>Standard deviation of time spent in boyd orr</h3>
      </div>
      <img src={Analysis3} alt="no" />
      <div style={{ marginTop: "100px" }}>
        <h3 style={{ width: "50%", margin: "auto", paddingBottom: "40px" }}>
          Proportions of Normal People in Sus Societies represent the relative
          number of students in the Bad Movie, Grim Reaper Quidditch, Marxist,
          Soup, and Sexpression societies with respect to the total population.
        </h3>
      </div>

      <img src={Analysis5} alt="no" />
      <div style={{ marginTop: "100px" }}>
        <h3>
          Proportions of Sus People in Sus Societies show that there is a
          disproportionately high percentage of suspicious people in the
          societies listed above.
        </h3>
      </div>
      <img src={Analysis6} alt="no" />
      <div style={{ marginTop: "100px" }}>
        <h3>
          People who were in QMU and Library at the same time with Abdul Murphy
        </h3>
      </div>
      <img src={Analysis4} alt="no" />
    </div>
  );
}
