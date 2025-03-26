import React from 'react';

const NotAuthorized = () => {
  return (
    <div className="unauthorized-container">
      <style jsx>{`
        .unauthorized-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          background: linear-gradient(135deg, #ff00cc, #333399,rgb(150, 201, 108));
          overflow: hidden;
        }

        .glitch-text {
          font-size: 4rem;
          color: #fff;
          text-transform: uppercase;
          position: relative;
          animation: glitch 1s linear infinite;
        }

        .glitch-text:before,
        .glitch-text:after {
          content: "403 - ACCESS DENIED";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .glitch-text:before {
          color: #00ffcc;
          animation: glitch-top 0.5s linear infinite;
          clip-path: polygon(0 0, 100% 0, 100% 33%, 0 33%);
        }

        .glitch-text:after {
          color: #ff0066;
          animation: glitch-bottom 0.7s linear infinite;
          clip-path: polygon(0 67%, 100% 67%, 100% 100%, 0 100%);
        }

        .neon-box {
          background: rgba(0, 255, 204, 0.1);
          padding: 20px;
          border: 3px solid #00ffcc;
          border-radius: 15px;
          box-shadow: 0 0 20px #00ffcc, inset 0 0 20px #00ffcc;
          margin: 20px;
        }

        .funky-message {
          color: #fff;
          font-size: 1.5rem;
          font-family: 'Courier New', Courier, monospace;
          text-align: center;
          animation: pulse 2s infinite;
        }

        .wavy-line {
          width: 80%;
          height: 5px;
          background: repeating-linear-gradient(
            45deg,
            #ff00cc,
            #ff00cc 10px,
            #333399 10px,
            #333399 20px
          );
          animation: wave 3s linear infinite;
        }

        .retro-button {
          padding: 15px 30px;
          font-size: 1.2rem;
          color: #fff;
          background: #ff0066;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 0 10px #ff0066;
        }

        .retro-button:hover {
          transform: scale(1.1);
          background: #00ffcc;
          color: #333399;
          box-shadow: 0 0 20px #00ffcc;
        }

        /* Animations */
        @keyframes glitch {
          2%, 64% { transform: translate(2px, 0) skew(0deg); }
          4%, 60% { transform: translate(-2px, 0) skew(0deg); }
          62% { transform: translate(0, 0) skew(5deg); }
        }

        @keyframes glitch-top {
          2%, 64% { transform: translate(2px, -2px); }
          4%, 60% { transform: translate(-2px, 2px); }
          62% { transform: translate(13px, -1px) skew(-13deg); }
        }

        @keyframes glitch-bottom {
          2%, 64% { transform: translate(-2px, 0); }
          4%, 60% { transform: translate(-2px, 1px); }
          62% { transform: translate(-22px, 5px) skew(21deg); }
        }

        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }

        @keyframes wave {
          0% { background-position: 0 0; }
          100% { background-position: 20px 0; }
        }
      `}</style>

      <h1 className="glitch-text" data-text="403 - ACCESS DENIED">
        403 - ACCESS DENIED
      </h1>
      <div className="neon-box">
        <p className="funky-message">
          Whoa there, space traveler! 🚀
          <br />
          You’re trying to sneak into a restricted zone!
        </p>
      </div>
      <div className="wavy-line"></div>
      <button
        className="retro-button"
        onClick={() => window.location.href = '/'}
      >
        Beam Me Back Home
      </button>
    </div>
  );
};

export default NotAuthorized;