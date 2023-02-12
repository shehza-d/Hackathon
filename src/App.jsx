import "./App.css";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
// Splash screen
import Welcome from "./pages/authPages/Welcome";
// AuthPage
import Login from "./pages/authPages/Login";
import Signup from "./pages/authPages/Signup";
// Store Pages
import AllProducts from "./pages/storePages/AllProducts";
// import Courses from "./ ";
// import Courses from "./ ";
// Admin Pages
// import Courses from "./ ";
// import Courses from "./ ";
// import Courses from "./ ";
// import Courses from "./ ";

// import { auth } from "./firebase";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
 
export default function App() {

  const [isLogin, setIsLogin] = useState(true);

  // const auth = getAuth();
  // useEffect(() => {
  //   const Unsubscribe =    onAuthStateChanged(auth, (user) => {
  //     console.log(user);
  //     // const uid = user.uid;
  //     if (user) setIsLogin(true);
  //     else setIsLogin(false);
  //   });
  // // return () => Unsubscribe();
  // }, []);

  return (
    <div className="App">
      {isLogin ? (
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* user store pages */}
          <Route path="/products" element={<AllProducts />} />

          {/* <Route path="attendance" element={<Attendance />} />
          <Route path="courses" element={<Courses />} />
          <Route path="students" element={<Students />} /> */}
          {/* <Route path="profile" element={<Profile />} /> */}

          <Route path="*" element={<Navigate to="/" replace={true} />} />
        </Routes>
      ) : (
        <Routes>
          {/* <Route
            path="/login"
            element={<Login isLogin={isLogin} setIsLogin={setIsLogin} />}
          /> */}
          {/* <Route path="signup" element={<Signup />} /> */}
          {/* <Route path="*" element={<Navigate to="/login" replace={true} />} /> */}
        </Routes>
      )}
    </div>
  );
}
