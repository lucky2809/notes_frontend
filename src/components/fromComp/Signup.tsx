import React, { useState } from 'react';
import { TextField } from '@mui/material';
import DatePickerInput from '../fromComp/DatePickrInput';
import { Icon } from '@iconify/react';
import GoogleLogin from './GoogleAuth';

import useUserStore, { type User } from '../store/userStore';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';


interface SendOtpResponse {
  message: string;
}

// interface VerifyOtpResponse {
//   token: string;
// }
type ErrorMessageProps = {
  error: Record<string, string>;
  field: string;
};

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error, field }) => {
  return error[field] ? <p className="text-red-500 m-0 p-0">{error[field]}</p> : null;
};


const SignUp: React.FC = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [dob, setDob] = useState("")
  const [error, setError] = useState({})


  const { setUser }: {
    setUser: (data: User | null) => void
  } = useUserStore();



  const sendOtp = async (email: string, name: string, dob: string): Promise<void> => {
    if (!name) {
      setError(prev => ({ ...prev, name: "Name is required" }))
      // return
    } else {
      setError(prev => ({ ...prev, name: "" }))
    }
    if (!dob) {
      setError(prev => ({ ...prev, dob: "DOB is required" }))
    } else {
      setError(prev => ({ ...prev, dob: "" }))
    }
    if (!email) {
      setError(prev => ({ ...prev, email: "Email is required" }))
      return
    } else {
      setError(prev => ({ ...prev, email: "" }))
    }


    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/send-email-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, name }),
      });

      const data: SendOtpResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send OTP");
      }

      setUser({ email, name })
      localStorage.setItem("user_email", email);
      navigate("/signin")
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message)
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
            <div className="w-full flex flex-col gap-4">
              {/* Sign Up Text */}
              <div className="flex flex-col gap-1">
                <p className="text-3xl font-semibold">Sign up</p>
                <p className="text-gray-500">Sign up to enjoy the features of HD</p>
              </div>
              <GoogleLogin />
              {/* Form Fields */}
              <div className={`w-full flex flex-col ${Object.keys(error).length ? "gap-1" : "gap-4"}`}>
                <TextField onChange={(e) => {
                  setName(e.target.value)
                }} id="name" label="Your Name" variant="outlined" size="small" />
                <ErrorMessage error={error} field={"name"} />

                <div className="w-full">
                  <DatePickerInput value={dob} setValue={setDob} />
                  <ErrorMessage error={error} field={"dob"} />
                </div>
                <TextField onChange={(e) => {
                  setEmail(e.target.value)
                }} id="email" label="Email" variant="outlined" size="small" />
                <ErrorMessage error={error} field={"email"} />


                <button onClick={() => sendOtp(email, name, dob)} className="text-lg bg-blue-700 text-white font-semibold p-1.5 w-full rounded-sm hover:cursor-pointer">
                  Sign Up
                </button>

                <div className="text-center text-gray-500">
                  <p>
                    Already have an account?
                    <span className="text-blue-700 border-b border-blue-700 ml-1">
                      <a href="/signin">Sign in</a>
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
            alt="Signup Visual"
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
