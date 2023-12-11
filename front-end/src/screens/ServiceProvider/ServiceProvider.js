import { useState,useContext,useEffect } from 'react';
import React from 'react';
import {
  Typography,
  Button,
  Paper,
  Grid,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Container,
  CssBaseline,
  List,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';
import QRCode from 'qrcode.react'; 
import { EditOutlined } from '@mui/icons-material';

import { SidebarContext } from '../Residents/SidebarContext';
import ChangePasswordForm from '../Security/ChangePasswordForm';
import { useAuth } from '../provider/authProvider';
import axios from '../provider/axiosConfig'
import {Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { FaDotCircle } from 'react-icons/fa';
const ServiceProvider = () => {
  const [profileImage, setProfileImage] = useState(null);
  const { menuCollapse } = useContext(SidebarContext);
  const{token,image,setImage}=useAuth();
  const[role,setRole]=useState([]);
  const[user,setUser]=useState([]);
  const [openImageUploadModal, setOpenImageUploadModal] = useState(false);
  const [selectedImageFile, setSelectedImageFile] = useState(null);

  useEffect(() => {
    
    getUser();
  
  }, [token]);
  const getUser=async()=>{
    const res=await axios.get("http://localhost:8000/users/getservice");
    if(res.status===200){
      setUser(res.data);
      setRole(res.data.role);
      console.log(res.data);
    }
    else{
      Cookies.remove('token');
      return <Navigate to="/login"  />;
    }    
    
  }
  const [showChangePassword, setShowChangePassword] = useState(false);

  const [showQR, setShowQR] = useState(false); 
  const handleShowChangePassword = () => {
    setShowChangePassword(true);
  };

  const handleCloseChangePassword = () => {
    setShowChangePassword(false);
  };

  const handleSavePassword =async (currentPassword, newPassword) => {
    const data={
      new_password:newPassword,
      current_password:currentPassword,
    }
    try {
      const response = await axios.post('http://localhost:8000/auth/change-password', data);

      if (response.status === 200) {
        console.log('Password changed successfully');
        setShowChangePassword(false);

      } else {
        console.error('Failed to change password. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
    console.log('Saving password:', currentPassword, newPassword);

  };
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
        setImage(!image);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    
  
  };
  const generateQRCodeValue = () => {
    const data={
      'full_name':user.first_name+user.last_name,
      'phone_number':user.phone_number,
      'dob':user.dob,
      'aadhar_number':user.aadhar_number,


    }
    return  JSON.stringify(data);
  };
  const handleDownloadQRCode = () => {
    const canvas = document.getElementById("qrcode-canvas");
    if (canvas) {
      const qrCodeDataURL = canvas.toDataURL("image/png");
      
        const downloadLinkElement = document.createElement("a");
        downloadLinkElement.href = qrCodeDataURL;
        downloadLinkElement.download = "qrcode.png";
        document.body.appendChild(downloadLinkElement);
        downloadLinkElement.click();
        document.body.removeChild(downloadLinkElement);
      
    } else {
      console.error("Canvas not found");
    }
  }
  const handleShowQR = () => {
    setShowQR(true);
  };

  const handleCloseQR = () => {
    setShowQR(false);
  };
  return (
    !!user&&(
    <div className={`${menuCollapse ? 'main-open' : 'main-collapsed'}` }style={{marginTop:"20px",color:"black",zIndex:"0"}}>
    <Container style={{paddingTop:"50px"}} component="main" maxWidth="lg">
      <CssBaseline />
      <Paper elevation={3} style={{ padding: '30px', maxWidth: '600px', margin: 'auto' ,backgroundColor:"white" }}>
        <Grid container spacing={3}  justifyContent="center" alignItems="center" >
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
<Grid xs={12}>
        <Typography style={{fontSize:'30px' ,textAlign:'center'}}>{user.full_name}</Typography>
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
          
          <Grid item xs={6} style={{textAlign:"left"}}>
            <Typography variant="body1">
              <strong>Phone Number:</strong>
            </Typography>
          </Grid>
          <Grid item xs={6} style={{textAlign:"right"}}>
            <Typography variant="body1">{user.phone_number}</Typography>
          </Grid>
          <Grid item xs={6} style={{textAlign:"left"}}>
            <Typography variant="body1">
              <strong>Aadhar Number:</strong>
            </Typography>
          </Grid>
          <Grid item xs={6} style={{textAlign:"right"}}>
            <Typography variant="body1">{user.aadhar_number}</Typography>
          </Grid>
          <Grid item xs={6} style={{textAlign:"left"}}>
            <Typography variant="body1">
              <strong>Roles:</strong>
            </Typography>
          </Grid>
          <Grid item xs={6} style={{textAlign:"right"}}>
            
            {role.map((val,index)=>{
                return <List key={index} style={{color:'orange'}}>{val} </List>
             })}

            
           
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <strong>Show QR:</strong>{' '}
              <Button className='button' color='inherit' variant="outlined"  onClick={handleShowQR}>
                Show QR
              </Button>
            </Typography>
          </Grid>
          <Grid item xs={12}>
       
       <Button className='button' style={{backgroundColor:"black",color:"white"}} variant="outlined" onClick={handleShowChangePassword}>
         Change Password
       </Button>
     
   </Grid>

   <Dialog maxWidth="xs" open={showChangePassword} onClose={handleCloseChangePassword}>
     <DialogTitle>Change Password</DialogTitle>
     <DialogContent >
     <Grid container spacing={2}>
         <Grid item xs={12}>
           <ChangePasswordForm onSave={handleSavePassword} />
         </Grid>
       </Grid>      
     </DialogContent>
     <DialogActions>
       <Button className='button' onClick={handleCloseChangePassword}>
         Close
       </Button>
     </DialogActions>
   </Dialog>
   <Dialog style={{ zIndex: "10000"}} open={showQR} onClose={handleCloseQR}>
        <DialogTitle>QR Code</DialogTitle>
        <DialogContent>
          <QRCode
            id="qrcode-canvas"
            value={generateQRCodeValue}
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
        </Grid>
      </Paper>
    </Container>
    </div>
    )
  );
};



export default ServiceProvider;
