"use client"

import type React from "react"

import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ChatInputProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (e: React.FormEvent) => void
  disabled?: boolean
}

export default function ChatInput({ value, onChange, onSubmit, disabled }: ChatInputProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
      <form onSubmit={onSubmit} className="max-w-3xl mx-auto flex items-center gap-2">
        <input
          type="text"
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder={disabled ? "Complete verification to continue..." : "Type your message..."}
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
        <Button
          type="submit"
          disabled={disabled || !value.trim()}
          className="bg-amber-500 hover:bg-amber-600 text-white p-3 rounded-lg"
        >
          <Send className="h-5 w-5" />
        </Button>
      </form>
    </div>
  )
}
