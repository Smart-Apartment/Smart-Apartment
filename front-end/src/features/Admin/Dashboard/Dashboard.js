import Chart, { VisitorChart } from "../temp/budget";

function Dashboard(props) {
  const { classes } = props;
  return (
    <div className={classes.dashboard}>
      <div className={classes.smallDashParent}>
        <div className={classes.smallDash}>
          <p className={classes.count}>
            {props.userCount}
            <span className={classes.span}> Total Users</span>
          </p>
        </div>
        <div className={classes.smallDash}>
          <p className={classes.count}>
            {props.complaintsCount}
            <span className={classes.span}> Complaints</span>
          </p>
        </div>
      </div>
      <div className={classes.mediumDash}>
        <p className={classes.count}>
          {props.visitorsCount}
          <span className={classes.span}> Visitors</span>
        </p>
        <div className={classes.graph}>
          <VisitorChart width={props.width * 0.5} />
        </div>
      </div>
      <div className={classes.largeDash}>
        <Chart width={props.width * 0.5} />
      </div>
    </div>
  );
}

export default Dashboard;
