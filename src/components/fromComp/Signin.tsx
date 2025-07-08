import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface SendOtpResponse {
  message: string;
}

interface VerifyOtpResponse {
  token: string;
}


const Signin: React.FC = () => {
  const navigate = useNavigate()
  const [message, setMessage] = useState("")
  const [email, setEmail] = useState("")
  const [otp, setOTP] = useState("")


  const [step, setStep] = useState("")


  const sendOtp = async (email :string): Promise<void> => {
    if(!email) {
      alert("enter email first")
    }
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/send-email-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data: SendOtpResponse = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to send OTP");
    }

    setMessage(data.message);
    setStep("otp");
  } catch (error: unknown) {
    if (error instanceof Error) {
      setMessage(error.message);
    } else {
      setMessage("Failed to send OTP");
    }
  }
};

const verifyOtp = async (): Promise<void> => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/verify-email-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, otp }),
    });

    const data: VerifyOtpResponse = await response.json();

    if (!response.ok) {
      throw new Error("Invalid or expired OTP");
    }

    localStorage.setItem("access_token", data.token);
    localStorage.setItem("user_email", email);

    setMessage("OTP Verified. You are logged in.");
    navigate("/")
  } catch (error: unknown) {
    if (error instanceof Error) {
      setMessage(error.message);
    } else {
      setMessage("Failed to verify OTP");
    }
  }
};



  return (
    <div>
      <div className="p-2 py-5 flex h-screen">
        {/* Left Section */}
        <div className="w-[40%] max-lg:w-full h-screen max-md:flex max-md:flex-col max-md:gap-15 overflow-hidden">
          <div className="px-3 text-2xl max-md:justify-center flex items-center gap-2">
            <Icon
              width={40}
              className="text-blue-700"
              icon="line-md:sun-rising-twotone-loop"
            />
            HD
          </div>

          <div className="w-full flex flex-col justify-center max-md:justify-start max-md:text-center align-middle px-25 max-xl:px-5 max-lg:px-20 max-md:px-3  h-full max-md:h-fit">
            <div className="flex flex-col gap-4">
              {/* Heading */}
              <div className="flex flex-col gap-1">
                <p className="text-3xl font-semibold">Sign in</p>
                <p className="text-gray-500">Sign in to enjoy the features of HD</p>
              </div>

              {/* Form Fields */}
              <div className="w-full h-full flex flex-col gap-4">
                <TextField
                  id="email"
                  label="Email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                  }}
                  variant="outlined"
                  size="small"
                />

                <TextField
                  id="otp"
                  label="OTP"
                  value={otp}
                  onChange={(e) => {
                    setOTP(e.target.value)
                  }}
                  autoFocus={true}
                  variant="outlined"
                  size="small"
                />

                <p onClick={() => sendOtp(email)} className="text-blue-700 border-b border-blue-700 w-fit cursor-pointer">
                  Resend OTP
                </p>

                <div className="flex gap-2 items-center">
                  <input type="checkbox" id="keep-logged-in" />
                  <label htmlFor="keep-logged-in">Keep me logged in</label>
                </div>

                <button onClick={verifyOtp} className="text-lg bg-blue-700 text-white font-semibold p-1.5 w-full rounded-sm">
                  Sign in
                </button>

                <div className="text-center text-gray-500">
                  <p>
                    Need an account?
                    <span className="text-blue-700 border-b border-blue-700 ml-1">
                      <a href="/signup">Create one</a>
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-[60%] max-lg:hidden">
          <img
            src="pic-1.jpg"
            className="h-full w-full rounded-xl object-cover"
            alt="Sign in visual"
          />
        </div>
      </div>
    </div>
  );
};

export default Signin;
