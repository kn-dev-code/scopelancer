import { Button } from '@/components/ui/button'
import React from 'react'

const NavBar = () => {
  return (
    <>
      <div className="bg-[#0A0F13] flex flex-row justify-end border-2 border-[#202327] p-4 gap-x-4">
          <Button className = "bg-[#12161D] border-2 border-[#262B30] rounded-lg">
            {/* Will render later for user's account balance*/} 100 credits
          </Button>
          <Button className="bg-[#112431] rounded-full text-[#2EA2E6]">
            AK {/* Will render later to assign user's initials */}
          </Button>
      </div>
    </>
  )
}

export default NavBar