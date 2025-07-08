import React from 'react';
import { TextField } from '@mui/material';
import DatePickerInput from '../fromComp/DatePickrInput';
import { Icon } from '@iconify/react';

const SignUp: React.FC = () => {
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
              {/* Sign Up Text */}
              <div className="flex flex-col gap-1">
                <p className="text-3xl font-semibold">Sign up</p>
                <p className="text-gray-500">Sign up to enjoy the features of HD</p>
              </div>

              {/* Form Fields */}
              <div className="w-full h-full flex flex-col gap-4">
                <TextField id="name" label="Your Name" variant="outlined" size="small" />
                <div className="w-full">
                  <DatePickerInput />
                </div>
                <TextField id="email" label="Email" variant="outlined" size="small" />

                <button className="text-lg bg-blue-700 text-white font-semibold p-1.5 w-full rounded-sm">
                  Get OTP
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
