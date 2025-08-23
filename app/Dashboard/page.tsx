"use client"
import React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function Dashboard() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-background rounded-md text-black p-1">
          Report
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Your report</DialogTitle>
          <DialogDescription>
            Here is your report for today
          </DialogDescription>
        </DialogHeader>
        <form>
          {/* Form fields go here if needed */}
        </form>
      </DialogContent>
    </Dialog>
  )
}
