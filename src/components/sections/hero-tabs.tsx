import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Timeline } from "./timeline"
import { Sponsors } from "./sponsors"
import { Calendar, Building2 } from "lucide-react"

export function HeroTabs() {
  return (
    <div className="h-[80vh] rounded-lg bg-card/50 p-4 backdrop-blur-sm">
      <Tabs defaultValue="schedule" orientation="vertical" className="flex h-full gap-4">
        <TabsList className="grid h-full w-20 grid-rows-2 bg-transparent border-r border-border/50 rounded-none p-2">
          <TabsTrigger value="schedule" className="flex flex-col gap-2 h-full data-[state=active]:bg-accent/50 data-[state=active]:shadow-none">
            <Calendar className="h-5 w-5"/>
            <span>Schedule</span>
          </TabsTrigger>
          <TabsTrigger value="sponsors" className="flex flex-col gap-2 h-full data-[state=active]:bg-accent/50 data-[state=active]:shadow-none">
            <Building2 className="h-5 w-5"/>
            <span>Sponsors</span>
          </TabsTrigger>
        </TabsList>
        <div className="flex-1 h-full overflow-hidden">
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
