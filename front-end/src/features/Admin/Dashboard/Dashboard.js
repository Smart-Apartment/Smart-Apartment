import { useState, useEffect } from "react";
import Chart, { VisitorChart } from "../temp/budget";
import axios from "axios";

function Dashboard(props) {
  const { classes } = props;
  const [visitorsCount, setVisitorsCount] = useState(0);

  async function getData() {
    await axios
      .get("https://smartapartmentserver.onrender.com/admin/visitorsCount")
      .then((res) => {
        setVisitorsCount(res.data[0]);
      });
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={classes.dashboard}>
      <div className={classes.smallDashParent}>
        <div className={classes.smallDash}>
          <span className={classes.count}>{props.userCount}</span>
          <span className={classes.small}> Total Users</span>
        </div>
        <div className={`${classes.smallDash} ${classes.smallDashcomp}`}>
          <div className={classes.graph}>
            <p className={`${classes.medium} ${classes.whiteText}`}>Budget</p>
            <Chart
              width={props.width * 0.29}
              height={window.innerHeight * 0.15}
            />
          </div>
        </div>
      </div>
      <div className={classes.mediumDash}>
        <p className={`${classes.medium} ${classes.whiteText}`}>Complaints</p>
        <div className={classes.complaintsdiv}>
          <div className={classes.compcount}>
            <p className={`${classes.count}`}>{props.complaintsCount[0]}</p>
            <p className={`${classes.small} ${classes.whiteText}`}> Pending</p>
          </div>
          <div className={classes.compcount}>
            <p className={classes.count}>{props.complaintsCount[1]}</p>
            <p className={`${classes.small} ${classes.whiteText}`}>Completed</p>
          </div>
          <div className={classes.compcount}>
            <p className={classes.count}>{props.complaintsCount[2]}</p>
            <p className={`${classes.small} ${classes.whiteText}`}>Rejected</p>
          </div>
        </div>
      </div>
      <div className={classes.largeDash}>
        <p className={classes.count}>
          {visitorsCount}
          <span className={classes.span}> Visitors</span>
        </p>
        <VisitorChart width={props.width * 0.7} />
      </div>
    </div>
  );
}

export default Dashboard;
