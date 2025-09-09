import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // ✅ import useNavigate
import { Button, ButtonBase, Avatar } from "@mui/material";

const Profile = () => {
  const [avatarSrc, setAvatarSrc] = useState(null);
  const navigate = useNavigate(); // ✅ create navigate function

  // Handle avatar change
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarSrc(URL.createObjectURL(file));
    }
  };

  // ✅ Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add validation or API call here before navigating
    navigate("Suggestion"); // ✅ redirect to profile suggestion page
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
              <h2 className="text-center mb-2 fw-bold text-primary">PROFILE</h2> <hr />

              {/*  Use handleSubmit */}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label" style={{ color: "black", fontWeight: "600" }}>
                    Full Name
                  </label>
                  <input type="text" className="form-control" placeholder="John Doe" required />
                </div>

                <div className="mb-3">
                  <label className="form-label" style={{ color: "black", fontWeight: "600" }}>
                    Email Address
                  </label>
                  <input type="email" className="form-control" placeholder="you@example.com" required />
                </div>

                <div className="mb-3">
                  <label className="form-label" style={{ color: "black", fontWeight: "600" }}>
                    Your Skills
                  </label>
                  <input type="text" className="form-control" placeholder="e.g., Python, Design, Public Speaking" />
                </div>

                <div className="mb-3">
                  <label className="form-label" style={{ color: "black", fontWeight: "600" }}>
                    Want to Learn
                  </label>
                  <input type="text" className="form-control" placeholder="e.g., Web Dev, Marketing" />
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
                    <select className="form-select">
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
                    <select className="form-select">
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
                  <textarea className="form-control" rows="3" placeholder="Tell others about yourself..."></textarea>
                </div>

                <button type="submit" className="btn btn-primary w-100 fw-semibold">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
