// import { useState,useContext } from 'react';
// import React from 'react';
// import {
//   Typography,
//   Button,
//   Paper,
//   Grid,
//   Avatar,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Container,
//   CssBaseline
// } from '@material-ui/core';
// import QRCode from 'qrcode.react'; 
// import axios from 'axios';
// import { SidebarContext } from '../Visitor/SidebarContext';
// import ChangePasswordForm from './ChangePasswordForm';
// import { useAuth } from '../Login/AuthContext';
// const SecurityProfile = ({user}) => {
//   const{auth,token}=useAuth();
//   const [profileImage, setProfileImage] = useState(null);
//   const { menuCollapse } = useContext(SidebarContext);
//   const [showChangePassword, setShowChangePassword] = useState(false);
//   const[user,setUser]=useState([]);
//   const headers = {
//     Authorization: `Bearer ${token}`,
//   };
//   useEffect(() => {
//     if(token){
//     getUser();
//     }
//   }, [auth]);
//   const getUser=async()=>{
//     const res=await axios.get("http://localhost:8000/getuser",{headers});
//     setUser(res.data);
//     console.log(res);
    

//   }
//   const [showQR, setShowQR] = useState(false); 
//   const handleShowChangePassword = () => {
//     setShowChangePassword(true);
//   };

//   const handleCloseChangePassword = () => {
//     setShowChangePassword(false);
//   };
//   const handleSubmit = async (e) => {
    
//   };
//   const handleSavePassword =async (currentPassword, newPassword) => {
//     const data={
//       new_password:newPassword,
//       current_password:currentPassword,
//       full_name:user.full_name
//     }
//     try {
//       const response = await axios.post('http://localhost:8000/api/change-password', data);

//       if (response.status === 200) {
//         console.log('Password changed successfully');
//         setShowChangePassword(false);

//       } else {
//         console.error('Failed to change password. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//     console.log('Saving password:', currentPassword, newPassword,user.full_name);

//   };
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];

//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setProfileImage(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };
//   const generateQRCodeValue = () => {
//     return `${user.full_name}-${user.phone}-${user.aadhar}`;
//   };

//   const handleShowQR = () => {
//     setShowQR(true);
//   };

//   const handleCloseQR = () => {
//     setShowQR(false);
//   };
//   return (
//     <div className={`${menuCollapse ? 'main-open' : 'main-collapsed'}` }style={{marginTop:"20px",color:"black",zIndex:"0"}}>
//     <Container style={{paddingTop:"50px"}} component="main" maxWidth="lg">
//       <CssBaseline />
//       <Paper elevation={3} style={{ padding: '30px', maxWidth: '600px', margin: 'auto' ,backgroundColor:"white" }}>
//         <Grid container spacing={3} justifyContent="center" alignItems="center">
//           <Grid item xs={12} style={{display:'flex',alignItems:"center",justifyContent:"center"}}>
           
//             <label htmlFor="avatar-upload">
//               <Avatar
//               style={{width:'120px',height:'120px'}}
//                 alt={user.full_name}
//                 src={profileImage}
                
//               />
             
//             </label>
            
//           </Grid>
//           <Grid item xs={12} style={{textAlign:"center",padding:"0"}}>
//             <Typography >
//               <strong>{user.full_name}</strong>
//             </Typography>
//           </Grid>
//           <Grid item xs={6} style={{textAlign:"left"}}>
//             <Typography variant="body1">
//               <strong>User Name:</strong>
//             </Typography>
//           </Grid>
//           <Grid item xs={6} style={{textAlign:"right"}}>
//             <Typography variant="body1">{user.full_name}</Typography>
//           </Grid>
//           <Grid item xs={6} style={{textAlign:"left"}}>
//             <Typography variant="body1">
//               <strong>Phone Number:</strong>
//             </Typography>
//           </Grid>
//           <Grid item xs={6} style={{textAlign:"right"}}>
//             <Typography variant="body1">{user.phone}</Typography>
//           </Grid>
//           <Grid item xs={6} style={{textAlign:"left"}}>
//             <Typography variant="body1">
//               <strong>Aadhar Number:</strong>
//             </Typography>
//           </Grid>
//           <Grid item xs={6} style={{textAlign:"right"}}>
//             <Typography variant="body1">{user.aadhar}</Typography>
//           </Grid>
//           <Grid item xs={6} style={{textAlign:"left"}}>
//             <Typography variant="body1">
//               <strong>Role:</strong>
//             </Typography>
//           </Grid>
//           <Grid item xs={6} style={{textAlign:"right"}}>
//             <Typography variant="body1" color='primary'>
//               <strong>Security</strong>
//             </Typography>
//           </Grid>
//           <Grid item xs={12}>
//             <Typography>
//               <strong>Show QR:</strong>{' '}
//               <Button className='button' color='inherit' variant="outlined"  onClick={handleShowQR}>
//                 Show QR
//               </Button>
//             </Typography>
//           </Grid>
//           <Grid item xs={12}>
       
//           <Button className='button' style={{backgroundColor:"black",color:"white"}} variant="outlined" onClick={handleShowChangePassword}>
//             Change Password
//           </Button>
        
//       </Grid>

//       <Dialog  open={showChangePassword} onClose={handleCloseChangePassword}>
//         <DialogTitle>Change Password</DialogTitle>
//         <DialogContent >
//         <Grid container spacing={2}>
//             <Grid item xs={12}>
//               <ChangePasswordForm onSave={handleSavePassword} />
//             </Grid>
//           </Grid>      
//         </DialogContent>
//         <DialogActions>
//           <Button className='button' onClick={handleCloseChangePassword}>
//             Close
//           </Button>
//         </DialogActions>
//       </Dialog>
//           <Dialog style={{zIndex:'10000'}} open={showQR} onClose={handleCloseQR}>
//         <DialogTitle>QR Code</DialogTitle>
//         <DialogContent>
//           <QRCode size={240} value={generateQRCodeValue()} />
//         </DialogContent>
//         <DialogActions>
//           <Button className='button' onClick={handleCloseQR}>
//             Close
//           </Button>
//         </DialogActions>
//       </Dialog>
//         </Grid>
//       </Paper>
//     </Container>
//     </div>
//   );
// };



// export default SecurityProfile;
