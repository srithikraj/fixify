import React from "react";
import "../index.css"
export default function SignupCustomer() {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        background: "linear-gradient(to bottom right, #7e57c2, #000)",
        color: "white",
      }}
    // className="container"
    >
      {/* Left Panel */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "50%",
          padding: "2rem",
        }}
      // className="left-panel "
      >
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem" }}>FIXIFY!</h1>
          <p style={{ fontSize: "1.125rem" }}>FIND. CONNECT. FIX!</p>
        </div>
      </div>

      {/* Right Panel */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
          width: "50%",
          padding: "2rem",
          borderTopLeftRadius: "1.5rem",
          borderBottomLeftRadius: "1.5rem",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem", color: "black" }}>Create Account</h2>

        <div style={{ display: "flex", width: "100%", justifyContent: "center", gap: "1rem", marginBottom: "1.5rem" }}>
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.5rem 1rem",
              borderRadius: "0.5rem",
              border: "1px solid #d1d5db",
              backgroundColor: "#f3f4f6",
              cursor: "pointer",
            }}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
              alt="Google logo"
              style={{ width: "1rem", height: "1rem" }}
            />
            Sign up with Google
          </button>
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.5rem 1rem",
              borderRadius: "0.5rem",
              border: "1px solid #d1d5db",
              backgroundColor: "#f3f4f6",
              cursor: "pointer",
            }}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Phone_font_awesome.svg/1024px-Phone_font_awesome.svg.png"
              alt="Phone logo"
              style={{ width: "1rem", height: "1rem" }}
            />
            Sign up with phone
          </button>
        </div>

        <p style={{ marginBottom: "1rem", color: "black" }}>-OR-</p>

        <form style={{ width: "100%", maxWidth: "20rem" }}>
          <div style={{ marginBottom: "1rem" }}>
            <input
              type="text"
              placeholder="Full Name"
              style={{
                width: "100%",
                padding: "0.5rem 1rem",
                borderRadius: "0.5rem",
                border: "1px solid #d1d5db",
                color: "black",
                outline: "none",
                boxShadow: "0 0 0 2px transparent",
              }}
            />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <input
              type="email"
              placeholder="Email Address"
              style={{
                width: "100%",
                padding: "0.5rem 1rem",
                borderRadius: "0.5rem",
                border: "1px solid #d1d5db",
                color: "black",
                outline: "none",
                boxShadow: "0 0 0 2px transparent",
              }}
            />
          </div>
          <div style={{ marginBottom: "1rem", position: "relative" }}>
            <input
              type="password"
              placeholder="Password"
              style={{
                width: "100%",
                padding: "0.5rem 1rem",
                borderRadius: "0.5rem",
                border: "1px solid #d1d5db",
                color: "black",
                outline: "none",
                boxShadow: "0 0 0 2px transparent",
              }}
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
            style={{
              width: "100%",
              backgroundColor: "#ef4444",
              color: "white",
              padding: "0.5rem 1rem",
              borderRadius: "0.5rem",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
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
