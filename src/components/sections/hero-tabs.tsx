
'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Timeline } from "./timeline"
import { Calendar, Ticket, Heart, Bed } from "lucide-react"
import { Events } from "./events"
import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { type CarouselApi } from "../ui/carousel";
import { Progress } from "../ui/progress";
import { Sponsors } from "./sponsors";
import { Accommodation } from "./accommodation";

const tabs = ["events", "schedule", "sponsors", "accommodation"];

export function HeroTabs() {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [isCycling, setIsCycling] = useState(true);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const tabsRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  const [eventsApi, setEventsApi] = useState<CarouselApi>();
  const [scheduleApi, setScheduleApi] = useState<CarouselApi>();
  const [sponsorsApi, setSponsorsApi] = useState<CarouselApi>();
  const [progress, setProgress] = useState(0);

  const activeApi = {
    events: eventsApi,
    schedule: scheduleApi,
    sponsors: sponsorsApi,
    accommodation: undefined,
  }[activeTab];

  useEffect(() => {
    if (!activeApi) {
      setProgress(0);
      return
    }
    const handleSelect = () => {
      setProgress(activeApi.scrollProgress() * 100);
    }
    handleSelect();
    activeApi.on("select", handleSelect)
    activeApi.on("reInit", handleSelect)
    return () => {
      activeApi.off("select", handleSelect)
      activeApi.off("reInit", handleSelect)
    }
  }, [activeApi, activeTab])

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsCycling(true);
        } else {
          setIsCycling(false);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );

    const currentRef = tabsRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [isMounted]);

  useEffect(() => {
    if (!isCycling || !isMounted) return;

    const interval = setInterval(() => {
      const currentIndex = tabs.indexOf(activeTab);
      let nextIndex;

      if (direction === 'forward') {
        if (currentIndex === tabs.length - 1) {
          setDirection('backward');
          nextIndex = currentIndex - 1;
        } else {
          nextIndex = currentIndex + 1;
        }
      } else { // backward
        if (currentIndex === 0) {
          setDirection('forward');
          nextIndex = currentIndex + 1;
        } else {
          nextIndex = currentIndex - 1;
        }
      }
      setActiveTab(tabs[nextIndex]);
    }, 5000);

    return () => clearInterval(interval);
  }, [isCycling, activeTab, direction, isMounted]);

  const handleTabChange = (value: string) => {
    setIsCycling(false);
    setActiveTab(value);
  }

  const tabContentBaseClasses = "absolute top-0 left-0 w-full h-full transition-opacity duration-700 ease-in-out";

  if (!isMounted) {
    return (
      <div className="flex flex-col w-full h-full">
        <div className="shrink-0 w-full max-w-2xl mx-auto h-12 rounded-md bg-muted/50" />
        <div className="relative mt-2 xs:mt-4 h-[300px] xs:h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px] overflow-hidden rounded-lg bg-card/50 backdrop-blur-sm" />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-full" ref={tabsRef}>
      <Tabs value={activeTab} onValueChange={handleTabChange} className="flex flex-col h-full">
        <TabsList className="h-auto shrink-0 w-full max-w-full sm:max-w-2xl mx-auto grid grid-cols-4 bg-card/50 backdrop-blur-sm gap-1 xs:gap-1.5 sm:gap-2 p-1 xs:p-1.5 sm:p-2">
          <TabsTrigger
            value="events"
            className="flex flex-col items-center justify-center gap-1 xs:gap-1.5 min-h-[48px] text-[10px] xs:text-xs sm:text-sm px-2 py-2 w-full"
          >
            <Ticket className="h-4 w-4 xs:h-4.5 xs:w-4.5 sm:h-5 sm:w-5 shrink-0" />
            <span className="leading-none text-center w-full">Events</span>
          </TabsTrigger>
          <TabsTrigger
            value="schedule"
            className="flex flex-col items-center justify-center gap-1 xs:gap-1.5 min-h-[48px] text-[10px] xs:text-xs sm:text-sm px-2 py-2 w-full"
          >
            <Calendar className="h-4 w-4 xs:h-4.5 xs:w-4.5 sm:h-5 sm:w-5 shrink-0" />
            <span className="leading-none text-center w-full">Schedule</span>
          </TabsTrigger>
          <TabsTrigger
            value="sponsors"
            className="flex flex-col items-center justify-center gap-1 xs:gap-1.5 min-h-[48px] text-[10px] xs:text-xs sm:text-sm px-2 py-2 w-full"
          >
            <Heart className="h-4 w-4 xs:h-4.5 xs:w-4.5 sm:h-5 sm:w-5 shrink-0" />
            <span className="leading-none text-center w-full">Sponsors</span>
          </TabsTrigger>
          <TabsTrigger
            value="accommodation"
            className="flex flex-col items-center justify-center gap-1 xs:gap-1.5 min-h-[48px] text-[10px] xs:text-xs sm:text-sm px-2 py-2 w-full"
          >
            <Bed className="h-4 w-4 xs:h-4.5 xs:w-4.5 sm:h-5 sm:w-5 shrink-0" />
            <span className="leading-none text-center w-full">Stay</span>
          </TabsTrigger>
        </TabsList>
        <div className="relative mt-2 xs:mt-3 sm:mt-4 h-[340px] xs:h-[380px] sm:h-[450px] md:h-[500px] lg:h-[550px] xl:h-[600px] overflow-hidden rounded-lg bg-card/50 backdrop-blur-sm p-4 xs:p-5 sm:p-6 md:p-8">
          {activeTab !== 'accommodation' && <Progress value={progress} className="absolute top-0 left-0 z-10 h-1" />}
          <TabsContent value="events" forceMount className={cn(tabContentBaseClasses, activeTab === 'events' ? 'opacity-100' : 'opacity-0 pointer-events-none')}>
            <div className="h-full flex items-center">
              <Events condensed setApi={setEventsApi} />
            </div>
          </TabsContent>
          <TabsContent value="schedule" forceMount className={cn(tabContentBaseClasses, activeTab === 'schedule' ? 'opacity-100' : 'opacity-0 pointer-events-none')}>
            <div className="h-full flex items-center">
              <Timeline condensed setApi={setScheduleApi} />
            </div>
          </TabsContent>
          <TabsContent value="sponsors" forceMount className={cn(tabContentBaseClasses, activeTab === 'sponsors' ? 'opacity-100' : 'opacity-0 pointer-events-none')}>
            <div className="h-full flex items-center">
              <Sponsors condensed setApi={setSponsorsApi} />
            </div>
          </TabsContent>
          <TabsContent value="accommodation" forceMount className={cn(tabContentBaseClasses, activeTab === 'accommodation' ? 'opacity-100' : 'opacity-0 pointer-events-none')}>
            <div className="h-full flex items-center">
              <Accommodation condensed />
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
