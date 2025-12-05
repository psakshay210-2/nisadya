import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Timeline } from "./timeline"
import { Sponsors } from "./sponsors"
import { Calendar, Building2, Ticket } from "lucide-react"
import { Events } from "./events"

export function HeroTabs() {
  return (
    <div className="flex flex-col w-full h-full">
      <Tabs defaultValue="events" className="flex flex-col h-full">
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
        <div className="flex-1 mt-4 h-[500px] overflow-hidden rounded-lg bg-card/50 backdrop-blur-sm flex flex-col justify-center">
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
