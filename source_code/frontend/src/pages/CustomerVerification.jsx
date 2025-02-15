import React, { useRef } from "react";
import verification from "../assets/verification.avif";
const OTPVerification = () => {
    const inputRefs = useRef([]);
    const handleChange = (e, index) => {
        const { value } = e.target;
        // Accept only the last character (if pasted multiple digits)
        if (value.length > 0) {
            e.target.value = value.slice(-1);
            // Automatically focus the next input if it exists
            if (index < inputRefs.current.length - 1) {
                inputRefs.current[index + 1].focus();
            }
        }
    };
    const handleKeyDown = (e, index) => {
        if (e.key === "ArrowLeft" && index > 0) {
            inputRefs.current[index - 1].focus();
        } else if (e.key === "ArrowRight" && index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1].focus();
        } else if (e.key === "Backspace") {
            // If current input has a value, clear it
            if (e.target.value !== "") {
                e.target.value = "";
            } else if (index > 0) {
                // Move to the previous input, clear it, and focus
                inputRefs.current[index - 1].value = "";
                inputRefs.current[index - 1].focus();
            }
            // Prevent the default backspace behavior
            e.preventDefault();
        }
    };

    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", background: "linear-gradient(to bottom right, #7e57c2, #000)", }}>
            <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
                {/* Illustration Section */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div
                        style={{
                            width: "500px",
                            height: "500px",
                            backgroundImage: `url(${verification})`,
                            backgroundSize: "cover",
                            borderRadius: "10px",
                            color: "white"
                        }}
                    ></div>
                </div>

                {/* OTP Form Section */}
                <div
                    style={{
                        backgroundColor: "#ffffff",
                        padding: "7rem 10rem",
                        borderRadius: "15px",
                        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    <h2 style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "1rem", textAlign: "center" }}>OTP Verification</h2>
                    <p style={{ color: "#6B7280", textAlign: "center", marginBottom: "2rem" }}>
                        Enter OTP Code sent to +880**********
                    </p>
                    <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginBottom: "1.5rem" }}>
                        {Array(5)
                            .fill(0)
                            .map((_, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    maxLength="1"
                                    ref={(el) => (inputRefs.current[index] = el)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    onChange={(e) => handleChange(e, index)}
                                    style={{
                                        width: "40px",
                                        height: "50px",
                                        fontSize: "1.5rem",
                                        textAlign: "center",
                                        border: "1px solid #D1D5DB",
                                        borderRadius: "8px",
                                        outline: "none"
                                    }}
                                />
                            ))}
                    </div>
                    <div style={{ textAlign: "center", marginBottom: "1rem" }}>
                        <a href="#" style={{ fontSize: "0.9rem", color: "#6a3267", textDecoration: "none" }}>
                            Resend Code
                        </a>
                    </div>
                    <button
                        className="button"
                    >
                        Verify & Proceed
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OTPVerification;