import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Timeline } from "./timeline"
import { Sponsors } from "./sponsors"
import { Calendar, Building2, Ticket } from "lucide-react"
import { Events } from "./events"

export function HeroTabs() {
  return (
    <div className="h-[70vh] rounded-lg bg-card/50 p-4 backdrop-blur-sm flex flex-col">
      <Tabs defaultValue="events" className="flex flex-col h-full">
        <TabsList className="shrink-0 w-full max-w-md mx-auto grid grid-cols-3">
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
        <div className="flex-1 mt-4 h-full overflow-hidden">
          <TabsContent value="events" className="h-full mt-0">
            <div className="h-full overflow-y-auto">
              <Events condensed />
            </div>
          </TabsContent>
          <TabsContent value="schedule" className="h-full mt-0">
            <div className="h-full overflow-y-auto">
              <Timeline condensed />
            </div>
          </TabsContent>
          <TabsContent value="sponsors" className="h-full mt-0">
            <div className="h-full overflow-y-auto flex items-center">
              <Sponsors />
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
