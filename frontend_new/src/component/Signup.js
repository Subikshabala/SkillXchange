import React from 'react';
import { Link } from 'react-router-dom';
import login from '../Asstes/login.png';
import Avatar from '@mui/material/Avatar';
import ButtonBase from '@mui/material/ButtonBase';
import { Box, Card, Container, TextField, Typography, Grid, Button } from '@mui/material';
//import CardContent from '@mui/material/CardContent';
import { useState } from 'react';

import Modal from 'react-bootstrap/Modal';

function Signup() {
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [avatarSrc, setAvatarSrc] = useState(undefined);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const handleAvatarChange = (event) => {
  const file = event.target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => setAvatarSrc(reader.result);
    reader.readAsDataURL(file);
    }
  };

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    if (!username || !email || !password) {
      alert("Please fill in all fields");
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Signup successful!");
        setShow(false); // closes the modal
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
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
               <Button variant="contained" color='inherit' onClick={handleShow}>
                    Signup
                  </Button>
            <Modal show={show} onHide={handleClose}>
        <Modal.Header >
          <Modal.Body>
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
                       <TextField label="UserName" variant="outlined" size="small" required value={username} onChange={(e) => setUsername(e.target.value)} />
                       <Typography variant="body2" fontWeight="bold">Email</Typography>
                       <TextField label="Email" variant="outlined" size="small" required value={email} onChange={(e) => setEmail(e.target.value)}/>
                       <Typography variant="body2" fontWeight="bold">Password</Typography>
                       <TextField label="Password" type="password" variant="outlined" size="small" required value={password} onChange={(e) => setPassword(e.target.value)} />
                       <Typography variant="body2" fontWeight="bold">Confirm Password</Typography>
                       
                       <TextField
                    label="Confirm Password"
                    type="password"
                    variant="outlined"
                    size="small"
                    required value={confirmPassword}
                  />
                  <Button variant="contained" color="primary" fullWidth onClick={handleSignup}>
                    Sign Up
                  </Button>
                   <hr />
                                <Typography variant="body2" align="center" color="text.secondary">
                                  Back to Login? <Link to="/">Login</Link>
                                </Typography>
                                
                </Box>
              </Card>
           </Box>
        
       </Modal.Body>
        </Modal.Header>




        <Modal.Footer>
          <Button variant="contained" color="primary" onClick={handleClose}>
            Close
          </Button>
         
        </Modal.Footer>
      </Modal>


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
  
         
        </Container>
      </div>
  );
}

export default Signup;
