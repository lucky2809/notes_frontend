import { Icon } from "@iconify/react/dist/iconify.js"
import { useAuth } from "../auth/AuthProvider"
import { useMemo } from "react";



function Header() {
  const { logout } = useAuth()

  type UserData = { name: string; email: string };
  const userStr = localStorage.getItem("user_data");

  const useUserData = () => {
    return useMemo(() => {

      if (userStr) {
        try {
          const parsed = JSON.parse(userStr);
          if (
            typeof parsed?.name === "string" &&
            typeof parsed?.email === "string"
          ) {
            return parsed as UserData;
          } else {
            console.warn("Invalid user data format.");
          }
        } catch (err) {
          console.error("Invalid JSON in localStorage:", err);
        }
      }

      return null;
    }, [userStr]);
  };

  const userData = useUserData()
  return (
    <div className="flex flex-col gap-10">
      <div className="flex justify-between items-center">
        <div className=" w-full text-2xl flex items-center gap-2">
          <Icon width={40} className="text-blue-700" icon="line-md:sun-rising-twotone-loop" />
          Dashboard
        </div>
        <div className='w-full flex justify-end'>
          <button onClick={logout} className="text-blue-700 border-b border-blue-700 hover:cursor-pointer">Sign Out</button>
        </div>
      </div>

      {/* User Info */}
      <div className="px-3 py-5 flex flex-col rounded-sm gap-4 shadow-sm shadow-gray-300">
        <p className="text-4xl font-semibold">Welcome, {userData?.name || "User"}</p>
        <p className="text-lg">Email : {userData?.email || "NA"}</p>
      </div>
    </div>
  )
}

export default Header