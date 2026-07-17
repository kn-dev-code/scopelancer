import { Button } from '@/components/ui/button'
import React from 'react'

const NavBar = () => {
  return (
    <div className = "bg-[#0A0F13] flex flex-row justify-end border-2 border-[#202327]">
        <Button>
       {/* Will render later for user's account balance*/} 100 credits
        </Button>
        <Button className = "bg-[#112431] rounded-full">
            AK {/* Will render later to assign user's initials */}
        </Button>
    </div>
  )
}

export default NavBar