import Login from "./Login";
import { CssBaseline, Container, Paper, Box } from "@material-ui/core";
import Loading from "../Loader/loader";
export const LoginScreen=()=>{
    return(
      <>
      <CssBaseline />

        <Container style={{ paddingTop: "12vh" }} maxWidth={"sm"} component={Box} p={3}>
          <Paper  component={Box} p={3} style={{backgroundColor:'grey'}}>
            <Login />
          </Paper>
        </Container>
      </>
      
    )
  }