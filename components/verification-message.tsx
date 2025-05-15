"use client"

import { useState } from "react"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface VerificationMessageProps {
  onBegin: () => void
}

export default function VerificationMessage({ onBegin }: VerificationMessageProps) {
  const [language, setLanguage] = useState("english")

  return (
    <div className="flex flex-col items-center text-center space-y-6">
      <h2 className="text-2xl font-semibold text-amber-500">Let&apos;s confirm you are human</h2>

      <p className="text-gray-600 max-w-md">
        Complete the security check before continuing. This step verifies that you are not a bot, which helps to protect
        your account and prevent spam.
      </p>

      <Button onClick={onBegin} className="bg-amber-500 hover:bg-amber-600 text-white px-6">
        Begin <ChevronRight className="ml-1 h-4 w-4" />
      </Button>

      <div className="pt-8 w-full max-w-[200px]">
        <Select value={language} onValueChange={setLanguage}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="english">English</SelectItem>
            <SelectItem value="spanish">Spanish</SelectItem>
            <SelectItem value="french">French</SelectItem>
            <SelectItem value="german">German</SelectItem>
            <SelectItem value="chinese">Chinese</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
