import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";

import Login from "./page/Login/Login";
import Register from "./page/Register/Register";
import OtpVerification from "./page/Otp/OtpVerification";
import NinVerification from "./page/NinVerification/NinVerification";
import FaceVerification from "./page/FaceVerification/FaceVerification";
import ForgotPassword from "./page/ForgotPassword/ForgotPassword";
import Footer from "./components/Footer/Footer";

function AppRoutes() {
  const navigate = useNavigate();

  // Store all signup data here
  const [userData, setUserData] = useState({
    name: "",
    username: "",
    password: "",
    email: "example@com",
    otp: "",
    nin: "",
    faceImage: null
  });

  const updateData = (newData) => {
    setUserData(prev => ({ ...prev, ...newData }));
  };

  return (
    <Routes>
      <Route path="/" element={
        <Register onNext={(data) => {
          updateData(data);
          navigate('/otpverification');
        }} />
      } />
      
      <Route path="/login" element={<Login />} />
      
      <Route path="/otpverification" element={
        <OtpVerification
          email={userData.email}
          onNext={(code) => {
            console.log("Got OTP in App:", code);
            updateData({ otp: code });
            navigate('/ninverification'); // <-- must match route below
          }}
          onBack={() => navigate('/')}
        />
      } />
      
      <Route path="/ninverification" element={
        <NinVerification
          onNext={(nin) => {
            updateData({ nin });
            navigate('/faceverification');
          }}
          onBack={() => navigate('/otpverification')}
        />
      } />
      
      <Route path="/faceverification" element={
        <FaceVerification
          onComplete={() => {
            console.log("Final data:", userData);
            // await axios.post('/api/signup', userData)
            navigate('/complete');
          }}
          onBack={() => navigate('/ninverification')}
        />
      } />
      
      <Route path="/complete" element={<div className="text-center text-3xl text-white mt-20">Signup Complete!</div>} />
      <Route path="/forgotpassword" element={<ForgotPassword/>}/>
       
    </Routes>
  
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
      <Footer/>
    </BrowserRouter>
    
  );
}