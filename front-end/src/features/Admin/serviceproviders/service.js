import { withStyles } from "@material-ui/styles";
import styles from "./style";

function service(props) {
  const { classes } = props;

  function validation(arr) {
    console.log(arr[5]);
    if (/([0-9]{10})$/.test(arr[5])) {
      return true;
    } else {
      return false;
    }
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    console.log(validation(evt.target));
  }

  return (
    <div className={classes.parent}>
      <form className={classes.form} onSubmit={handleSubmit}>
        <p className={classes.head}>Add Service Providers</p>
        <input className={classes.input} placeholder="First name" required />
        <input className={classes.input} placeholder="last name" required />
        <input
          className={classes.input}
          placeholder="dob"
          type="date"
          required
        />
        <select className={classes.input} required>
          <option className={classes.option} value="">
            Select Role
          </option>
          <option className={classes.option} value="Lift Maintanence">
            Lift Maintanence
          </option>
          <option className={classes.option} value="Terrace">
            Terrace
          </option>
          <option className={classes.option} value="Plumbing">
            Plumbing
          </option>
          <option className={classes.option} value="Electricity">
            Electricity
          </option>
          <option className={classes.option} value="Painting">
            Painting
          </option>
          <option className={classes.option} value="Gardening">
            Gardening
          </option>
          <option className={classes.option} value="House Keeping">
            House Keeping
          </option>
        </select>
        <input
          type="file"
          id="file"
          className={classes.input}
          hidden
          required
        />
        <label
          htmlFor="file"
          className={`${classes.imageUpload} ${classes.input}`}
        >
          Upload Image
          <i className={`fa-solid fa-cloud-arrow-up ${classes.upload}`}></i>
        </label>
        <input
          className={classes.input}
          placeholder="Phone"
          type="number"
          required
        />
        <input className={classes.input} placeholder="Aadhar Number" required />
        <input className={classes.input} placeholder="Password" required />
        <input
          className={classes.input}
          placeholder="Confirm password"
          required
        />
        <button className={classes.button} type="submit">
          Add
        </button>
      </form>
    </div>
  );
}

export default withStyles(styles)(service);
