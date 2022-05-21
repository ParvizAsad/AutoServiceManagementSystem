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

// Chart.register(ArcElement);
function Statistics() {
  const [statistics, setStatistics] = useState({});

  React.useEffect(() => {
    statistcsService.getAllStatistics().then(({ data }) => {
      console.log(data);
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
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "green",
        borderWidth: 2,
      },
    ],
  });

  return (
    <>
      <div className="ForHeading">
        <h1>Statistics</h1>
      </div>
      <Line data={userData} />;
    </>
  );
}

export default Statistics;
