"use client"
import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Label } from "@/components/ui/label"

export function Dashboard() {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <button className="bg-background rounded-md text-black p-1" >Report</button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>your report</DialogTitle>
            <DialogDescription>
              here is your report for today
            </DialogDescription>
          </DialogHeader>
    
        
        </DialogContent>
      </form>
    </Dialog>
  )
}

export default Dashboard
