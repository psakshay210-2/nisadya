'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Timeline } from "./timeline"
import { Sponsors } from "./sponsors"
import { Calendar, Building2, Ticket } from "lucide-react"
import { Events } from "./events"
import { useEffect, useState } from "react";

const tabs = ["events", "schedule", "sponsors"];

export function HeroTabs() {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [isCycling, setIsCycling] = useState(true);

  useEffect(() => {
    if (!isCycling) return;

    const interval = setInterval(() => {
      setActiveTab((currentTab) => {
        const currentIndex = tabs.indexOf(currentTab);
        const nextIndex = (currentIndex + 1) % tabs.length;
        return tabs[nextIndex];
      });
    }, 3000); // Change tab every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [isCycling]);

  const handleTabChange = (value: string) => {
    setIsCycling(false);
    setActiveTab(value);
  }

  return (
    <div className="flex flex-col w-full h-full">
      <Tabs value={activeTab} onValueChange={handleTabChange} className="flex flex-col h-full">
        <TabsList className="shrink-0 w-full max-w-md mx-auto grid grid-cols-3 bg-card/50 backdrop-blur-sm">
          <TabsTrigger value="events" className="gap-2">
            <Ticket className="h-5 w-5"/>
            <span>Events</span>
          </TabsTrigger>
          <TabsTrigger value="schedule" className="gap-2">
            <Calendar className="h-5 w-5"/>
            <span>Schedule</span>
          </TabsTrigger>
          <TabsTrigger value="sponsors" className="gap-2">
            <Building2 className="h-5 w-5"/>
            <span>Sponsors</span>
          </TabsTrigger>
        </TabsList>
        <div className="mt-4 h-[500px] overflow-hidden rounded-lg bg-card/50 backdrop-blur-sm">
          <TabsContent value="events" className="h-full mt-0 p-4">
            <div className="h-full flex items-center">
              <Events condensed />
            </div>
          </TabsContent>
          <TabsContent value="schedule" className="h-full mt-0 p-4">
            <div className="h-full flex items-center">
              <Timeline condensed />
            </div>
          </TabsContent>
          <TabsContent value="sponsors" className="h-full mt-0 p-4">
            <div className="h-full flex items-center">
              <Sponsors condensed />
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
