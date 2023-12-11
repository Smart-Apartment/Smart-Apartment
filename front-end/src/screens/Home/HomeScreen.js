import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Link } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import GoogleIcon from "@mui/icons-material/Google";
import {
  Grid,
  Typography,
  Button,
  Box,
  Card,
  CardActionArea,
  CardContent,
  Container,
} from "@mui/material";
import CardPerson from "./utils/Card";
import { GridPerson } from "./utils/GridPerson";
import './home.css'
// Enable ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const Section1 = () => {
  const titleRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    gsap.from(titleRef.current, {
      opacity: 0,
      y: -50, 
      duration: 3,
      ease: "power3.out",
    });

    gsap.from(imgRef.current, {
      opacity: 0,
      x: 50, 
      duration: 3,
      ease: "power3.out",
    });
  }, []);

  return (
    <section
      className="u-align-left u-clearfix u-image u-section-1"
      id="carousel_247a"
    >
      <div className="u-sheet-1">
        <Typography
          ref={titleRef}
          className="mob-text1"
          ml={6}
          mt={6}
          variant="h2"
          color="orange"
        >
          Smart Apartment
        </Typography>
        <Typography className="mob-text2" ml={6} mt={6} variant="h4">
          Smart way to live, work <br />
          Enhance your living experience
          <br /> with smart features and services.
        </Typography>

        <Grid
          mt={6}
          ml={6}
          style={{
            display: "flex",
            gap: "10px",
          }}
          className="mob-icon"
        >
          <a className="u-social-url" target="_blank" href="/">
            <FacebookIcon style={{ color: "#fff" }} />
          </a>
          <a className="u-social-url" target="_blank" href="/">
            <TwitterIcon style={{ color: "#fff" }} />
          </a>
          <a className="u-social-url" target="_blank" href="/">
            <InstagramIcon style={{ color: "#fff" }} />
          </a>
          <a className="u-social-url" target="_blank" href="/">
            <GoogleIcon style={{ color: "#fff" }} />
          </a>
        </Grid>
        <Grid container direction="column">
        <Link to='/register' className='register'>

          <Button
            className="mob-btn"
            style={{
              backgroundColor:'black',
              color:'orange',
              width: "150px",
              padding: "10px 20px",
              marginLeft: "50px",
              marginTop: "50px",
            }}
            variant="contained"
            
          >
            Sign up
          </Button>
          </Link>
          <Link to='/visitorLogin' className='register'>

          <Button
            className="mob-btn"
            style={{
              backgroundColor:'black',
              color:'orange',
              width: "150px",
              padding: "10px 20px",
              marginLeft: "50px",
              marginTop: "50px",
            }}
            variant="contained"
          >
            Visit Now
          </Button>
          </Link>
        </Grid>
      </div>
      <img
        ref={imgRef}
        id="mob-img"
        src={require(`./utils/homepage.png`).default}
        alt="Smart Apartment"
      />
    </section>
  );
};

