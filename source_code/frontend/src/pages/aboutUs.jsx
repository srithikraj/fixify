import React from 'react';
import logo from "../assets/logo.png"
import vid from "../../public/vid.mp4"
const Aboutus = () => {
  const styles = {
    body: {
      margin: 0,
      fontFamily: 'Arial, sans-serif',
      backgroundColor: 'white',
    },
    app: {
      position: 'relative',
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      padding: '15px 30px',
      marginBottom: '0',
      position: 'relative',
      left: '20px',
      top: '10px',
    },
    logo: {
      width: '80px',
      height: '80px',
    },
    companyName: {
      fontSize: '50px',
      marginLeft: '10px',
      color: 'black',
    },
    navButtons: {
      marginLeft: 'auto',
      display: 'flex',
      alignItems: 'center',
      marginRight: '30px',
    },
    homeButton: {
      fontSize: '24px',
      marginRight: '15px',
      cursor: 'pointer',
    },
    loginButton: {
      backgroundColor: 'red',
      color: 'white',
      fontSize: '24px',
      padding: '8px 16px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    aboutUs: {
      padding: '10px 30px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      marginTop: '20px',
    },
    aboutTitle: {
      fontSize: '50px',
      marginBottom: '10px',
    },
    aboutContent: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '20px',
      width: '100%',
      maxWidth: '1100px',
    },
    aboutText: {
      fontSize: '24px',
      maxWidth: '500px',
      textAlign: 'justify', // Align text to the left within the column
    },
    aboutVideo: {
      width: '400px',
      height: '400px',
      objectFit: 'cover',
      borderRadius: '10px',
      marginLeft: '20px', // Shift video slightly to the right
    },
    footerBorder: {
      width: '100%',
      height: '100px',
      backgroundImage: 'url("footer-image.png")',
      backgroundSize: 'cover',
      marginTop: 'auto',
    },
  };

  return (
    <div style={styles.app}>
      {/* Header Section */}
      <header style={styles.header}>
        <img src={logo} alt="Logo" style={styles.logo} />
        <h1 style={styles.companyName}>FIXIFY!</h1>
        <div style={styles.navButtons}>
          <span style={styles.homeButton}>HOME</span>
          <button style={styles.loginButton}>LOGIN</button>
        </div>
      </header>

      {/* About Us Section */}
      <section style={styles.aboutUs}>
        <h2 style={styles.aboutTitle}>ABOUT US</h2>
        <div style={styles.aboutContent}>
          <p style={styles.aboutText}>
            Welcome to FIXIFY! - the easiest way to find, connect, and fix what’s broken in your home. We help you discover local service providers nearby—no booking hassle, just simple contact details to get the job done.
            <br /><br />
            We get it—things break. But finding the right person to fix it shouldn't be a headache. That’s why we created FIXIFY! We made it easy to connect with trusted pros in your area so you can get back to what matters.
          </p>
          <video style={styles.aboutVideo} autoPlay loop muted playsInline>
            <source src={vid} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>

      {/* Footer Border */}
      <div style={styles.footerBorder}></div>
    </div>
  );
};

export default Aboutus;