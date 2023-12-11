import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import PasswordChecklist from 'react-password-checklist';
import InputAdornment from '@mui/material/InputAdornment';
import { useFormContext } from 'react-hook-form';
import IconButton from '@mui/material/IconButton';
import {VisibilityOutlined,VisibilityOffOutlined} from '@mui/icons-material';

import { Grid } from '@material-ui/core';
const ChangePasswordForm = ({ onSave }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmnewPassword, setConfirmNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordFieldFocused, setPasswordFieldFocused] = useState(false);
  const[valid,setValid]=useState(false);

  const handleSave = () => {
    if(valid){
    onSave(currentPassword, newPassword);
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
      
          <TextField
            id="currentpassword"
            label="Current Password"
            variant="outlined"
            type={showPassword ? 'text' : 'password'}
            placeholder="Current Password"
            fullWidth
            margin="normal"
           required
            InputProps={{
             
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility } className="password-toggle">
                    {showPassword ? <VisibilityOutlined /> : <VisibilityOffOutlined />}
                  </IconButton>
                </InputAdornment>
              ),
            
            }}

              onChange={(e) => {
                setCurrentPassword(e.target.value)
              }}
              
          />
        
      
      </Grid>
      <Grid item xs={12}>
      
        
          <TextField
            id="newpassword"
            label="New Password"
            variant="outlined"
            type={showPassword ? 'text' : 'password'}
            placeholder="New Password"
            fullWidth
            margin="normal"
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility } className="password-toggle">
                    {showPassword ? <VisibilityOutlined /> : <VisibilityOffOutlined />}
                  </IconButton>
                </InputAdornment>
              ),
            
            }}

            onBlur={() => setPasswordFieldFocused(false)}
              onChange={(e) => {
                setNewPassword(e.target.value)
              }}
              onFocus={() => setPasswordFieldFocused(true)}            
              
          />
       
      </Grid>
      <Grid item xs={12}>
      
          <TextField
            id="confirmpassword"
            label="Confirm Password"
            variant="outlined"
            type={showPassword ? 'text' : 'password'}
            placeholder="Confirm Password"
            fullWidth
            margin="normal"
            required
          
            onBlur={() => setPasswordFieldFocused(false)}
              onChange={(e) => {
                setConfirmNewPassword(e.target.value)
              }}
              onFocus={() => setPasswordFieldFocused(true)}            
              
          />
        </Grid>
        <Grid item xs={12}>
        {passwordFieldFocused && 
      (<PasswordChecklist
        className="password-checklist-container"

          style={{
            display:"grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
            gridAutoRows:"60px",
            fontSize:"8px",
            paddingTop:"10px",
            paddingLeft:"20px",
           
        
          }}
          iconSize={
          "14px"
          }
          rules={['capital', 'match', 'minLength', 'number']}
          minLength={8}
          value={newPassword}
          valueAgain={confirmnewPassword}
          onChange={(isValid, errors) => {
            if (isValid) {
              console.log("Valid");
              setValid(true); 
            }
          }}
      
        />
      )}
        </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
            style={{backgroundColor:"black",color:"orange"}}
          onClick={handleSave}
        >
          Save Password
        </Button>
      </Grid>
    </Grid>
  );
};

export default ChangePasswordForm;
