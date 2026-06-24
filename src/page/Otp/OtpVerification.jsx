import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import LogoImage from "../../assets/WhatsApp_Image_2026-06-22_at_8.46.43_AM-removebg-preview-removebg-preview.png"
const steps = [
  { id: 1, label: "Personal info" },
  { id: 2, label: "Otp verification" },
  { id: 3, label: "Nin verification" },
  { id: 4, label: "Face verification" },
];

function OtpVerification({ email = "example@com", onNext, onBack }) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(0);
  const inputsRef = useRef([]);
  const currentStep = 2;

  // Timer for resend
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(timer - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return; // only digits

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Backspace to previous input
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleResend = () => {
    setTimer(60); // 60 seconds cooldown
    setOtp(["", "", ""]);
    inputsRef.current[0].focus();
    console.log("Resend OTP");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length === 6) onNext(code);
  };

  const isComplete = otp.every((digit) => digit !== "");

  return (
    <div className="min-h-screen bg-linear-to-b lg:bg-linear-to-r from-white via-blue-45 to-blue-600 flex items-center px-4 sm:px-0">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 lg:py-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 w-full">
        {/* Left Side */}
        <div className="flex flex-col justify-center space-y-8 items-center lg:items-start text-center lg:text-left">
          <div className="flex items-center gap-2">
           <img src={LogoImage} alt="" className="w-50"/>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Turning
            <br />
            Donations
            <br />
            Into
            <br />
            Guaranteed
            <br />
            Impact.
          </h1>

          <div className="flex gap-2 pt-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full ${
                  i <= 1 ? "w-8 bg-blue-800" : "w-4 bg-blue-200"
                }`}
              />
            ))}
          </div>

          <Link
            to="/login"
            className="bg-blue-800 hover:bg-blue-900 text-white font-semibold px-12 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all w-fit"
          >
            Next
          </Link>
        </div>

        {/* Right Side - Glass OTP Card */}
        <div className="flex items-center justify-center">
          <div className="border border-amber-50 rounded-3xl p-5 sm:p-6 lg:p-8 w-full max-w-md">
            {/* Stepper */}
            <div className="mb-8">
              <p className="text-white text-sm font-semibold text-center mb-6">
                Account Setup
              </p>

              <div className="flex justify-between items-center relative">
                <div className="absolute top-2 left-0 right-0 h-0.5 bg-white/20"></div>

                {steps.map((s) => (
                  <div key={s.id} className="flex flex-col items-center z-10">
                    <div
                      className={`w-3 h-3 rounded-full border-2 ${
                        s.id <= currentStep
                          ? "bg-blue-800 border-blue-800"
                          : "bg-white border-white/40"
                      }`}
                    ></div>

                    <p
                      className={`mt-2 whitespace-nowrap text-[10px] sm:text-[12px] ${
                        s.id === currentStep
                          ? "text-blue-800 font-normal"
                          : "text-white/60"
                      }`}
                    >
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* OTP Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <p className="text-white font-semibold mb-1">
                  Enter Otp verification
                </p>

                <p className="text-white/70 text-sm mb-6">
                  check your email <span className="font-medium">{email}</span>{" "}
                  for code, can't find it
                  <br />
                  check spam box
                </p>

                {/* 6 OTP boxes */}
                <div className="flex gap-2 sm:gap-3 justify-center mb-4">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (inputsRef.current[index] = el)}
                      type="text"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleChange(e.target.value, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/20 border-white/30 text-white text-center text-lg sm:text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transparent backdrop-blur-sm"
                    />
                  ))}
                </div>

                {/* Timer + Resend */}
                <div className="flex justify-end items-center text-sm mb-6">
                  <span className="text-white/70 mr-2">
                    {String(Math.floor(timer / 60)).padStart(2, "0")}:
                    {String(timer % 60).padStart(2, "0")}
                  </span>

                  <button
                    type="button"
                    onClick={handleResend}
                    disabled={timer > 0}
                    className="text-blue-200 hover:text-white disabled:text-white/40 disabled:cursor-not-allowed font-medium"
                  >
                    Resend
                  </button>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                {onBack && (
                  <button
                    type="button"
                    onClick={onBack}
                    className="flex-1 border-2 border-white text-white font-semibold py-3 rounded-xl cursor-pointer hover:bg-white/10 transition-all"
                  >
                    Back
                  </button>
                )}

                <div className="w-full text-center">
                  <button
                    type="submit"
                    disabled={!isComplete}
                    className="w-full sm:w-50 bg-blue-800 hover:bg-blue-900 cursor-pointer text-white font-semibold py-3 rounded-xl transition-all shadow-lg"
                  >
                    Continue
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default OtpVerification;
