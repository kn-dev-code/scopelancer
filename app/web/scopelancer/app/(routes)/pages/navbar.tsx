"use client"
import { Button } from '@/components/ui/button'
import { CoinsIcon } from 'lucide-react'
import Link from 'next/link'
import { client } from '@/lib/betterauth/client'
import { redirect } from 'next/navigation'
import { useState } from 'react'
// See why Nav bar is not redirecting
const NavBar = () => {
  const { data } = client.useSession();
  const firstInitial = data?.user?.name[0];
  const secondInitial = data?.user?.email[0];
  const userInitials = `${firstInitial}${secondInitial}`.toUpperCase();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const [closePanel, setClosePanel] = useState(false);
  const [showWarningMessage, setShowWarningMessage] = useState(false);

  const signOut = async () => {
    await client.signOut({
      fetchOptions: {
        onSuccess: () => {
          setIsLoggingOut(true);
          redirect("/");
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
          <div className = "flex flex-row gap-y-3 border-[#aaabac] border-2 rounded-sm bg-[#12161D]">
            <Link className = "text-white" href = "/profile">Profile</Link>
            <Link className = "text-white" href = "/plan">User Plan</Link>
            <Link className = "text-white" onClick = {() => {setShowWarningMessage(true)}} href = "/logout">Logout</Link>
            <Button onClick = {() => {setShowPanel(false)}} className = "bg-[#112431] rounded-full text-[#2EA2E6]">Cancel</Button>
            </div>
        ) : (
          <Button onClick= {() => {setShowPanel(true)}} className="bg-[#112431] rounded-full text-[#2EA2E6]">
          {userInitials}
        </Button>
        )}
      </div>
    </div>
  )
}

export default NavBar