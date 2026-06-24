import { useState } from "react";
import { Link } from "react-router-dom";
 import LogoImage from "../../assets/WhatsApp_Image_2026-06-22_at_8.46.43_AM-removebg-preview-removebg-preview.png"
function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Reset link sent to:", email);
    setSubmitted(true);
    // await axios.post('/api/forgot-password', { email })
  };

  return (
    <div className="min-h-screen bg-linear-to-b lg:bg-linear-to-r font-inter from-white via-blue-45 to-blue-600 flex items-center relative overflow-hidden">
      {/* Cloud circles at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-blue-400/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl -translate-x-1/2"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-400/40 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12 grid lg:grid-cols-2 gap-12 w-full relative z-10">
        {/* Left Side */}
        <div className="flex flex-col justify-center space-y-8">
          <div className="flex items-center gap-2">
         <img src={LogoImage} alt=""  className="w-50"/>
          </div>

          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Reset Your
            <br />
            Password
            <br />
            Securely.
          </h1>

          <div className="flex gap-2 pt-4">
            <div className="w-8 h-1.5 bg-blue-800 rounded-full"></div>
            <div className="w-4 h-1.5 bg-blue-200 rounded-full"></div>
            <div className="w-4 h-1.5 bg-blue-200 rounded-full"></div>
            <div className="w-4 h-1.5 bg-blue-200 rounded-full"></div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="flex items-center justify-center">
          <div className="border border-white/20 backdrop-blur-md rounded-3xl p-8 w-full max-w-md bg-white/10">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h2 className="text-white text-2xl font-semibold mb-2">
                    Forgot Password
                  </h2>
                  <p className="text-white/70 text-sm">
                    Enter your email and we’ll send you a reset link
                  </p>
                </div>

                <div>
                  <label className="text-white text-sm font-medium mb-2 block">
                    Email address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full bg-white/10 border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-800 hover:bg-blue-900 text-white cursor-pointer font-semibold py-3 rounded-xl transition-all shadow-lg"
                >
                  Send Reset Link
                </button>

                <p className="text-center text-white/70 text-sm">
                  Remember password?{" "}
                  <Link
                    to="/login"
                    className="text-blue-200 hover:text-white font-medium"
                  >
                    Back to Login
                  </Link>
                </p>
              </form>
            ) : (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                  <svg
                    className="w-8 h-8 text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h2 className="text-white text-xl font-semibold">
                  Check your email
                </h2>
                <p className="text-white/70 text-sm">
                  If an account exists for{" "}
                  <span className="font-medium">{email}</span>, we sent a
                  password reset link.
                </p>
                <Link
                  to="/login"
                  className="inline-block mt-4 text-blue-200 hover:text-white font-medium text-sm"
                >
                  Back to Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default ForgotPassword;
