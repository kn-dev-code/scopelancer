import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import NavBar from "../pages/navbar"
import SideBar from "../pages/sidebar"
import { CoinsIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

const Billing = () => {

    const creditPacks = {
        starterPack: {
            name: "Starter Pack" as string,
            credits: "1,000" as string,
            price: "$19" as string,
        },
        studioPack: {
            name: "Studio Pack" as string,
            credits: "3,000" as string,
            price: "$49" as string,
        },
        agencyPack: {
            name: "Starter Pack" as string,
            credits: "8,000" as string,
            price: "$119" as string,
        }
    }
    return (
        <>
            <div className="bg-[#0A0F13] dark:bg-black w-full h-screen overflow-hidden">
                <div>
                    <NavBar />
                </div>
                <div className="relative bottom-16">
                    <SideBar />
                </div>
                <div className="flex flex-col justify-center self-center m-auto">
                    <h1 className="text-white">Billing</h1>
                    <span className="text-white">Prepaid credits. Each run is metered against real usage — audio minutes and tokens — and unused holds are refunded.</span>
                </div>


            </div>
        </>
    )
}

export default Billing;