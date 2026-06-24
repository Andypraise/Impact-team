import { useState, useRef } from "react";
import LogoImage from "../../assets/WhatsApp_Image_2026-06-22_at_8.46.43_AM-removebg-preview-removebg-preview.png"

const steps = [
  { id: 1, label: "Personal info" },
  { id: 2, label: "Otp verification" },
  { id: 3, label: "Nin verification" },
  { id: 4, label: "Face verification" },
];

function FaceVerification({  onComplete, onBack }) {
  const [captured, setCaptured] = useState(false);
  const videoRef = useRef(null);
  const currentStep = 4;

  const startCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  };

  const capturePhoto = () => {
    setCaptured(true);
    // Stop camera
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    }
  };

 return (
  <div className="min-h-screen bg-linear-to-b lg:bg-linear-to-r from-white via-blue-40 to-blue-600 flex items-center px-4 sm:px-0">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 lg:py-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 w-full">
      {/* Left Side */}
      <div className="flex flex-col justify-center space-y-8 items-center lg:items-start text-center lg:text-left">
        <div className="flex items-center gap-2">
         <img src={LogoImage} alt="" className="w-50" />
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
            <div key={i} className="h-1.5 w-8 bg-blue-800 rounded-full" />
          ))}
        </div>

        <button className="bg-blue-800 hover:bg-blue-900 text-white font-semibold px-12 py-3.5 rounded-xl shadow-lg w-fit">
          Next
        </button>
      </div>

      {/* Right Side - Glass Face Card */}
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
                  <div className="w-3 h-3 rounded-full bg-blue-800 border-blue-800 border-2"></div>

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

          {/* Face Capture */}
          <div className="space-y-6 text-center">
            <p className="text-white font-semibold">
              Proceed with Facial Verification
            </p>

            <div className="relative w-44 h-44 sm:w-56 sm:h-56 mx-auto">
              {!captured ? (
                <>
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    onLoadedMetadata={startCamera}
                    className="w-full h-full object-cover rounded-full"
                  />

                  <div className="absolute inset-0 border-4 border-white/60 rounded-full pointer-events-none"></div>
                </>
              ) : (
                <div className="w-full h-full bg-blue-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-16 h-16 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              )}

              <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white rounded-tl-3xl pointer-events-none"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-white rounded-tr-3xl pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-white rounded-bl-3xl pointer-events-none"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white rounded-br-3xl pointer-events-none"></div>
            </div>

            <p className="text-white/70 text-sm">
              Make sure you're in a well-lit area
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={onBack}
                className="flex-1 border-2 border-white text-white font-semibold py-3 rounded-xl hover:bg-white/10 transition-all"
              >
                Back
              </button>

              <button
                onClick={captured ? onComplete : capturePhoto}
                className="flex-1 bg-blue-800 hover:bg-blue-900 text-white font-semibold py-3 rounded-xl transition-all shadow-lg"
              >
                {captured ? "Complete" : "Capture"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
}
export default FaceVerification;
