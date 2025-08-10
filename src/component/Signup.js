import React from 'react';
import { Link } from 'react-router-dom';
import login from '../Assets/Login.png';
import Avatar from '@mui/material/Avatar';
import ButtonBase from '@mui/material/ButtonBase';
import { Box, Card, Container, TextField, Typography, Grid, Button } from '@mui/material';
import CardContent from '@mui/material/CardContent';

function Signup() {
  const [avatarSrc, setAvatarSrc] = React.useState(undefined);

  const handleAvatarChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setAvatarSrc(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            SkillXchange
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link active" to="/Home">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  Contact Us
                </Link>
              </li>
            </ul>

            {/* Profile Avatar */}
            <ButtonBase
              component="label"
              role={undefined}
              tabIndex={-1}
              aria-label="Avatar image"
              sx={{
                gap: 2,
                borderRadius: '40px',
                '&:has(:focus-visible)': {
                  outline: '2px solid',
                  outlineOffset: '2px',
                },
              }}
            >
              <span className="text-white">Profile</span>
              <Avatar alt="Upload new avatar" src={avatarSrc} />
              <input
                type="file"
                accept="image/*"
                style={{
                  border: 0,
                  clip: 'rect(0 0 0 0)',
                  height: '1px',
                  margin: '-1px',
                  overflow: 'hidden',
                  padding: 0,
                  position: 'absolute',
                  whiteSpace: 'nowrap',
                  width: '1px',
                }}
                onChange={handleAvatarChange}
              />
            </ButtonBase>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <Container sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '80vh',
        gap: 30,
        py: 4
      }}>
        
        {/* Left: Image + Text */}
        <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
          <img
            src={login}
            alt="Login Illustration"
            style={{
              maxWidth: '100%',
              height: 'auto',
              borderRadius: '10px',
              marginBottom: '20px'
            }}
          />
          <Typography variant="h4" fontWeight="bold">
            Welcome to SkillXchange!
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Share skills. Learn together. Grow with SkillXchange.
          </Typography>
        </Box>

          {/* Right Side - Signup Form */}
           <Box sx={{ flex: 1, maxWidth: 450, width: '100%' }}>
                   <Card variant="outlined" sx={{ borderRadius: '10px', p: 3 }}>
                     <Typography variant="h5" color="primary" align="center" gutterBottom>
                       <b>SkillXchange</b>
                     </Typography>
                     <Typography variant="h6" align="center" gutterBottom>
                       SIGN UP
                     </Typography>
         
                     <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                       <Typography variant="body2" fontWeight="bold">UserName</Typography>
                       <TextField label="UserName" variant="outlined" size="small" />
                       <Typography variant="body2" fontWeight="bold">Email</Typography>
                       <TextField label="Email" variant="outlined" size="small" />
                       <Typography variant="body2" fontWeight="bold">Password</Typography>
                       <TextField label="Password" type="password" variant="outlined" size="small" />
                       <Typography variant="body2" fontWeight="bold">Confirm Password</Typography>
                       <TextField
                    label="Confirm Password"
                    type="password"
                    variant="outlined"
                    size="small"
                  />
                  <Button variant="contained" color="primary" fullWidth>
                    Sign Up
                  </Button>
                   <hr />
                                <Typography variant="body2" align="center" color="text.secondary">
                                  Back to Login? <Link to="/">Login</Link>
                                </Typography>
                </Box>
              </Card>
           </Box>
         
        </Container>
      </div>
  );
}

export default Signup;
