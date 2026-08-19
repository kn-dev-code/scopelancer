import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const NewSession = () => {
    return (
        <div>
            <Link href="/dashboard" className="">Back to Dashboard</Link>
            <div className="flex flex-col">
                <form>
                    {/* Recording Box */}
                    <div className = "p-20">

                    </div>

                    {/* Session Details */}
                    <div>

                    </div>

                    {/* Deliverables */}
                    <div>

                    </div>
                    <div>
                    <p>Estimated cost</p>
                    <Link href = "/dashboard"><Button>Cancel</Button></Link>
                    <Link href = ""><Button type = "submit">Start Session</Button></Link>
                </div>
                </form>
            </div>
        </div>
    )
}

export default NewSession