import { useState } from 'react';
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
} from '@material-ui/core';
import QRCode from 'react-qr-code'; 
const Profile = ({ user }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [numFamilyMembers, setNumFamilyMembers] = useState(0);
  const [familyMembers, setFamilyMembers] = useState(Array.from({ length: 0 }, () => ({})));
  const [activeTab, setActiveTab] = useState(0);
  const { name, flatNo, age, email, phoneNumber } = user;
  const [showQR, setShowQR] = useState(false); 

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddFamilyMembers = () => {
    const newFamilyMembers = Array.from({ length: numFamilyMembers }, () => ({}));
    setFamilyMembers(newFamilyMembers);
  };

  const handleFamilyMemberChange = (index, field, value) => {
    const newFamilyMembers = [...familyMembers];
    newFamilyMembers[index][field] = value;
    setFamilyMembers(newFamilyMembers);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  const generateQRCodeValue = () => {
    return `${name}-${flatNo}-${phoneNumber}`;
  };

  const handleShowQR = () => {
    setShowQR(true);
  };

  const handleCloseQR = () => {
    setShowQR(false);
  };
  return (
    <div>
      <Paper elevation={0} style={{ padding: '30px', maxWidth: '600px', margin: 'auto'  }}>
        <Grid container spacing={3} justifyContent="center" alignItems="center">
          <Grid item xs={12} style={{display:'flex',alignItems:"center",justifyContent:"center"}}>
            <input
              accept="image/*"
              id="avatar-upload"
              type="file"
              style={{ display: 'none' }}
              onChange={handleImageChange}
            />
            <label htmlFor="avatar-upload">
              <Avatar
              style={{width:'120px',height:'120px'}}
                alt={name}
                src={profileImage}
                
              />
              <Typography style={{fontSize:'30px' ,textAlign:'center'}}>{name}</Typography>
            </label>
          </Grid>
          
          <Grid item xs={6} style={{textAlign:"left"}} >
            <Typography variant="body1">
              <strong>Flat No:</strong>
            </Typography>
          </Grid>
          <Grid item xs={6} style={{textAlign:"right"}}>
            <Typography variant="body1">{flatNo}</Typography>
          </Grid>
          <Grid item xs={6} style={{textAlign:"left"}}>
            <Typography variant="body1">
              <strong>Age:</strong>
            </Typography>
          </Grid>
          <Grid item xs={6} style={{textAlign:"right"}}>
            <Typography variant="body1">{age}</Typography>
          </Grid>
          <Grid item xs={6} style={{textAlign:"left"}}>
            <Typography variant="body1">
              <strong>Email:</strong>
            </Typography>
          </Grid>
          <Grid item xs={6} style={{textAlign:"right"}}>
            <Typography variant="body1">{email}</Typography>
          </Grid>
          <Grid item xs={6} style={{textAlign:"left"}}>
            <Typography variant="body1">
              <strong>Phone Number:</strong>
            </Typography>
          </Grid>
          <Grid item xs={6} style={{textAlign:"right"}}>
            <Typography variant="body1">{phoneNumber}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <strong>Show QR code:</strong>{' '}
              <Button className='button' color='inherit' variant="outlined"  onClick={handleShowQR}>
                Show QR
              </Button>
            </Typography>
          </Grid>
          <Dialog style={{zIndex:'10000'}} open={showQR} onClose={handleCloseQR}>
        <DialogTitle>QR Code</DialogTitle>
        <DialogContent>
          <QRCode value={generateQRCodeValue()} />
        </DialogContent>
        <DialogActions>
          <Button className='button' onClick={handleCloseQR}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
          <Grid item xs={12}>
            <InputLabel htmlFor="family-members">Number of Family Members</InputLabel>
            <Select
              id="family-members"
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
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" style={{backgroundColor:'black',color:"white"}} className='button' onClick={handleAddFamilyMembers}  >
              Add Family Members
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Tabs value={activeTab} onChange={handleTabChange} centered>
              {familyMembers.map((_, index) => (
                <Tab style={{color:'rgb(0,0,62)'}} key={index} label={`Member ${index + 1}`} />
              ))}
            </Tabs>
            {familyMembers.map((member, index) => (
              <TabPanel  key={index} value={activeTab} index={index}>
                <Grid container spacing={3}>
                  <Grid item xs={12} style={{textAlign:"left"}}>
                    <TextField
                    variant='outlined'
                      fullWidth
                      label={`Name ${index + 1}`}
                      value={member.name || ''}
                      onChange={(e) => handleFamilyMemberChange(index, 'name', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} style={{textAlign:"right"}}>
                    <TextField
                      variant='outlined'

                      fullWidth
                      label={`Age ${index + 1}`}
                      value={member.age || ''}
                      onChange={(e) => handleFamilyMemberChange(index, 'age', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} style={{textAlign:"left"}}>
                    <TextField
                      variant='outlined'
                      fullWidth
                      label={`Aadhar ${index + 1}`}
                      value={member.aadhar || ''}
                      onChange={(e) => handleFamilyMemberChange(index, 'aadhar', e.target.value)}
                    />
                  </Grid>
                </Grid>
              </TabPanel>
            ))}
          </Grid>
        </Grid>
      </Paper>
    </div>
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
