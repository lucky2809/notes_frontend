import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import type { User } from '../store/userStore';
import useUserStore from '../store/userStore';
import GoogleLogin from './GoogleAuth';
import { useAuth } from '../auth/AuthProvider';
import { toast } from 'react-toastify';

interface SendOtpResponse {
  message: string;
}

interface VerifyOtpResponse {
  token: string;
}

type ErrorMessageProps = {
  error: Record<string, string>;
  field: string;
};

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error, field }) => {
  return error[field] ? <p className="text-red-500 m-0 p-0">{error[field]}</p> : null;
};


const Signin: React.FC = () => {
  const { user }: {
    user: User | null,
  } = useUserStore();
  const navigate = useNavigate()
  const {login} = useAuth()
  const [email, setEmail] = useState(localStorage.getItem("user_email") || user?.email || "")
  const [otp, setOTP] = useState("")
  const [error, setError] = useState({})




  const sendOtp = async (email: string): Promise<void> => {
    if (!email) {
      setError(prev => ({ ...prev, email: "Email is required" }))
      return
    }  else {
            setError(prev => ({ ...prev, email: "" }))
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
        // throw new Error(data.message || "Failed to send OTP");
        toast.error(data.message || "Failed to send OTP")
      }
        toast.success("OTP sent")

    } catch (error: unknown) {
      if (error instanceof Error) {
        // setMessage(error.message);
        console.error(error.message)
      }
    }
  };

  const verifyOtp = async (): Promise<void> => {
     if (!email) {
      setError(prev => ({ ...prev, email: "Email is required" }))
      // return
    }  else {
            setError(prev => ({ ...prev, email: "" }))
        }
    if(!otp) {
      setError(prev => ({...prev, otp: "Enter OTP"}))
      return
    } else {
      setError(prev => ({...prev, otp: ""}))
    }
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
        // throw new Error("Invalid or expired OTP");
        toast.error("Invalid or expired OTP")
      }

      localStorage.setItem("access_token", data.token);
      // localStorage.setItem("user_email", email);
      await login(data.token)


      console.log("OTP Verified. You are logged in.");
      toast.success("Login in Succesfull")
      navigate("/")
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("Failed to verify OTP");
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
            NOTES APP
          </div>

          <div className="w-full flex flex-col justify-center max-md:justify-start max-md:text-center align-middle px-25 max-xl:px-5 max-lg:px-20 max-md:px-3  h-full max-md:h-fit">
            <div className="flex flex-col gap-4">
              {/* Heading */}
              <div className="flex flex-col gap-1">
                <p className="text-3xl font-semibold">Sign in</p>
                <p className="text-gray-500">Sign in to enjoy the features of NOTES APP</p>
              </div>

              {/* Form Fields */}
              <div className={`w-full h-full flex flex-col ${Object.keys(error).length ? "gap-1" : "gap-4"}`}>
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
                <ErrorMessage error={error} field={"email"} />
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
                <ErrorMessage error={error} field={"otp"} />
                <p onClick={() => sendOtp(email)} className="text-blue-700 border-b border-blue-700 w-fit cursor-pointer">
                  Resend OTP
                </p>

                <div className="flex gap-2 items-center">
                  <input type="checkbox" id="keep-logged-in" />
                  <label htmlFor="keep-logged-in">Keep me logged in</label>
                </div>

               

                <div className="text-center text-gray-500 flex flex-col gap-3 w-full">
                <button onClick={verifyOtp} className="text-lg bg-blue-700 text-white font-semibold p-1.5 w-full rounded-sm">
                  Sign in With OTP
                </button>

                <GoogleLogin />
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
