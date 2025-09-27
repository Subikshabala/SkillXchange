import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, ButtonBase, Avatar,Snackbar,Alert } from "@mui/material";

const Profile = () => {
  const [avatarSrc, setAvatarSrc] = useState(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    skills: "",
    want_to_learn: "",
    state: "Tamil Nadu",
    city: "Chennai",
    about: "",
  });
  const [snackbar, setSnackbar] = useState({
  open: false,
  message: '',
  severity: 'success', // 'success' or 'error'
});


  // Handle avatar change
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarSrc(URL.createObjectURL(file));
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const response = await fetch("http://localhost:5000/api/profiles", {
        method: "POST",
        headers: { "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
      setSnackbar({
        open: true,
        message: "Profile saved successfully!",
        severity: "success"
      });
      setTimeout(() => navigate("Suggestion"), 1000); // go to cards page after 1 sec
    } else {
      setSnackbar({
        open: true,
        message: "Error saving profile: " + data.error,
        severity: "error"
      });
    }
    } catch (err) {
      console.error(err);
      alert("Something went wrong while saving profile.");
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Skill<span className="text-dark">X</span>change
          </a>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
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

            {/* Profile Button */}
            <Button
              className="nav-link"
              component={Link}
              to="/profile"
              variant="outlined"
              style={{
                border: "2px solid white",
                color: "white",
                backgroundColor: "#0d6efd",
                marginRight: "20px",
              }}
            >
              Profile
            </Button>

            {/* Avatar Upload */}
            <ButtonBase component="label">
              <Avatar alt="Upload new avatar" src={avatarSrc} />
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleAvatarChange}
              />
            </ButtonBase>
          </div>
        </div>
      </nav>

      {/* Profile Form */}
      <div className="container py-5" style={{ position: "relative", zIndex: 1 }}>
        <div className="row justify-content-center">
          <div className="col-lg-9">
            <div className="card bg-light text-dark shadow-lg border-light rounded-4 p-4">
              <h2 className="text-center mb-2 fw-bold text-primary">PROFILE</h2> 
              <hr />

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label" style={{ color: "black", fontWeight: "600" }}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="John Doe"
                    required
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label" style={{ color: "black", fontWeight: "600" }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="you@example.com"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label" style={{ color: "black", fontWeight: "600" }}>
                    Your Skills
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g., Python, Design, Public Speaking"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label" style={{ color: "black", fontWeight: "600" }}>
                    Want to Learn
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g., Web Dev, Marketing"
                    name="want_to_learn"
                    value={formData.want_to_learn}
                    onChange={handleChange}
                  />
                </div>

                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label className="form-label" style={{ color: "black", fontWeight: "600" }}>
                      Country
                    </label>
                    <select className="form-select" disabled>
                      <option value="India" defaultValue>
                        India
                      </option>
                    </select>
                  </div>

                  <div className="col-md-4 mb-3">
                    <label className="form-label" style={{ color: "black", fontWeight: "600" }}>
                      State
                    </label>
                    <select
                      className="form-select"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                    >
                      <option>Gujarat</option>
                      <option>Maharashtra</option>
                      <option>Rajasthan</option>
                      <option>Karnataka</option>
                      <option>Tamil Nadu</option>
                      <option>Kerala</option>
                      <option>Andhra Pradesh</option>
                    </select>
                  </div>

                  <div className="col-md-4 mb-3">
                    <label className="form-label" style={{ color: "black", fontWeight: "600" }}>
                      City
                    </label>
                    <select
                      className="form-select"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                    >
                      <option>Ahmedabad</option>
                      <option>Surat</option>
                      <option>Chennai</option>
                      <option>Salem</option>
                      <option>Coimbatore</option>
                      <option>Bangalore</option>
                      <option>Mumbai</option>
                      <option>Pune</option>
                    </select>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label" style={{ color: "black", fontWeight: "600" }}>
                    About You
                  </label>
                  <textarea
                    className="form-control"
                    rows="3"
                    placeholder="Tell others about yourself..."
                    name="about"
                    value={formData.about}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary w-100 fw-semibold">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

    <Snackbar
      open={snackbar.open}
      autoHideDuration={3000}
      onClose={() => setSnackbar({ ...snackbar, open: false })}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        severity={snackbar.severity}
        sx={{ width: "100%" }}
      >
        {snackbar.message}
      </Alert>
    </Snackbar>
    
    </>

);
};

export default Profile;
