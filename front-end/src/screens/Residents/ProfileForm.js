import { useCallback, useContext, useEffect, useState } from 'react';
import React from 'react';
import {
  Typography,
  Button,
  Paper,
  Grid,
  Avatar,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  Tab,
  Tabs,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Container,
  CssBaseline,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
} from '@material-ui/core';
import QRCode from 'qrcode.react'; 
import axios from '../provider/axiosConfig'
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Snackbar, Alert, DialogContentText } from "@mui/material";
import { useAuth } from '../provider/authProvider';
import { SidebarContext } from './SidebarContext';
import Cookies from 'js-cookie';
import { EditOutlined, EditSharp } from '@mui/icons-material';
import Header1 from '../Header/InsideHeader';
const Profile = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [numFamilyMembers, setNumFamilyMembers] = useState(0);
  const [familyMembers, setFamilyMembers] = useState(Array.from({ length: 0 }, () => ({})));
  const [activeTab, setActiveTab] = useState(0);
  const [showQR, setShowQR] = useState(false); 
  const [showAddFamily, setShowAddFamily] = useState(false);
  const [showFamily, setShowFamily] = useState([]);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [confirmSnackbarOpen, setConfirmSnackbarOpen] = useState(false);
  const [deleteMember, setDeleteMember] = useState("");
  const{menuCollapse}=useContext(SidebarContext);
  const [openImageUploadModal, setOpenImageUploadModal] = useState(false);
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [downloadLink, setDownloadLink] = useState("");
  const[qrvalue,setQrValue]=useState('');
  const{token,image,setImage}=useAuth();
  const[user,setUser]=useState([]);

  const getUser=async()=>{
    if(token){
    const res= await axios.get("http://localhost:8000/users/getuser").then((res)=>{
      setUser(res.data);
      console.log(res);
    });
  }
  }

  useEffect(() => {
    getUser();
  }, [token,image]);
  

  const handleImageFileSelect = (e) => {
    const file = e.target.files[0];
    console.log(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    if (file) {
      reader.onload = () => {
        setSelectedImageFile(reader.result);
      };

      reader.onerror = (error) => {
        console.log('Error: ', error);
      };
    }
  };
  const  handleImage=async()=> {
     

      try {
        let data={image:selectedImageFile}
        const response = await axios.post('http://localhost:8000/users/upload-image', data);
        console.log('Image uploaded successfully:', response.data);
        setProfileImage(selectedImageFile);
        setOpenImageUploadModal(false);
        setImage(true);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    
  
  };
  const handleAddFamilyMembers = () => {
    const newFamilyMembers = Array.from({ length: numFamilyMembers }, () => ({
      editable: true,
    }));
    setFamilyMembers(newFamilyMembers);
  };

  const handleFamilyMemberChange = (index, field, value) => {
    const newFamilyMembers = [...familyMembers];
    newFamilyMembers[index][field] = value;
    setFamilyMembers(newFamilyMembers);
  };

  const handleSave = (index) => {
      const newFamilyMembers = [...familyMembers];
      newFamilyMembers[index].editable = false;
      setFamilyMembers(newFamilyMembers);    
  };




  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  const onSubmit = () => {
    handleGenerateQRCode();
  };
  const handleGenerateQRCode = () => {
    const value={
      "phone_number":user.phone_number,
      "features":user.features,
    }
    console.log(user.features);
    setQrValue(JSON.stringify(value));
    console.log(qrvalue);
    handleShowQR();

    
  };

  const handleDownloadQRCode = () => {
    const canvas = document.getElementById("qrcode-canvas");
    if (canvas) {
      const qrCodeDataURL = canvas.toDataURL("image/png");
      setDownloadLink(qrCodeDataURL);
      
        const downloadLinkElement = document.createElement("a");
        downloadLinkElement.href = qrCodeDataURL;
        downloadLinkElement.download = "qrcode.png";
        document.body.appendChild(downloadLinkElement);
        downloadLinkElement.click();
        document.body.removeChild(downloadLinkElement);
      
    } else {
      console.error("Canvas not found");
    }
    
  };
  const handleShowQR = () => {
    console.log(user);
    setShowQR(true); 
  };

  const handleCloseQR = () => {
    setShowQR(false);
  };
  const handleSubmitAddMember = () => {
    let formData = {  member: familyMembers };
    axios({
      url: "http://127.0.0.1:8000/family/addfamily",
      method: "POST",

      data: formData,
    })
      .then((res) => {
        setConfirmSnackbarOpen(true);
        setShowAddFamily(false);
        setShowFamily([...showFamily, ...familyMembers]);
      })

      .catch((err) => {});
  };

 

    const fetchMembers = async () => {
      if(token){
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/family/getfamily`
        );
        setShowFamily(response.data["family_members"]);
        console.log(response);
      } catch (error) {
        console.log(error.message);
      }
    }
    };
    useEffect(() => {
    fetchMembers();
  }, [token]);

  const sendDataToServer = async () => {
    let newData = [].concat(deleteMember);
    console.log(newData);
    try {
      axios
        .post(`http://127.0.0.1:8000/family/removemember`, {
          member: newData,
        })
        .then((res) => {
          console.log(res);
          setConfirmSnackbarOpen(true);
          fetchMembers();
          setDeleteMember("");
        });
    } catch (error) {
      setShowConfirmationModal(false);
    }
    setShowConfirmationModal(false);
  };

  function handleConfirm() {
    setShowConfirmationModal(true);
  }

  const handleCancel = () => {
    setShowConfirmationModal(false);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setConfirmSnackbarOpen(false);
  };
  
  const FamilyCard = (props) => {
    let {id, name, age, gender } = props.cardData;
    // function stringToColor(string) {
    //   let hash = 0;
    //   let i;

    //   /* eslint-disable no-bitwise */
    //   for (i = 0; i < string.length; i += 1) {
    //     hash = string.charCodeAt(i) + ((hash << 5) - hash);
    //   }

    //   let color = "#";

    //   for (i = 0; i < 3; i += 1) {
    //     const value = (hash >> (i * 8)) & 0xff;
    //     color += `00${value.toString(16)}`.slice(-2);
    //   }
    //   /* eslint-enable no-bitwise */

    //   return color;
    // }

    function stringAvatar(name) {
      return {
        style: {
          backgroundColor: "black",
          color:"orange"
        },
        children: `${name[0]}`,
      };
    }
    
    
    return (
      <>
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          <ListItem key={id} alignItems="flex-start">
            <ListItemAvatar>
              <Avatar {...stringAvatar(name.toUpperCase())} />
            </ListItemAvatar>
            <ListItemText
              primary={name}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="textPrimary"
                  >
                    {age} {" - "}
                    {gender}
                  </Typography>
                </React.Fragment>
              }
            />
            <Button
              onClick={() => {
                setDeleteMember(props.cardData);
                handleConfirm();
              }}
            >
              <DeleteOutlineOutlinedIcon />
            </Button>
          </ListItem>
          <Divider variant="inset" component="li" />
          <Dialog open={showConfirmationModal} onClose={handleCancel}>
            <DialogTitle>Confirm </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Remove From Family
                <br />
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCancel}>Cancel</Button>
              <Button
                onClick={() => sendDataToServer()}
                color="primary"
                autoFocus
              >
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </List>
      </>
    );
  };
  return (
    <>
    <div className={`${menuCollapse ? 'main-open' : 'main-collapsed'}`} style={{marginTop:'20px'}}>
    <Container style={{paddingTop:"50px"}} component="main" maxWidth="lg">
      <CssBaseline />
      <Paper elevation={5} style={{ padding: '30px', maxWidth: '600px', margin: 'auto' ,backgroundColor:"grey" }}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={confirmSnackbarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="success">
          Family Members Updated
        </Alert>
      </Snackbar>
    <Grid container spacing={3} justifyContent="center" alignItems="center">
    <Grid item xs={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
  <label htmlFor="avatar-upload">
    <Avatar
      style={{ width: '120px', height: '120px' }}
      alt={user.full_name}
      src={user.profile_image}
    />
    
      <div style={{width:'20px ',height:'20px',borderRadius:'7px', position: 'relative', bottom: '10px',left:'100px', backgroundColor: 'black',color:'orange' ,padding:'0px'}}
      onClick={() => setOpenImageUploadModal(true)}>
              <EditOutlined fontSize='small' />
              </div>
  </label>
</Grid>
<Dialog open={openImageUploadModal} onClose={() => setOpenImageUploadModal(false)}>
  <DialogTitle>Upload Profile Image</DialogTitle>
  <DialogContent>
    <input type="file" accept='image/jpeg,image/jpg,image/png' onChange={handleImageFileSelect} />
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setOpenImageUploadModal(false)}>Cancel</Button>
    <Button
      onClick={handleImage}
      color="primary"
    >
      Upload
    </Button>
  </DialogActions>
</Dialog>
          
          <Grid item xs={6} style={{textAlign:"left"}} >
            <Typography variant="body1">
              <strong>Flat No:</strong>
            </Typography>
          </Grid>
          <Grid item xs={6} style={{textAlign:"right"}}>
            <Typography variant="body1">{user.flat_no}</Typography>
          </Grid>
          <Grid item xs={6} style={{textAlign:"left"}}>
            <Typography variant="body1">
              <strong>DOB:</strong>
            </Typography>
          </Grid>
          <Grid item xs={6} style={{textAlign:"right"}}>
            <Typography variant="body1">{user.dob}</Typography>
          </Grid>
          <Grid item xs={6} style={{textAlign:"left"}}>
            <Typography variant="body1">
              <strong>Email:</strong>
            </Typography>
          </Grid>
          <Grid item xs={6} style={{textAlign:"right"}}>
            <Typography variant="body1">{user.email}</Typography>
          </Grid>
          <Grid item xs={6} style={{textAlign:"left"}}>
            <Typography variant="body1">
              <strong>Phone Number:</strong>
            </Typography>
          </Grid>
          <Grid item xs={6} style={{textAlign:"right"}}>
            <Typography variant="body1">{user.phone_number}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <strong>Show QR code:</strong>{' '}
              <Button className='button' color='inherit' variant="outlined"  onClick={onSubmit}>
                Show QR
              </Button>
            </Typography>
          </Grid>
          <Dialog style={{ zIndex: "10000"}} open={showQR} onClose={handleCloseQR}>
        <DialogTitle>QR Code</DialogTitle>
        <DialogContent>
          <QRCode
            id="qrcode-canvas"
            value={qrvalue}
            size={256}
            level={"L"}
            includeMargin={true}
          />
        </DialogContent>
        <DialogContent>
          <Button
            variant="contained"
            style={{margin:'0 auto', backgroundColor: "black", color: "white" }}
            onClick={handleDownloadQRCode}
          >
            Download QR
          </Button>
        </DialogContent>
        <DialogActions>
          <Button className="button" onClick={handleCloseQR}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
          <Grid item xs={12} >
          <Typography variant="body1">
              <strong>Family Member:</strong>
            </Typography>
            {showFamily.map((val, ind) => {
              return <FamilyCard cardData={val} key={ind} />;
            })}
          </Grid>
          <Grid item xs={12} >
            <Button
              variant="contained"
              style={{ backgroundColor: "black", color: "white" }}
              className="button"
              onClick={() => {
                setShowAddFamily(!showAddFamily);
              }}
            >
              Add Family Members
            </Button>
          </Grid>
          {showAddFamily ? (
            <Grid container xs={12} spacing={3}>
              <Grid item xs={6}>
               
                <Typography>
              <strong>Number of family members:</strong>{' '}
              <Select
              id="family-members"
              labelId='family-members'
              
              value={numFamilyMembers}
              variant='outlined'          
              onChange={(e) => setNumFamilyMembers(e.target.value)}
            >
              {[0,1, 2, 3, 4, 5].map((num) => (
                <MenuItem  key={num} value={num}>
                  {num}
                </MenuItem>
              ))}
            </Select>
            </Typography>   
                
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" style={{backgroundColor:'black',color:"orange"}} className='button' onClick={handleAddFamilyMembers}  >
              Open Form
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Tabs value={activeTab} onChange={handleTabChange} selectionFollowsFocus variant='scrollable'>
              {familyMembers.map((_, index) => (
                <Tab style={{color:'rgb(0,0,62)'}}  key={index} label={`Member ${index + 1}`} />
              ))}
            </Tabs>
            {familyMembers.map((member, index) => (
      <TabPanel key={index} value={activeTab} index={index}>
        <Grid container spacing={3}>
          <Grid item xs={12} style={{ textAlign: "left" }}>
            <TextField
              variant='outlined'
              fullWidth
              required
              label={`Name ${index + 1}`}
              value={member.name || ''}
              onChange={(e) => handleFamilyMemberChange(index, 'name', e.target.value)}
              InputProps={{
                readOnly: !member.editable,
              }}
              
            />
          </Grid>
          <Grid item xs={12} style={{ textAlign: "right" }}>
            <TextField
              variant='outlined'
              fullWidth
              label={`Age ${index + 1}`}
              value={member.age || ''}
              type='number'
              required
              onChange={(e) => handleFamilyMemberChange(index, 'age', e.target.value)}
              InputProps={{
                readOnly: !member.editable,
              }}
            />
          </Grid>
          <Grid item xs={12} style={{ textAlign: "left" }}>
          <FormControl>
                          <FormLabel id="demo-row-radio-buttons-group-label">
                            Gender
                          </FormLabel>
                          <RadioGroup
                             required
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="radio-buttons-group"
                            value={member.gender || ""}
                            onChange={(e) =>
                              handleFamilyMemberChange(
                                index,
                                "gender",
                                e.target.value
                              )
                            }         
                            
                            
            >
               <FormControlLabel
                              value="male"
                              control={<Radio />}
                              label="Male"
                            />
                            <FormControlLabel
                              value="female"
                              control={<Radio />}
                              label="Female"
                            />
                            <FormControlLabel
                              value="other"
                              control={<Radio />}
                              label="Others"
                            />
                          </RadioGroup>
                        </FormControl>
          </Grid>
  
  
         
                </Grid>
                
              </TabPanel>
            ))}
             <Grid
                  item
                  direction="column"
                  alignContent="center"
                  justifyContent="center"
                >
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "black", color: "orange" }}
                    className="button"
                    onClick={handleSubmitAddMember}
                  >
                    submit
                  </Button>
          </Grid>
          </Grid>
          
          </Grid>
          ) :(
            ""
          )}
          
        </Grid>
        
      </Paper>
    </Container>
    </div>
    </>
  );
};

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={2}>{children}</Box>}
    </div>
  );
};

export default Profile;
