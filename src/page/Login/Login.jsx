import { useState } from "react";
import { Link } from "react-router-dom";
import LogoImage from "../../assets/WhatsApp_Image_2026-06-22_at_8.46.43_AM-removebg-preview-removebg-preview.png"

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login data:", formData);
    // Add your login logic here
  };

  return (
    <div className="min-h-screen bg-linear-to-b lg:bg-linear-to-r from-white via-blue-45 to-blue-600 flex items-center">
      <div className="max-w-6xl mx-auto px-6 py-12 grid lg:grid-cols-2 gap-12 w-full">
        {/* Left Side - Text */}
        <div className="flex flex-col justify-center space-y-8">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img src={LogoImage} alt="" className="w-50"/>
          
          </div>

          {/* Headline */}
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
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
                  i === 0 ? "w-8 bg-blue-800" : "w-4 bg-blue-200"
                }`}
              />
            ))}
          </div>

          {/* Next button */}
          <button className="bg-blue-800 hover:bg-blue-900 text-white font-semibold px-15 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all w-fit">
            Next
          </button>
        </div>

        {/* Right Side - Glass Login Card */}
        <div className="flex items-center justify-center">
          <div className=" border border-amber-50 rounded-3xl p-8 w-full max-w-md ">
            <h2 className="  text-white text-center font-semibold text-lg mb-8 border-b border-amber-50 pb-5">
              Login your account
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label className="text-white/90 text-sm font-medium block mb-2">
                  Enter email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="example@com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-white/20 border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent backdrop-blur-sm"
                />
              </div>

              {/* Password */}
              <div>
                <label className="text-white/90 text-sm font-medium block mb-2">
                  Enter password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-white/20 border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent backdrop-blur-sm"
                />
              </div>

              {/* Remember + Forgot */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-white/90 cursor-pointer">
                  <input
                    type="checkbox"
                    name="remember"
                    checked={formData.remember}
                    onChange={handleChange}
                    className="w-4 h-4 rounded border-white/30 bg-white/20 accent-blue-800"
                  />
                  Remember me
                </label>
                
              {/* Forgot Password */}
                <Link to="/forgotpassword"
                  className="text-blue-800 hover:text-white font-medium"
                >
                  Forgot password
                </Link>
              </div>

              {/* Continue Button */}
              <div className="text-center">
                <button
                  type="submit"
                  disabled={!formData.email || !formData.password}
                  className="w-50  bg-blue-800 hover:bg-blue-900 cursor-pointer text-white font-semibold py-3 rounded-xl transition-all shadow-lg"
                >
                  Continue
                </button>
              </div>
            </form>

            {/* Signup link */}
            <p className="text-center text-white/70 text-sm mt-6">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-blue-800 hover:text-white font-semibold"
              >
                Signup
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
