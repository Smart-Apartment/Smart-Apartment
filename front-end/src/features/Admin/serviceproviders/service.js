import { withStyles } from "@material-ui/styles";
import styles from "./style";
import { useState } from "react";
import axios from "axios";
import ViewServiceProviders from "./viewServiceProviders";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { v4 } from "uuid";
import { useTheme } from "@mui/material";
import Box from "@mui/material/Box";

function Service(props) {
  const { classes } = props;
  const [image, setImage] = useState("");
  const [active, setActive] = useState(1);
  const [roles, setRoles] = useState([]);
  const [security, setSecurity] = useState(false);

  const [personName, setPersonName] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value.split(",") : value);
  };

  function handleSecurity(evt) {
    evt.preventDefault();
    setPersonName(() => {
      return security === false ? [] : personName;
    });
    setSecurity(!security);
  }

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const options = [
    "Lift Maintenance",
    "Terrace",
    "Plumbing",
    "Electricity",
    "Painting",
    "Gardening",
    "House Keeping",
  ];

  function handleSwitch() {
    setActive(!active);
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    let data = {
      first_name: evt.target[0].value,
      last_name: evt.target[1].value,
      dob: evt.target[2].value,
      role: security ? ["security"] : personName,
      phone: String(evt.target[7].value),
      password: evt.target[9].value,
      confirmpassword: evt.target[10].value,
      aadhar_number: evt.target[8].value,
      image: image,
    };

    let response = await axios.post(
      "http://localhost:8000/admin/addProvider",
      data
    );
  }

  async function handleUpload(evt) {
    const reader = new FileReader();

    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(evt.target.files[0]);
  }

  return (
    <div className={classes.parent}>
      <div className={classes.options}>
        <p
          className={`${classes.option} ${active ? "" : classes.active}`}
          onClick={handleSwitch}
        >
          Add Member
        </p>
        <p
          className={`${classes.option} ${active ? classes.active : ""}`}
          onClick={handleSwitch}
        >
          view Member
        </p>
      </div>
      {active ? (
        <ViewServiceProviders />
      ) : (
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
          <div className={classes.merge}>
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel
                style={{
                  backgroundColor: "#000",
                  padding: "2px 15px",
                  borderRadius: "10px",
                }}
                id="demo-multiple-chip-label"
              >
                Roles
              </InputLabel>
              <Select
                disabled={security}
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                style={{ backgroundColor: "white", color: "black" }}
                multiple
                value={personName}
                onChange={handleChange}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip
                        style={{ color: "orange", backgroundColor: "#000" }}
                        key={value}
                        label={value}
                      />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {options.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={{ color: "orange", backgroundColor: "#000" }}
                    className={classes.option}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <button
              className={`${classes.Securityinput} ${
                security ? classes.enabled : classes.disabled
              }`}
              placeholder="Security"
              onClick={handleSecurity}
            >
              Security
            </button>
          </div>
          <input
            type="file"
            id="file"
            className={classes.input}
            hidden
            required
            onChange={handleUpload}
          />
          <div className={`${classes.imageUpload} ${classes.input}`}>
            <label htmlFor="file" className={`${classes.imageInput}`}>
              Upload Image
              <i className={`fa-solid fa-cloud-arrow-up ${classes.upload}`}></i>
            </label>
            <img
              id="preview"
              className={classes.preview}
              src={image}
              alt="preview"
            />
          </div>
          <input
            className={classes.input}
            placeholder="Phone"
            type="number"
            required
          />
          <input
            className={classes.input}
            placeholder="Aadhar Number"
            required
          />
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
      )}
    </div>
  );
}

export default withStyles(styles)(Service);
