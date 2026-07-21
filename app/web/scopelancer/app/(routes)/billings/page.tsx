import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import NavBar from "../pages/navbar"
import SideBar from "../pages/sidebar"
import { CoinsIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const Billing = () => {

    const creditPacks = {
        starterPack: {
            name: "Starter" as string,
            credits: "1,000" as string,
            price: "$19" as string,
        },
        studioPack: {
            name: "Studio" as string,
            credits: "3,000" as string,
            price: "$49" as string,
        },
        agencyPack: {
            name: "Agency" as string,
            credits: "8,000" as string,
            price: "$119" as string,
        }
    }
    return (
        <div className="min-h-screen bg-[#0A0F13] text-white flex overflow-hidden">
            {/* 1. Left Sidebar */}
            <SideBar />

            {/* 2. Main Content Area (offset automatically next to sidebar) */}
            <div className="flex-1 flex flex-col min-w-0 max-w-full ">

                {/* Top Navigation */}
                <div className="w-[125%] relative right-[25%]">

                    <NavBar />
                </div>
                {/* Page Body Container */}
                <main className="flex-1 p-8 max-w-6xl w-full mx-auto space-y-8">

                    {/* Header Section */}
                    <div className="space-y-1">
                        <h1 className="text-2xl font-bold tracking-tight">Billing</h1>
                        <p className="text-[#9199A2] text-sm max-w-3xl">
                            Prepaid credits. Each run is metered against real usage — audio minutes and tokens — and unused holds are refunded.
                        </p>
                    </div>

                    {/* Available Balance Card */}
                    <Card className="bg-[#12161D] border-[#262B30] text-white p-6 rounded-xl flex items-start justify-between">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-[#1C222B] rounded-lg">
                                <CoinsIcon className="text-[#E1AF3A] w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-[#9199A2] text-xs font-medium uppercase tracking-wider">Available balance</p>
                                <p className="text-3xl font-bold mt-1">1,840</p>
                            </div>
                        </div>
                    </Card>

                    {/* Credit Packs Section */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold">Credit packs</h2>

                        {/* Responsive 3-Column Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {Object.entries(creditPacks).map(([key, pack]) => {
                                const isPopular = key === "studioPack";
                                return (
                                    <Card
                                        key={key}
                                        className={`bg-[#12161D] text-white p-6 rounded-xl relative flex flex-col justify-between border ${isPopular ? "border-[#0090FF]" : "border-[#262B30]"
                                            }`}
                                    >
                                        {isPopular && (
                                            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0090FF] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                                                Popular
                                            </span>
                                        )}

                                        <div className="space-y-4">
                                            <p className="text-sm font-medium text-[#9199A2]">{pack.name}</p>
                                            <div>
                                                <span className="text-3xl font-bold">{pack.credits}</span>
                                                <span className="text-sm text-[#9199A2] ml-1.5">credits</span>
                                            </div>
                                            <p className="text-2xl font-bold">{pack.price}</p>
                                        </div>

                                       <Link href = "/stripe-checkout"><Button className={`mt-6 w-full rounded-lg font-medium transition-colors ${isPopular
                                            ? "bg-[#0090FF] hover:bg-[#0077D6] text-white"
                                            : "bg-[#0A0E13] hover:bg-[#181F26] border border-[#262B30] text-white"
                                            }`}>
                                            Buy pack
                                        </Button>
                                        </Link>
                                    </Card>
                                );
                            })}
                        </div>
                    </div>

                    {/* Transaction History Section */}


                </main>
            </div>
        </div>
    )
}
export default Billing;