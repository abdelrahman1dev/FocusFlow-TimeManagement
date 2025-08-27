"use client"
import React from 'react'
import Pomodoro from './Pomodoro'
import ToDos from './ToDos'
import Timer from './Timer'

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import Dashboard from '../Dashboard/page'
function TabToggle() {
  return (
   
          <div className='container flex flex-col w-fit h-auto bg-black p-4 my-4'>
        <Tabs defaultValue='ToDo' defaultChecked>
         <div className='flex items-center justify-between'>
             <TabsList>
                <TabsTrigger  value="ToDo">To-Do</TabsTrigger>
                <TabsTrigger  value="Pomodoro">pomodoro</TabsTrigger>
                <TabsTrigger value="Timer">Timer</TabsTrigger>

            </TabsList>
                             <div>


    </div>
         </div>
            <TabsContent value='ToDo'>
                      <ToDos />
            </TabsContent>
            <TabsContent value='Pomodoro'>
                     
            <Pomodoro />
            </TabsContent>
            <TabsContent value='Timer'>
                      
      <Timer />
            </TabsContent>





        </Tabs>
    </div>


 
  )
}

export default TabToggle
