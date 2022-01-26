import { useState } from "react";
// import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import HerdditLogo from './Images/Herddit.png';
// import waves from "./Images/signupimage.jpg";
import './SignUp.css';


function SignUp ({setUser}) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    // const [passwordConfirmation, setPasswordConfirmation] = useState("")

    function handleSignup(e) {
        e.preventDefault();
        fetch("/signup", {
            method: "POST", 
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify({
                email,
                password,              
            }),
        })
        .then((r) => {
            if (r.ok) {
                r.json()
                .then((user) => setUser(user));
            }
        });
    }
//START Material UI
    function Copyright(props) {
        return (
          <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
              Herddit
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        );
      }
      
      const theme = createTheme();
      
    //   export default function SignUp() {
    //     const handleSubmit = (event) => {
    //       event.preventDefault();
    //       const data = new FormData(event.currentTarget);
    //       // eslint-disable-next-line no-console
    //       console.log({
    //         email: data.get('email'),
    //         password: data.get('password'),
    //       });
    //     };
      
        return (
  
          <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                {/* <img id="signupimg" src= {signupimage} alt="background"/> */}
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                  <LockOutlinedIcon />
                </Avatar> */}
                    <img id="HerdditLogo" src= {HerdditLogo} alt="Logo"/>
                <Typography component="h1" variant="h5">
                  Sign up
                </Typography>
                <Box component="form" noValidate onSubmit={handleSignup} sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      {/* <TextField
                        autoComplete="given-name"
                        name="firstName"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="family-name"
                      /> */}
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={<Checkbox value="allowExtraEmails" color="primary" />}
                        label="I want to receive inspiration, marketing promotions and updates via email."
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    // onSubmit={handleSignup}
                  >
                    Sign Up
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <div>
                    <Link href="/" variant="body2">Back</Link>
                      </div>
                    </Grid>
                    <Grid item>
                      <div>
                      <Link href="/" variant="body2">
                        Already have an account? Sign in
                      </Link>
                      </div>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
              <Copyright sx={{ mt: 5 }} />
            </Container>
          </ThemeProvider>
        );
      }

//END Material UI

    // return (
    //     <div>
    //         <form className="authForm" onSubmit={handleSignup}>
    //             <h1>Signup</h1>
                
    //             <label htmlFor="email">Email</label>
    //             <input
    //                 type="text"
    //                 id="username"
    //                 autoComplete="off"
    //                 value={email}
    //                 onChange={(e) => setUsername(e.target.value)} 
    //             />
    //             <label htmlFor="password">Password</label>
    //             <input
    //                 type="password"
    //                 id="password"
    //                 value={password}
    //                 onChange={(e) => setPassword(e.target.value)}
    //                 autoComplete="current-password" 
    //             />
    //             <label htmlFor="password">Password Confirmation</label>
    //             <input
    //                 type="password"
    //                 id="password_confirmation"
    //                 value={passwordConfirmation}
    //                 onChange={(e) => setPasswordConfirmation(e.target.value)}
    //                 autoComplete="current-password" 
    //             />
    //             <button type="submit">Sign Up</button>
    //         </form>
    //     </div>
    // );
export default SignUp