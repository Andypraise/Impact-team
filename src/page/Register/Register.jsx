import { useState } from "react";
import { Link } from "react-router-dom";


const steps = [
  { id: 1, label: "Personal info" },
  { id: 2, label: "Otp verification" },
  { id: 3, label: "Nin verification" },
  { id: 4, label: "Face verification" },
];

function Register({ onNext }) {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
    agreed: false,
  });
  const [errors, setErrors] = useState({});
  const currentStep = 1;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (formData.password.length < 6)
      newErrors.password = "Password min 6 chars";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords don't match";
    if (!formData.agreed) newErrors.agreed = "You must agree to T&C";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      onNext({
        name: formData.name,
        username: formData.username,
        password: formData.password,
      });
    }
  };

  const isValid =
    formData.name &&
    formData.username &&
    formData.password.length >= 6 &&
    formData.password === formData.confirmPassword &&
    formData.agreed;

 return (

  <div className="min-h-screen bg-linear-to-b lg:bg-linear-to-r from-white via-blue-40 to-blue-800 flex items-center px-4 sm:px-0">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 lg:py-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 w-full">
      {/* Left Side */}
      <div className="flex flex-col justify-center items-center lg:items-start text-center lg:text-left space-y-8">
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
            i === 0 ? "w-8 bg-blue-800" : "w-4 bg-blue-200"
          }`}
        />
      ))}
    </div>

    <button className="bg-blue-800 hover:bg-blue-900 text-white font-semibold px-12 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all w-fit">
      Next
    </button>
  </div>

  {/* Right Side - Glass Signup Card */}
  <div className="flex items-center justify-center">
    <div className="border border-amber-50 rounded-3xl p-5 sm:p-6 lg:p-8 w-full max-w-md shadow-2xl">
      {/* Stepper */}
      <div className="mb-6">
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
                className={`mt-2 whitespace-nowrap text-[10px] sm:text-[12px] text-center ${
                  s.id === currentStep
                    ? "text-blue-500 font-normal"
                    : "text-white/60"
                }`}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <div>
          <label className="text-white/90 text-sm font-medium block mb-2">
            Enter name
          </label>
          <input
            name="name"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm"
          />
          {errors.name && (
            <p className="text-red-300 mt-1">{errors.name}</p>
          )}
        </div>

        {/* Username */}
        <div>
          <label className="text-white/90 text-sm font-medium block mb-2">
            Enter username
          </label>
          <input
            name="username"
            placeholder="John_Doe"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm"
          />
          {errors.username && (
            <p className="text-red-300 mt-1">{errors.username}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="text-white/90 text-sm font-medium block mb-2">
            Enter password
          </label>
          <input
            type="password"
            name="password"
            placeholder="••••••"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm"
          />
          {errors.password && (
            <p className="text-red-300 mt-1">{errors.password}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="text-white/90 text-sm font-medium block mb-2">
            Confirm password
          </label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="••••••"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm"
          />
          {errors.confirmPassword && (
            <p className="text-red-300 mt-1">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {/* T&C Checkbox */}
        <div>
          <label className="flex items-start gap-2 text-sm text-white/80 cursor-pointer">
            <input
              type="checkbox"
              name="agreed"
              checked={formData.agreed}
              onChange={handleChange}
              className="w-4 h-4 rounded border-white/30 bg-white/20 accent-blue-800 mt-0.5"
            />
            <span>
              By signing, you have agreed with our
              <a
                href="#"
                className="text-blue-200 hover:text-white font-medium ml-1"
              >
                Terms & Conditions
              </a>
            </span>
          </label>

          {errors.agreed && (
            <p className="text-red-300 mt-1">{errors.agreed}</p>
          )}
        </div>

        {/* Continue Button */}
        <div className="text-center">
          <button
            type="submit"
            disabled={!isValid}
            className="w-full bg-blue-800 hover:bg-blue-900 cursor-pointer text-white font-semibold py-3 rounded-xl transition-all shadow-lg"
          >
            Continue
          </button>
        </div>
      </form>

      {/* Login link */}
      <p className="text-center text-white/60 text-xs sm:text-sm mt-4">
        Already have an account?
        <Link
          to="/login"
          className="text-blue-800 hover:text-white font-semibold ml-1"
        >
          Signin
        </Link>
      </p>
    </div>
  </div>
</div>


  </div>
);

}
export default Register;
