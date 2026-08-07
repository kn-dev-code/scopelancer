"use client"
import { Button } from '@/components/ui/button'
import { CoinsIcon } from 'lucide-react'
import Link from 'next/link'
import { client } from '@/lib/betterauth/client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from '@/components/ui/toast'
// See why Nav bar is not redirecting
const NavBar = () => {
  const router = useRouter();
  const { data } = client.useSession();
  const firstInitial = data?.user?.name[0];
  const secondInitial = data?.user?.email[0];
  const userInitials = `${firstInitial}${secondInitial}`.toUpperCase();
  const [showPanel, setShowPanel] = useState(false);

  const signOut = async () => {
    await client.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.add({
            type: "success",
            title: "Logout successfully!",
            description: "You will be redirected...",
          })
          router.push("/");
        }
      }
    })
  }

  return (
    <div className="relative left-[20%]">
      <div className="bg-[#0A0F13] flex flex-row justify-end border-2 border-[#202327] p-4 gap-x-4 w-[80%]">
        <Link href="/billings">
          <Button className="bg-[#12161D] border-2 border-[#262B30] rounded-lg hover:cursor-pointer"><CoinsIcon className="text-[#E1AF3A]" />
            {/* Will render later for user's account balance*/} 100 credits
          </Button>
        </Link>
        {showPanel ? (
          <div className = "flex flex-row gap-x-6 rounded-sm items-center justify-center w-[35%]">
            <Button className = "bg-[#112431] hover:bg-[#112431]/80 rounded-md border-2 border-[#aaabac] hover:scale-105"><Link className = "text-[#2EA2E6]" href = "/profile">Profile</Link></Button>
            <Button className = "bg-[#112431] hover:bg-[#112431]/80 rounded-md border-2 border-[#aaabac] hover:scale-105"><Link className = "text-[#2EA2E6]" href = "/plan">User Plan</Link></Button>
            <Button onClick = {signOut} className = "bg-[#112431] hover:bg-[#112431]/80 rounded-md border-2 border-[#aaabac] hover:scale-105 hover:cursor-pointer text-[#2EA2E6]">Logout</Button>
            <Button onClick = {() => {setShowPanel(false)}} className = "bg-[#112431] rounded-md border-2 border-[#aaabac] text-[#2EA2E6] hover:scale-105 hover:bg-[#112431]/80 hover:cursor-pointer">Cancel</Button>
            </div>
        ) : (
          <Button onClick= {() => {setShowPanel(true)}} className="bg-[#112431] rounded-full text-[#2EA2E6] hover:cursor-pointer hover:bg-[#112431]/80">
          {userInitials}
        </Button>
        )}
      </div>
    </div>
  )
}

export default NavBar