import { useState, useEffect } from "react";
import { withStyles } from "@material-ui/styles";
import styles from "./styles";
import axios from "axios";

const monthsArray = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const monthCounts = {
  January: [31, 31],
  February: [28, 59],
  March: [31, 90],
  April: [30, 120],
  May: [31, 151],
  June: [30, 181],
  July: [31, 212],
  August: [31, 243],
  September: [30, 273],
  October: [31, 304],
  November: [30, 334],
  December: [31, 365],
};

function getDay() {
  return monthsArray.map((k, ind) => {
    return <option value={ind}>{k}</option>;
  });
}

function MonthSchedule(month, classes) {
  let maintain = [];
  for (let i = 1; i <= monthCounts[monthsArray[month]][0]; i++) {
    maintain.push(
      new Date(`2023-${month}-${i}`).getDay() % 5 === 0 ? true : false
    );
  }
  return maintain.map((k, ind) => {
    return (
      <div className={classes.date}>
        <p className={k ? classes.maintainDay : classes.normalDay}>{ind + 1}</p>
      </div>
    );
  });
}

function Schedule(props) {
  const { classes } = props;
  const [data, setData] = useState({});
  const [month, setMonth] = useState(
    new Date(new Date().toDateString()).getMonth()
  );
  const [dataloaded, setloaded] = useState(false);

  async function getMaintainDataFromServer() {
    await fetch(
      `http://localhost:8000/admin/getMaintainData/${new Date().getFullYear()}`,
      { method: "GET" }
    ).then((res) => {
      res.json().then((d) => {
        if (d[0] !== null) {
          d = d[0];
          d["quaterly"] = d["quaterly"].split(",");
          setData(d);
          setloaded(true);
        }
      });
    });
  }

  useEffect(() => {
    getMaintainDataFromServer();
  }, []);

  function handleMonthChange(evt) {
    setMonth(evt.target.value);
  }

  function handleQuaterly() {
    return data["quaterly"].map((k, ind) => {
      return (
        <div className={classes.quaterlyParent}>
          <p className={classes.scheduleDate}>Maintenance {ind}</p>
          {dataloaded ? (
            <div className={classes.quaterlyCalender}>
              <div className={classes.quaterlycalenderChild}>
                {k.split("-")[2]}
              </div>
              <div className={classes.quaterlycalenderChild}>
                {monthsArray[k.split("-")[1] - 1]}
              </div>
              <div className={classes.quaterlycalenderChild}>
                {k.split("-")[0]}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      );
    });
  }

  return (
    <div className={classes.parent}>
      <div className={classes.monthly}>
        <select
          onChange={handleMonthChange}
          defaultValue={monthsArray[month]}
          className={classes.select}
        >
          {getDay()}
        </select>
        {MonthSchedule(month, classes)}
      </div>
      <div className={classes.scheduleDivParent}>
        <div className={`${classes.quaterly} `}>
          <p className={classes.scheduleDivHead}>Quaterly</p>
          <div className={classes.calenderSheets}>
            {dataloaded ? (
              handleQuaterly()
            ) : (
              <i class="fa-solid fa-spinner"></i>
            )}
          </div>
        </div>
        <div className={`${classes.scheduleDiv} ${classes.halfYearly}`}>
          <p className={classes.scheduleDivHead}>Half Yearly</p>
          {dataloaded ? (
            <div className={classes.calender}>
              <div className={classes.calenderChild}>
                {data["half"].split("-")[2]}
              </div>
              <div className={classes.calenderChild}>
                {monthsArray[data["half"].split("-")[1] - 1]}
              </div>
              <div className={classes.calenderChild}>
                {data["half"].split("-")[0]}
              </div>
            </div>
          ) : (
            ""
          )}
          <p className={classes.scheduleDivHead}>Yearly</p>
          {dataloaded ? (
            <div className={classes.calender}>
              <div className={classes.calenderChild}>
                {data["yearly"].split("-")[2]}
              </div>
              <div className={classes.calenderChild}>
                {monthsArray[data["yearly"].split("-")[1] - 1]}
              </div>
              <div className={classes.calenderChild}>
                {data["yearly"].split("-")[0]}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default withStyles(styles)(Schedule);
