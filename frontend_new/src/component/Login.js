import React from "react";
import login from '../Asstes/login.png';
import { Link } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import ButtonBase from '@mui/material/ButtonBase';

import { useState } from 'react';

import Modal from 'react-bootstrap/Modal';
import { Box, Card, Container, TextField, Typography, Button } from '@mui/material';





function Login() {

  const [signupUsername, setSignupUsername] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");



  const handleSignup = async () => {
  if (!signupUsername || !signupEmail || !signupPassword || !signupConfirmPassword) {
    alert("Please fill in all fields");
    return;
  }
  if (signupPassword !== signupConfirmPassword) {
    alert("Passwords do not match");
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: signupUsername,
        email: signupEmail,
        password: signupPassword
      })
    });
    const data = await response.json();
    if (response.ok) {
      alert("Signup successful!");
      setShowSecond(false); // close modal
    } else {
      alert(data.message || "Signup failed");
    }
  } catch (error) {
    console.error(error);
    alert("Something went wrong!");
  }
};

const [loginEmail, setLoginEmail] = useState("");
const [loginPassword, setLoginPassword] = useState("");

const handleLogin = async () => {
  if (!loginEmail || !loginPassword) {
    alert("Please fill in all fields");
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userNameOrEmail: loginEmail,
        password: loginPassword
      })
    });

    const data = await response.json();

    if (response.ok) {
      alert("Login successful!");
      setShowFirst(false); // closes the login modal

      // Optionally save token in localStorage for authentication
      localStorage.setItem("token", data.token);
    } else {
      alert(data.message || "Login failed");
    }
  } catch (error) {
    console.error(error);
    alert("Something went wrong!");
  }
};


const [showFirst, setShowFirst] = useState(false);
  const [showSecond, setShowSecond] = useState(false);

  // Function to open second modal and close first modal
  const handleOpenSecond = () => {
    setShowFirst(false); // Close first modal
    setTimeout(() => setShowSecond(true), 300);
  };
  


  const [avatarSrc, setAvatarSrc] = React.useState(undefined);

  const handleAvatarChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarSrc(reader.result);
      };
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
                <Link className="nav-link" to="/contact">Contact Us</Link>
              </li>
            </ul>
          <Button
  variant="primary"
  onClick={() => setShowFirst(true)}
  style={{
    border: "2px solid white", // white border
    color: "white",            // text color white
    backgroundColor: "#0d6efd", // primary blue
    marginRight: "20px"
  }}
>
  Login
</Button>

      {/* First Modal- */}
   <Modal show={showFirst} onHide={() => setShowFirst(false)}>
      <Modal.Body>
        <Box sx={{ flex: 1, maxWidth: 550, maxHeight: 540, width: "100%" }}>
          <Card variant="outlined" sx={{ borderRadius: "10px", p: 3 }}>
            <Typography variant="h5" color="primary" align="center" gutterBottom>
              <b>SkillXchange</b>
            </Typography>
            <Typography variant="h6" align="center" gutterBottom>
              LOGIN
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Typography variant="body2" fontWeight="bold" >UserName</Typography>
              <TextField 
                label="UserName/E-mail" 
                variant="outlined" 
                size="small" 
                required 
                value={loginEmail} 
                placeholder="Enter Your Name or E-mail"
                onChange={(e) => setLoginEmail(e.target.value)} 
              />

            

              <Typography variant="body2" fontWeight="bold">Password</Typography>
              <TextField 
                label="Password" 
                type="password" 
                variant="outlined" 
                size="small" 
                required 
                placeholder="Enter Password"
                value={loginPassword} 
                onChange={(e) => setLoginPassword(e.target.value)} 
              />

              <Button 
                variant="contained" 
                text-color="primary" 
                className="Submit" 
                fullWidth 
                onClick={handleLogin}
              >
                Login
              </Button>

              <hr />

              <Button 
                variant="secondary" 
                className="mt-1" 
                onClick={handleOpenSecond} 
                style={{ textTransform: "none" }} 
                disableRipple
              > 
                <Typography variant="body2" align="center" color="text.secondary">
                  Don't have an account? <Link to="/">Signup</Link>
                </Typography>
              </Button>
            </Box>
          </Card>
        </Box>
      </Modal.Body>
    </Modal>

      {/* Second Modal */}
      <Modal show={showSecond} onHide={() => setShowSecond(false)}>
      <Modal.Body>
        <Box sx={{ flex: 1, maxWidth: 550, width: "100%" }}>
          <Card variant="outlined" sx={{ borderRadius: "10px", p: 3 }}>
            <Typography variant="h5" color="primary" align="center" gutterBottom>
              <b>SkillXchange</b>
            </Typography>
            <Typography variant="h6" align="center" gutterBottom>
              SIGN UP
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Typography variant="body2" fontWeight="bold">UserName</Typography>
              <TextField 
                label="UserName" 
                variant="outlined" 
                size="small" 
                required 
                value={signupUsername}
                placeholder="Enter your Name"
                onChange={(e) => setSignupUsername(e.target.value)}
              />

              <Typography variant="body2" fontWeight="bold">Email</Typography>
              <TextField 
                label="Email" 
                variant="outlined" 
                size="small" 
                required 
                value={signupEmail}
                placeholder="Enter Your E-mail"
                onChange={(e) => setSignupEmail(e.target.value)}
              />

              <Typography variant="body2" fontWeight="bold">Password</Typography>
              <TextField 
                label="Password" 
                type="password" 
                variant="outlined" 
                size="small" 
                required
                placeholder="Enter Password"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
              />

              <Typography variant="body2" fontWeight="bold">Confirm Password</Typography>
              <TextField
                label="Confirm Password"
                type="password"
                variant="outlined"
                size="small"
                required
                placeholder="Enter Password"
                value={signupConfirmPassword}
                onChange={(e) => setSignupConfirmPassword(e.target.value)}
              />

              <Button 
                variant="contained" 
                color="primary" 
                fullWidth
                onClick={handleSignup}
              >
                Sign Up
              </Button>
            </Box>
          </Card>
        </Box>
      </Modal.Body>
    </Modal>


            <div className="d-flex align-items-center">
              <ButtonBase
                component="label"
                sx={{
                  gap: 2,
                  borderRadius: '40px',
                  '&:has(:focus-visible)': {
                    outline: '2px solid',
                    outlineOffset: '2px',
                  },
                }}
              >
                <span className="text-white d-flex align-items-center">Profile</span>
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
        </div>
      </nav>

      {/* Main content */}
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

        {/* Right: Form */}




          
      </Container>
    </div>
  );
}

export default Login;
