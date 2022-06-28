import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { connect } from "react-redux";
import { userLogin, userLogout, userSignup } from '../store/actions/user.action.js'

const theme = createTheme();

class _LogIn extends React.Component {

   state = {
      isLogin: true
   }

   onHandleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      console.log({
         username: data.get('username'),
         password: data.get('password'),
      });
      if (this.state.isLogin) {
         this.onLogin({ username: data.get('username'), password: data.get('password') })
      } else {
         this.onSignup({ fullname: data.get('fullname'), username: data.get('username'), password: data.get('password') })
      }
   };

   onLogin = (credentials) => {
      this.props.userLogin(credentials)
      this.props.history.push('/toy/')
   }

   onSignup = (credentials) => {
      this.props.userSignup(credentials)
      this.props.history.push('/toy/')
   }

   onChange = () => {
      this.setState({isLogin : !this.state.isLogin})
   }

   render() {
      const { isLogin } = this.state
      const msgLinkChangeLabel = isLogin ? `Don't have an account? Sign Up`: `Already have an account? Sign in`
      const msgLinkForgotPassLabel = isLogin ? `Forgot password?`: ``
      const msgButtonLabel = isLogin ? `Sign In`: `Sign Up`
      const changeImgColor = isLogin ? `secondary.main`: `primary.dark`

      return (
         <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
               <CssBaseline />
               <Box
                  sx={{
                     marginTop: 8,
                     display: 'flex',
                     flexDirection: 'column',
                     alignItems: 'center',
                  }}
               >
                  <Avatar sx={{ m: 1, bgcolor: changeImgColor }}></Avatar>
                  <Typography component="h1" variant="h5">
                     {msgButtonLabel}
                  </Typography>
                  <Box component="form" onSubmit={this.onHandleSubmit} noValidate sx={{ mt: 1 }}>
                     { !isLogin && <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="fullname"
                        label="Full Name"
                        name="fullname"
                        autoComplete="fullname"
                        autoFocus
                     />}
                     <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="User Name"
                        name="username"
                        autoComplete="username"
                        autoFocus
                     />

                     <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                     />
                     <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                     />
                     <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                     >
                        {msgButtonLabel}
                     </Button>
                     <Grid container>
                        <Grid item xs>
                           <Link href="#" variant="body2">{msgLinkForgotPassLabel}</Link>
                        </Grid>
                        <Grid item>
                           <Link href="#" onClick={this.onChange} variant="body2">{msgLinkChangeLabel}</Link>
                        </Grid>
                     </Grid>
                  </Box>
               </Box>
            </Container>
         </ThemeProvider>
      );
   }
}

const mapStateToProps = (storeState) => {
   return {
      user: storeState.userModule.user
   }
}

const mapDispatchToProps = {
   userLogin,
   userLogout,
   userSignup
}

export const LogIn = connect(
   mapStateToProps,
   mapDispatchToProps

)(_LogIn)