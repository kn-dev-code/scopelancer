import { Button } from '@/components/ui/button'
import { CoinsIcon } from 'lucide-react'
import Link from 'next/link'

const NavBar = () => {
  return (
    <div className = "relative left-[20%]">
      <div className="bg-[#0A0F13] flex flex-row justify-end border-2 border-[#202327] p-4 gap-x-4 w-[80%]">
        <Link href = "/billings">
          <Button className = "bg-[#12161D] border-2 border-[#262B30] rounded-lg hover:cursor-pointer"><CoinsIcon className = "text-[#E1AF3A]"/>
            {/* Will render later for user's account balance*/} 100 credits
          </Button>
          </Link>
          <Button className="bg-[#112431] rounded-full text-[#2EA2E6]">
            AK {/* Will render later to assign user's initials */}
          </Button>
      </div>
    </div>
  )
}

export default NavBar