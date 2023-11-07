import Navbar from "../Header/Header";
import Login from "./Login";
import { CssBaseline, Container, Paper, Box } from "@material-ui/core";

export const LoginScreen=()=>{
    return(
      <>
      <CssBaseline />
      <Navbar/>

        <Container style={{ paddingTop: "12vh" }} maxWidth={"sm"} component={Box} p={2}>
          <Paper component={Box} p={2}>
            <Login />
          </Paper>
        </Container>
      </>
    )
  }