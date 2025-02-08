import React from "react";
import { useNavigate } from 'react-router-dom';
import "../index.css"
import { FcGoogle } from "react-icons/fc";
import { FaPhone } from "react-icons/fa6";
export default function SignupCustomer() {
  const navigate = useNavigate();
  const moveToVerification = () => {
    navigate("/verify-customer")
  }
  return (
    <div
      className="container"
    >
      {/* Left Panel */}
      <div
        className="left-panel "
      >
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem" }}>FIXIFY!</h1>
          <p style={{ fontSize: "1.125rem" }}>FIND. CONNECT. FIX!</p>
        </div>
      </div>

      {/* Right Panel */}
      <div
        className="right-panel"
      >
        <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem", color: "black" }}>Create Account</h2>

        <div style={{ display: "flex", width: "100%", justifyContent: "center", gap: "1rem", marginBottom: "1.5rem" }}>
          <button
            className="logo-button"
          >
            <FcGoogle />
            {/* <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
              alt="Google logo"
              style={{ width: "1rem", height: "1rem" }}
            /> */}
            Sign up with Google
          </button>
          <button
            className="logo-button"
          >
            {/* <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Phone_font_awesome.svg/1024px-Phone_font_awesome.svg.png"
              alt="Phone logo"
              style={{ width: "1rem", height: "1rem" }}
            /> */}
            <FaPhone />
            Sign up with phone
          </button>
        </div>

        <p style={{ marginBottom: "1rem", color: "black" }}>--OR--</p>

        <form style={{ width: "100%", maxWidth: "20rem" }}>
          <div style={{ marginBottom: "1rem" }}>
            <input
              type="text"
              placeholder="Full Name"
              className="input-box"
            />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <input
              type="email"
              placeholder="Email Address"
              className="input-box"
            />
          </div>
          <div style={{ marginBottom: "1rem", position: "relative" }}>
            <input
              type="password"
              placeholder="Password"
              className="input-box"
            />
            <span
              style={{
                position: "absolute",
                top: "50%",
                right: "2px",
                transform: "translateY(-50%)",
                color: "#9ca3af",
                cursor: "pointer",
              }}
            >
              👁️
            </span>
          </div>
          <button
            type="submit"
            className="button"
            onClick={moveToVerification}
          >
            Create Account
          </button>
        </form>

        <p style={{ marginTop: "1rem", color: "black" }}>
          Already Have An Account? <a href="#" style={{ color: "#7c3aed", textDecoration: "underline" }}>Log In</a>
        </p>
      </div>
    </div>
  );
}
