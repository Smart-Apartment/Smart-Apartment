import RegisterScreen from "./RegisterScreen";
import Navbar from './Header'
import { CssBaseline, Container, Paper, Box } from "@material-ui/core";

export const Register=()=>{
    return(
      <>
      <CssBaseline />
        
        <Navbar/>
        <Container style={{ paddingTop: "12vh" }} maxWidth={"sm"} component={Box} p={3}>
          <Paper component={Box} p={3}>
            <RegisterScreen />
          </Paper>
        </Container>
      </>
    )
  }