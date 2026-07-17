import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

const SideBar = () => {
    return (
        <div className="border-2 border-[#202327]">
            {/* Logo and title */}
            <div className="flex flex-row justify-start">
                <Button className="bg-[#2EA2E6]">
                </Button>
                <h2>Scopelancer</h2>
            </div>
            {/* Navigation */}
            <div className="flex flex-col justify-start">
                <Button className="text-[#9199A2]">Dashboard</Button>
                <Button className="text-[#9199A2]">Sessions</Button>
                <Button className="text-[#9199A2]">Billing</Button>
                <Button className="text-[#9199A2]">Settings</Button>
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
    )
}

export default SideBar