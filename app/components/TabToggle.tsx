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
function TabToggle() {
  return (
    <div className='container flex flex-col w-100 h-auto bg-black p-4 my-4'>
        <Tabs defaultValue='ToDo' defaultChecked>
            <TabsList>
                <TabsTrigger  value="ToDo">To-Do</TabsTrigger>
                <TabsTrigger  value="Pomodoro">pomodoro</TabsTrigger>
                <TabsTrigger value="Timer">Timer</TabsTrigger>
            </TabsList>
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
