import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// MUI
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
// Firebase
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";

// import { Link } from "react-router-dom";

import { useFormik } from "formik";
import * as yup from "yup";
import { useState } from "react";

export default function Signup() {
  const navigate = useNavigate();
  //   const [errorMsg, setErrorMsg] = useState("");
  //   const [successMsg, setSuccessMsg] = useState("");

  const {
    values,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    resetForm,
  } = useFormik({
    initialValues: {
      fullName: "",
      contactNumber: "",
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      name: yup
        .string("Enter your name")
        .required("Name is required")
        .min(3, "Please enter more then 3 characters ")
        .max(20, "Please enter within 20 characters "),
      email: yup
        .string("Enter your email")
        .email("Enter valid email")
        .required("Email is required")
        .min(3, "Please enter more then 3 characters ")
        .max(32, "Please enter within 32 characters "),
      password: yup
        .string("Enter your Password") //.password()
        .required("Password is required")
        .min(6, "Please enter more then 6 characters ")
        .max(64, "Please enter within 64 characters "),
      contactNumber: yup
        .number("Enter your Phone Number")
        .required("Phone Number is required")
    //     .min(10, "Please enter more then 10 characters ")
    //     .max(15, "Please enter within 15 characters "),
    }),
    onSubmit: async (values) => {
		console.log("values",values)
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );
        // Signed in
        toast(`Account created successfully!`);
        console.log(userCredential);
        resetForm();

        await addDoc(collection(db, "users"), {
          fullName: values.fullName,
          email: values.email,
          contactNumber: values.contactNumber,
          password: values.password,
          cart: [],
          uid: userCredential.user.uid,
        });
        navigate("/products");
      } catch (err) {
        console.log(err.message);
        // toast(`${err.message}`);

        if (err.message == "Firebase:Error (auth/invalid-email).") {
          toast(`Email or Password is incorrect`);
        } else if (
          err.message == "Firebase:Error (auth/email-already-in-use)."
        ) {
          toast(`User already exists`);
        } else {
          toast(`Wrong Email or Password`);
        }
      }
    },
  });
  return (
    <>
      <ToastContainer />
      <div
      // 		   styles={{.container {
      //   /* display: flex;
      //   align-items: center;
      //   justify-content: center;
      //   flex-direction: column; */
      //   border: 2px solid red;
      //   height: 90vh;
      //   width: 400px;
      // }}}
      >
        <h1
          style={{
            display: "block",
            fontFamily: "Outfit",
            fontStyle: "normal",
            fontWeight: "600",
            fontSize: "40px",
            color: "#171717",
          }}
        >
          SAYLANI WELFARE
        </h1>
        <h2>ONLINE DISCOUNT STORE</h2>
        <form
          style={{ display: "flex", flexDirection: " column" }}
          onSubmit={handleSubmit}
        >
          <TextField
            sx={{
              color: "#61B846",
              //   backgroundColor: "#EFEFEF",
            //   marginBottom: "32px",
            //   marginTop: "52px",
              width: { xs: "320px", md: "420px" },
            }}
            autoComplete="on"
            name="fullName"
            margin="dense"
            variant="outlined"
            type="text"
            // placeholder="Enter your email"
            id="fullName"
            label="Full Number"
            value={values.fullName}
            onBlur={handleBlur}
            onChange={handleChange}
            error={touched.fullName && Boolean(errors.fullName)}
            helperText={touched.fullName && errors.fullName}
          />
          <TextField
            sx={{
              color: "#61B846",
              //   backgroundColor: "#EFEFEF",
            //   marginBottom: "32px",
            //   marginTop: "52px",
              width: { xs: "320px", md: "420px" },
            }}
            autoComplete="on"
            name="email"
            margin="dense"
            variant="outlined"
            type="email"
            // placeholder="Enter your email"
            id="email"
            label="Email"
            value={values.email}
            onBlur={handleBlur}
            onChange={handleChange}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
          />
          <TextField
            sx={{
              backgroundColor: "transparent",
              width: { xs: "320px", md: "420px" },
            }}
            autoComplete="on"
            name="password"
            margin="dense"
            variant="filled"
            type="password"
            // placeholder="Enter your password"
            id="password"
            label="Password"
            value={values.password}
            onBlur={handleBlur}
            onChange={handleChange}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
          />
          <TextField
            sx={{
              backgroundColor: "transparent",
              width: { xs: "320px", md: "420px" },
            }}
            autoComplete="on"
            name="contactNumber"
            margin="dense"
            variant="filled"
            type="tel"
            // placeholder="Enter your Number"
            id="contactNumber"
            label="Contact Number"
            value={values.contactNumber}
            onBlur={handleBlur}
            onChange={handleChange}
            error={touched.contactNumber && Boolean(errors.contactNumber)}
            helperText={touched.contactNumber && errors.contactNumber}
          />

          <Button
            type="submit"
            className="submitBtn"
            sx={{ mb: "30px", py: "15px", width: { xs: "320px", md: "420px" } }}
            variant="contained"
            // onClick={handleSubmit}
          >
            Sign Up
          </Button>
          {/* <Button
			  variant="outlined"
			  sx={{ mb: "23px", py: "15px", width: { xs: "320px", md: "420px" } }}
			  startIcon={<FcGoogle />}
			>
			  Login with Google
			</Button> */}
        </form>
        <div style={{ textAlign: "center" }}>
          <span>Already have an account?</span>
          <button
            style={{
              paddingLeft: "5px",
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
              fontWeight: "600",
            }}
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      </div>
    </>
  );
}