const Section2 = () => {
  const titleRef = useRef(null);
  const gridRef = useRef(null);

  
  const VisitorButton = () => {
    return (
      <Box mt={3} textAlign="center">
        <Button
          style={{ padding: "10px 20px", backgroundColor: "black" ,color:'orange'}}
          variant="contained"
        >
          Visit
        </Button>
      </Box>
    );
  };

  const MoreInfo = () => {
    return (
      <Box mt={3} textAlign="center">
        <Button
          style={{
            padding: "10px 20px",
            backgroundColor: "black",
            color:'orange'
          }}
          variant="contained"
        >
          More Info
        </Button>
      </Box>
    );
  };
  const data = [
    {
      id:'1',
      title: "Visitor Management",
      description:
        "Ensure your peace of mind schedule maintenance for your Smart Apartment effortlessly. Book now to experience prompt. Don't wait for issues to arise proactively book maintenance for your Smart Apartment.",
      button: <VisitorButton />,
    },
    {
      id:'2',
      title: "Account Management",
      description:
        " Explore a list of vetted service providers for various needs, from home repairs to cleaning services. Service Requests Easily request additional services directly through the portal, streamlining the process for your convenience.",
      button: <MoreInfo />,
    },
    {
      id:'3',
      title: "Maintenance Management",
      description:
        "Welcome to our Management Hub, your central control center for all things related to your Smart Apartment. Here, residents can access important information, manage account settings, and stay connected with the community.",
      button: <MoreInfo />,
    },
    {
      id:'4',
      title: "Complaints Management",
      description:
        "We understand that sometimes issues arise, and our Complaints Center is here to make problem-solving as efficient as possible. Residents can submit and track maintenance requests, report concerns, and receive updates ",
      button: <MoreInfo />,
    },
  ];

  const CardDetails = (props) => {
    const { title, description, button, id } = props.cardData;
    const cardRef = useRef(null);
  
    return (
      <Grid key={id} item ref={cardRef}>
        <Card
          key={id}
          className="servicecard"
          sx={{
            maxWidth: 250,
            height: '100%', // Set height to 100% for equal height cards
            overflow: 'hidden', // Hide overflow content
            textAlign: 'left',
            backgroundColor: 'grey',
            color: 'white',
          }}
        >
          <CardContent
            key={id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%', // Set height to 100% for equal height cards
            }}
          >
            <Typography gutterBottom variant="h4" component="div" color="orange">
              {title}
            </Typography>
  
            <Typography variant="h6" color="white" style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {/* Set maximum number of lines to display or handle overflow */}
              {description}
            </Typography>
            {button}
          </CardContent>
        </Card>
      </Grid>
    );
  };

  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
        backgroundImage: 'linear-gradient(to right, #343434, #111)',
        overflow: "auto",
      }}
    >
      <Box ref={titleRef} textAlign="center" mt={10} mb={10}>
        <Typography style={{ color: "white" }} variant="h3">
          Services
        </Typography>
      </Box>
      <Grid ref={gridRef} container justifyContent="center" spacing={6}>
        {data.map((val) => {
          return <CardDetails key={val.id} cardData={val}  />;
        })}
      </Grid>
    </div>
  );
};

const Footer = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        backgroundColor: "#222",
        paddingTop: "1rem",
        paddingBottom: "1rem",
      }}
    >
      <Container maxWidth="lg">
        <Grid container direction="column" alignItems="center">
          <Grid item xs={12} mt={3}>
            <Typography color="white" variant="h4">
              Smart Apartment
            </Typography>
          </Grid>
          <Grid item xs={12} mt={3}>
            <Typography color="white" variant="subtitle1">
              {`${new Date().getFullYear()} | Anna University | MCA - SS | `}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

const Section3 = () => {
  const mainData = [
    {
      hexa: "#1D1148",
      title: "Dr.Deivamani M",
      description: "Sir",
      image: require(`./utils/person-icon.png`).default,
    },
    {
      hexa: "#FFCD00",
      title: "Muthumani",
      description: "Sir",
      image: require(`./utils/person-icon.png`).default,
    },
  ];

  return (
    <div
      id="about"
      style={{
        width: "100vw",
        height: "100vh",
        backgroundImage:'linear-gradient(to right, #343434, #111)'
        ,
      }}
    >
      <Box textAlign="center" mb={10}>
        <Typography style={{ color: "white" }} variant="h3">
          About us
        </Typography>
        <Typography
          style={{ color: "white", marginTop: "10px", marginBottom: "10px" }}
          variant="h4"
        >
          Under the Guidance of
        </Typography>
        <div style={{display:'flex',minWidth:'100%',alignItems:'center',justifyContent:'center'}}> 
        <GridPerson  className="avatar">
          {mainData.map((val, index) => (
            <CardPerson
              key={index}
              hexa={val.hexa}
              title={val.title}
              description={val.description}
              image={val.image}
            />
          ))}
        </GridPerson>
        </div>
        <Typography style={{ color: "white", marginTop: "10px" }} variant="h4">
          The Team Behind Application
        </Typography>
        <Typography style={{ color: "white", marginTop: "10px"}} variant="h5">
          Saravana Raju R <br />
          Mohammed Hamdhan <br /> Guru Vikram <br /> Vallal <br />
          Dhanushree <br /> Arun AVR <br /> Ajay Kannan <br /> Mohammed taufeeq{" "}
          <br /> Suriya Raj <br />
          Prakash <br /> Raghava <br /> Arun Kumar
        </Typography>
      </Box>
    </div>
  );
};

const HomeScreen = () => {
  return (
    <div style={{userSelect:'none'}}>
      {" "}
      <Section1 />
      <Section2 />
      <Section3 />
      <Footer />
    </div>
  );
};

export default HomeScreen;
