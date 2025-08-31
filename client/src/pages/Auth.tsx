import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

// Login and Signup Logic both..

const Auth = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("Auth must be used inside AppContextProvider");
  }

  const { user, setUser, backendUrl, showLogin, setShowLogin } = context;

  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState<string>("");
  const [otp, setOtp] = useState(""); //otp value
  const [showOtp, setShowOtp] = useState(false); //otp box
  const [loading, setLoading] = useState(false);
  const [resend, setResend] = useState();

  const navigate = useNavigate();

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!showOtp) {
      // if condition got true..

      try {
        setLoading(true); // loading is true..

        const url =
          state === "Signup" ? `${backendUrl}/register` : `${backendUrl}/login`;

        const body = state === "Signup" ? { name, email, dob } : { email };

        // send otp..

        const { data } = await axios.post(url, body);

        toast.success(data.message || "OTP sent to email!");
        setShowOtp(true);
        setLoading(false);
      } catch (err: any) {
        console.error(err);
        toast.error(err.response?.data?.message || "Failed to send OTP");
      }
    } else {
      //  Verify OTP

      try {
        setLoading(true);

        const { data } = await axios.post(`${backendUrl}/verify-otp`, {
          email,
          code: otp,
        });

        if (data.success) {
          toast.success(`${state} Successful! 🎉`);

          // Save user & token
          setUser(data.user);
          localStorage.setItem("token", data.token);
          setShowLogin(false);
          navigate("/dashboard");

          // reset
          setShowOtp(false);
          setOtp("");
        }
      } catch (err: any) {
        console.error(err);
        toast.error(err.response?.data?.message || "Invalid OTP");
      }
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      setLoading(true);

      const { data } = await axios.post(`${backendUrl}/resend-otp`, { email });

      toast.success(data.message || "OTP resent to email!");
    } catch (error) {
      toast.error("Failed to resent OTP");
    }
    setLoading(false);
  };

  return (
    <div className="fixed flex justify-center items-center bg-black/30 backdrop-blur-sm  top-0 bottom-0 left-0 right-0 z-10">
      <motion.form
        onSubmit={onSubmitHandler}
        initial={{ opacity: 0.2, y: 70 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="relative bg-white border border-violet-600 rounded-xl p-10 text-slate-500"
      >
        <h1 className="text-center text-2xl text-neutral-700 font-medium ">
          {state}
        </h1>

        {state === "Login" ? (
          <p className="text-sm mt-2">
            Welcome back! Please log in to continue...
          </p>
        ) : (
          <p className="text-sm mt-2 px-10">
            {" "}
            Create an account to continue...
          </p>
        )}

        {state !== "Login" && (
          <div className=" border flex items-center px-6 py-3 mt-5 gap-2 rounded-full ">
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              className="outline-none text-sm"
              placeholder="Full name"
              required
            ></input>
          </div>
        )}

        <div className=" border flex items-center px-6 py-4 mt-5 gap-2 rounded-full ">
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            className="outline-none text-sm"
            placeholder="EmailId"
            required
          ></input>
        </div>

        <div className="border flex items-center px-6 py-4 mt-5 gap-2 rounded-full">
          <input
            className="outline-none text-sm"
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            placeholder="Date of Birth"
            required
          ></input>
        </div>

        {showOtp && (
          <>
            <div className="border flex items-center px-6 py-4 mt-5 gap-2 rounded-full">
              <input
                className="outline-none text-sm w-full"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                required
              />
            </div>

            <p
              onClick={handleResendOtp}
              className="text-sm text-blue-600 mt-2 cursor-pointer text-center hover:underline"
            >
              Resend OTP
            </p>
          </>
        )}

        <div className="flex items-center gap-2 my-4">
          <div className="flex-1 h-px bg-gray-300"></div>
          <p className="text-sm text-gray-500">OR</p>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        <div className="mt-5 flex justify-center">
          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              try {
                const token = credentialResponse.credential; // Google ID Token
                if (!token) return;

                // Send token to backend
                const { data } = await axios.post(
                  `${backendUrl}/verify-google`,
                  { token }
                );

                if (data.success) {
                  toast.success(
                    state === "Login"
                      ? "Google Login Successful 🎉"
                      : "Google Signup Successful 🎉"
                  );
                  setUser(data.user);
                  localStorage.setItem("token", data.token);
                  setShowLogin(false);
                  navigate("/dashboard");
                }
              } catch (err: any) {
                toast.error(
                  err.response?.data?.message || "Google Login Failed"
                );
              }
            }}
            onError={() => {
              toast.error("Google Sign In Failed");
            }}
            text={state === "Login" ? "signin_with" : "signup_with"}
          />
        </div>

        <button
          type="submit"
          disabled={loading} // disable while loading
          className={`bg-blue-600 w-full text-white py-3 rounded-full mt-4 flex justify-center items-center ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : state === "Login" ? (
            "Login"
          ) : (
            "Create account"
          )}
        </button>

        {state === "Login" ? (
          <p className="text-center mt-2">
            Don't have an account?{" "}
            <span
              className="text-blue-600 hover:underline cursor-pointer"
              onClick={() => setState("Signup")}
            >
              Signup
            </span>
          </p>
        ) : (
          <p className="text-center mt-2">
            Already have an account?{" "}
            <span
              className="text-blue-600 hover:underline cursor-pointer"
              onClick={() => setState("Login")}
            >
              Login
            </span>
          </p>
        )}
      </motion.form>
    </div>
  );
};

export default Auth;
