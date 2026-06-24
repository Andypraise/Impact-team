import { useState } from "react";
import LogoImage from "../../assets/WhatsApp_Image_2026-06-22_at_8.46.43_AM-removebg-preview-removebg-preview.png"
const steps = [
{ id: 1, label: "Personal info" },
{ id: 2, label: "Otp verification" },
{ id: 3, label: "Nin verification" },
{ id: 4, label: "Face verification" },
];

function NinVerification({ onNext, onBack }) {
const [nin, setNin] = useState("");
const currentStep = 3;

const handleSubmit = (e) => {
e.preventDefault();
if (nin.length === 11) onNext(nin);
};

const formatNin = (value) => {
// Format as 000 000 000 000
const cleaned = value.replace(/\s/g, "").replace(/\D/g, "").slice(0, 11);
return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1 $2 $3 $4");
};

return (
<div className="min-h-screen bg-linear-to-b lg:bg-linear-to-r from-white via-blue-45 to-blue-600 flex items-center px-4 sm:px-0">
<div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 lg:py-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 w-full">
{/* Left Side - Text */}
<div className="flex flex-col justify-center space-y-8 items-center lg:items-start text-center lg:text-left">
{/* Logo */}
<div className="flex items-center gap-2">
<img src={LogoImage} alt="" className="w-50" />
</div>

      {/* Headline */}
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

      {/* Progress dots */}
      <div className="flex gap-2 pt-4">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full ${
              i <= 2 ? "w-8 bg-blue-800" : "w-4 bg-blue-200"
            }`}
          />
        ))}
      </div>

      {/* Next button */}
      <button className="bg-blue-800 hover:bg-blue-900 text-white font-semibold px-12 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all w-fit">
        Next
      </button>
    </div>

    {/* Right Side - NIN Card */}
    <div className="flex items-center justify-center">
      <div className="border border-amber-50 rounded-3xl p-5 sm:p-6 lg:p-8 w-full max-w-md">
        {/* Stepper */}
        <div className="mb-8">
          <p className="text-white text-lg sm:text-xl font-semibold text-center mb-6">
            Account Setup
          </p>
          <div className="flex justify-between items-center relative">
            <div className="absolute top-2 left-0 right-0 h-0.5 bg-white/20"></div>
            {steps.map((s) => (
              <div key={s.id} className="flex flex-col items-center z-10">
                <div
                  className={`w-3 h-3 rounded-full border-2 ${
                    s.id <= currentStep
                      ? "bg-blue-800 border-blue-800 "
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

        {/* NIN Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-white/90 text-sm font-medium block mb-2">
              Enter NIN
            </label>
            <input
              type="text"
              placeholder="000 000 000 000"
              value={nin}
              onChange={(e) => setNin(formatNin(e.target.value))}
              maxLength="14"
              className="w-full px-4 py-3 rounded-xl bg-white/20 border-white/30 text-white placeholder-white/60 text-center tracking-widest text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm"
            />
            <p className="text-white/60 text-xs sm:text-sm mt-2">
              Enter your 11-digit National Identification Number
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            {onBack && (
              <button
                type="button"
                onClick={onBack}
                className="flex-1 border-2 border-white text-white font-semibold py-3 rounded-xl hover:bg-white/10 transition-all"
              >
                Back
              </button>
            )}
            <div className="w-full text-center">
              <button
                type="submit"
                disabled={nin.replace(/\s/g, "").length !== 11}
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

export default NinVerification;
