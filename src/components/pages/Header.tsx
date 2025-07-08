import { Icon } from "@iconify/react/dist/iconify.js"
import { useAuth } from "../auth/AuthProvider"



function Header() {
    const {logout} = useAuth()
  
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
                <p className="text-4xl font-semibold">Welcome, Name</p>
                <p className="text-lg">Email : xxxxxx@gmail.com</p>
              </div>
              </div>
  )
}

export default Header