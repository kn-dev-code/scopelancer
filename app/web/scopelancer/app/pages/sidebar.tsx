import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { WaypointsIcon, WalletIcon, FolderOpenIcon, LayoutDashboardIcon, SettingsIcon} from 'lucide-react'
import React from 'react'
import Link from "next/link"
const SideBar = () => {
    return (
        <>
            <div className="border-2 border-[#22272C] bg-[#0D1218] flex flex-col justify-between h-screen w-[20%] p-9 relative bottom-[8%]">

                {/* Navigation */}
                <div className="flex flex-col justify-between gap-y-6">
                <div className = "flex flex-row items-center gap-x-2">
                    {/* Logo and title */}
                    <Button className="bg-[#2EA2E6]">
                        <WaypointsIcon color = "black" className="w-4 h-4" />
                    </Button>
                    <h2 className="text-white font-bold">Scopelancer</h2>
                </div>
                    <Link className = "hover:transition hover:duration-500 hover:ease-in-out hover:rounded-2xl w-full active:bg-[#1F2F3E] bg-[#0D1218] hover:cursor-pointer"href = "/"><Button className="text-[#9199A2] flex flex-row justify-start active:bg-[#1F2F3E] bg-[#0D1218] hover:cursor-pointer"><LayoutDashboardIcon/>Dashboard</Button></Link>
                    <Link className = "hover:transition hover:duration-500 hover:ease-in-out hover:rounded-2xl w-full active:bg-[#1F2F3E] bg-[#0D1218] hover:cursor-pointer" href = "/sessions"><Button className="text-[#9199A2] flex flex-row justify-start bg-[#0D1218] active:bg-[#1F2F3E] hover:cursor-pointer"><FolderOpenIcon/>Sessions</Button></Link>
                    <Link className = "hover:transition hover:duration-500 hover:ease-in-out hover:rounded-2xl w-full active:bg-[#1F2F3E] bg-[#0D1218] hover:cursor-pointer" href = "/billings"><Button className="text-[#9199A2] flex flex-row justify-start bg-[#0D1218] active:bg-[#1F2F3E] hover:cursor-pointer"><WalletIcon/>Billing</Button></Link>
                    <Link className = "hover:transition hover:duration-500 hover:ease-in-out hover:rounded-2xl w-full active:bg-[#1F2F3E] bg-[#0D1218] hover:cursor-pointer" href = "/settings"><Button className="text-[#9199A2] flex flex-row justify-start bg-[#0D1218] active:bg-[#1F2F3E] hover:cursor-pointer"><SettingsIcon/>Settings</Button></Link>
                </div>
                <Card className="bg-[#0C1016] border-2 border-[#202327] w-full">
                    <CardHeader>
                        <CardTitle className=" text-[#9199A2]">
                            Credit Balance
                        </CardTitle>
                        <CardDescription className="text-white text-lg font-bold">
                            {/* Will render later for user's credit balance */}  1,800
                        </CardDescription>
                        <Button className="text-black bg-[#2EA2E6] hover:cursor-pointer hover:bg-[#2EA2E6]/80">
                            Buy Credits
                        </Button>
                    </CardHeader>
                </Card>
            </div>
        </>
    )
}

export default SideBar