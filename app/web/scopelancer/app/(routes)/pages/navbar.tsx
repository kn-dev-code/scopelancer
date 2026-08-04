import { Button } from '@/components/ui/button'
import { CoinsIcon } from 'lucide-react'
import Link from 'next/link'
import { client } from '@/lib/betterauth/client'

// See why Nav bar is not redirecting
const NavBar = () => {
  const { data } = client.useSession();
  const firstInitial = data?.user?.name[0];
  const secondInitial = data?.user?.email[0];
  const userInitials = `${firstInitial}${secondInitial}`.toUpperCase();


return (
  <div className="relative left-[20%]">
    <div className="bg-[#0A0F13] flex flex-row justify-end border-2 border-[#202327] p-4 gap-x-4 w-[80%]">
      <Link href="/billings">
        <Button className="bg-[#12161D] border-2 border-[#262B30] rounded-lg hover:cursor-pointer"><CoinsIcon className="text-[#E1AF3A]" />
          {/* Will render later for user's account balance*/} 100 credits
        </Button>
      </Link>
      <Button className="bg-[#112431] rounded-full text-[#2EA2E6]">
        {userInitials}
      </Button>
    </div>
  </div>
)
}

export default NavBar