import React from 'react'
import Timer from './Timer'
import ToDos from './ToDos'
import Habbits from './Habbits'
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
                <TabsTrigger  value="timer">Timer</TabsTrigger>
                <TabsTrigger value="Habbits">Habbits</TabsTrigger>
            </TabsList>
            <TabsContent value='ToDo'>
                      <ToDos />
            </TabsContent>
            <TabsContent value='timer'>
                     
            <Timer />
            </TabsContent>
            <TabsContent value='Habbits'>
                      
      <Habbits />
            </TabsContent>





        </Tabs>
      







    </div>
  )
}

export default TabToggle
