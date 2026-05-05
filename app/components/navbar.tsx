
export const Navbar = () => {
  return (
    <div className="w-full px-24 py-6 justify-between border-b border-[#292929] flex items-center">
        <div className="font-primary text-[#FAFAFA] text-4xl font-bold">
            Git<span className="text-primary">Me</span>
        </div>

        <div className="flex font-primary text-[#FAFAFA] text-xl items-center gap-6">

            {/* <div className="cursor-pointer hover:text-primary transition-all duration-200 ease-in hover-underline ">
                Pricing
            </div>
            <div className="cursor-pointer hover:text-primary transition-all duration-200 ease-in hover-underline ">
                About
            </div> */}
            {/* <div className="bg-primary px-4 py-1 rounded-lg cursor-pointer hover:bg-primary/80  hover-underline transition-all duration-200 ease-in ">
                Login
            </div> */}
            
        </div>
        
    </div>
  )
}
