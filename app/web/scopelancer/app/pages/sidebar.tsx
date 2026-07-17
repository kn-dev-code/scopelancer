import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

const SideBar = () => {
    return (
        <>
            <div className="border-2 border-[#22272C] bg-[#0C1016] flex flex-col justify-start h-screen w-[20%] p-9">
                <div className = "flex flex-row items-center gap-x-2">
                    {/* Logo and title */}
                    <Button className="bg-[#2EA2E6]">
                    </Button>
                    <h2 className="text-white">Scopelancer</h2>
                </div>

                {/* Navigation */}
                <div className="flex flex-col justify-start">
                    <Button className="text-[#9199A2] flex flex-row justify-start">Dashboard</Button>
                    <Button className="text-[#9199A2] flex flex-row justify-start">Sessions</Button>
                    <Button className="text-[#9199A2] flex flex-row justify-start">Billing</Button>
                    <Button className="text-[#9199A2] flex flex-row justify-start">Settings</Button>
                </div>
                <Card className="bg-[#0C1016]">
                    <CardHeader>
                        <CardTitle className="bg-[#9199A2]">
                            Credit Balance
                        </CardTitle>
                        <CardDescription className="text-white">
                            {/* Will render later for user's credit balance */}  1,800
                        </CardDescription>
                        <Button className="text-black bg-[#2EA2E6]">
                            Buy Credits
                        </Button>
                    </CardHeader>
                </Card>
            </div>
        </>
    )
}

export default SideBar