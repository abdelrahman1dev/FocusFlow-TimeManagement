"use client"
import React from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import DashboardPage from '@/app/Dashboard/page'

interface Props {
  children: React.ReactNode
}

export default function ReportTabs({ children }: Props){
  return (
    <div className="max-w-4xl mx-auto mt-6">
      <Tabs defaultValue="app">
        <TabsList>
          <TabsTrigger value="app">App</TabsTrigger>
          <TabsTrigger value="report">Report</TabsTrigger>
        </TabsList>

        <div className="mt-4 bg-transparent">
          <TabsContent value="app">
            <div>{children}</div>
          </TabsContent>
          <TabsContent value="report">
            <DashboardPage />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
