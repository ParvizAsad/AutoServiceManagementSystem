import React from "react";
import { CardGroup, Card, CardBody, CardTitle, Button } from "reactstrap";
import { FaPeopleArrows } from "react-icons/fa";
import { GrUserAdmin } from "react-icons/gr";
import { GiDirectorChair } from "react-icons/gi";
import { Link } from "react-router-dom";
import { Pie, Line, Doughnut, Bar } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
import { UserData } from "./Data";
import { useState } from "react";
// import { Chart as ChartJS } from "chart.js/auto";
import { statistcsService } from "../../../Api/services/Statistics";
import "./Statistics.scss";

// Chart.register(ArcElement);
function Statistics() {
  const [statistics, setStatistics] = useState({});

  React.useEffect(() => {
    statistcsService.getAllStatistics().then(({ data }) => {
      setStatistics(data);
    });
  }, []);

  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        label: "Company Profit",
        data: UserData.map((data) => data.userGain),
        backgroundColor: [
          "rgba(8, 4, 220, 0.3)",
        ],
        borderColor: "rgba(8, 4, 220, 1)",
        borderWidth: 3,
      },
    ],
  });

  return (
    <>
      <div className="ForHeading">
        <h1>Statistics</h1>
      </div>
      <div className="forFraphic">
        <div id="graphic">
          <Line id="Line" data={userData} />;
        </div>
      </div>
          </>
  );
}

export default Statistics;
