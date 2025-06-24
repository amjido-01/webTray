import { AlertCircleIcon} from "lucide-react"

import {
  Alert,

  AlertTitle,
} from "@/components/ui/alert"
import Link from "next/link"

export function HasBusinessAlert() {
  return (
    <div className="grid w-full my-[20px] items-start gap-4">
   
      <Alert variant='default' className="border-[#F59E0B] text-[16px] bg-[#FDF0D94A] border-[0.05rem] w-full">
        <AlertCircleIcon />
        <AlertTitle >Finish  setting up your account to start adding business. <span><Link href="/register-business" className="underline text-[#365BEB] ml-[12px]">Add Business</Link></span></AlertTitle>
      
      </Alert>
    </div>
  )
}
