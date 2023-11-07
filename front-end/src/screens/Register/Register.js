import RegisterScreen from "./RegisterScreen";
import NavBar from '../Header/Header.js'
import { CssBaseline, Container, Paper, Box } from "@material-ui/core";

export const Register=()=>{
    return(
      <>
      <CssBaseline />
        
        <NavBar/>
        <Container style={{ paddingTop: "12vh" }} maxWidth={"sm"} component={Box} p={3}>
          <Paper component={Box} p={3}>
            <RegisterScreen />
          </Paper>
        </Container>
      </>
    )
  }