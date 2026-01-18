'use client';

import { handleChat } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Bot, Send, User, X } from 'lucide-react';
import React, { useRef, useState, useTransition, useEffect } from 'react';
import { ScrollArea } from '../ui/scroll-area';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { cn } from '@/lib/utils';
import { type Message } from '@/lib/types';

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isPending, startTransition] = useTransition();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessages: Message[] = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');

    startTransition(async () => {
      const response = await handleChat(newMessages);
      setMessages((prev) => [...prev, response]);
    });
  };

  if (!isMounted) {
    return null;
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-3 right-3 xs:bottom-4 xs:right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 z-50 rounded-full bg-primary p-3 xs:p-3.5 sm:p-4 text-primary-foreground shadow-lg transition-transform hover:scale-110 min-w-[48px] min-h-[48px] flex items-center justify-center"
        aria-label="Open chat"
      >
        <Bot className="h-6 w-6 xs:h-7 xs:w-7 sm:h-8 sm:w-8" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-3 right-3 xs:bottom-4 xs:right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 z-50">
      <Card className="w-[calc(100vw-1.5rem)] xs:w-[calc(100vw-2rem)] sm:w-[360px] md:w-[380px] h-[480px] xs:h-[500px] sm:h-[520px] md:h-[550px] flex flex-col shadow-2xl rounded-2xl">
        <CardHeader className="flex flex-row items-center justify-between py-3 xs:py-3.5 sm:py-4">
          <div className='flex items-center gap-2'>
            <Bot className="h-5 w-5 xs:h-5.5 xs:w-5.5 sm:h-6 sm:w-6 text-primary" />
            <CardTitle className="font-headline text-base xs:text-lg sm:text-xl md:text-2xl">Event Assistant</CardTitle>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="min-w-[44px] min-h-[44px]">
            <X className="h-4 w-4 xs:h-4.5 xs:w-4.5 sm:h-5 sm:w-5" />
            <span className="sr-only">Close chat</span>
          </Button>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col p-0">
          <ScrollArea className="flex-grow p-3 xs:p-3.5 sm:p-4">
            <div className="space-y-3 xs:space-y-3.5 sm:space-y-4">
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-center py-12 xs:py-14 sm:py-16">
                  <Bot className="h-10 w-10 xs:h-11 xs:w-11 sm:h-12 sm:w-12 text-muted-foreground/50" />
                  <p className="text-sm xs:text-base text-muted-foreground mt-3 xs:mt-4">Ask me anything about the events!</p>
                </div>
              )}
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={cn(
                    'flex items-start gap-2 xs:gap-2.5 sm:gap-3',
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  {message.role === 'assistant' && (
                    <Avatar className="h-7 w-7 xs:h-8 xs:w-8 bg-primary text-primary-foreground shrink-0">
                      <AvatarFallback><Bot className="h-4 w-4 xs:h-5 xs:w-5" /></AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={cn(
                      'rounded-lg px-3 xs:px-3.5 sm:px-4 py-2 xs:py-2.5 max-w-[85%] xs:max-w-[80%]',
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    )}
                  >
                    <p className="text-xs xs:text-sm">{message.content}</p>
                  </div>
                  {message.role === 'user' && (
                    <Avatar className="h-7 w-7 xs:h-8 xs:w-8 shrink-0">
                      <AvatarFallback><User /></AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              {isPending && (
                <div className="flex items-start gap-2 xs:gap-2.5 sm:gap-3 justify-start">
                  <Avatar className="h-7 w-7 xs:h-8 xs:w-8 bg-primary text-primary-foreground shrink-0">
                    <AvatarFallback><Bot className="h-4 w-4 xs:h-5 xs:w-5" /></AvatarFallback>
                  </Avatar>
                  <div className="rounded-lg px-3 xs:px-3.5 sm:px-4 py-2 xs:py-2.5 bg-muted animate-pulse">
                    <div className="h-3.5 xs:h-4 w-20 xs:w-24 rounded bg-muted-foreground/20"></div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
          <div className="p-3 xs:p-3.5 sm:p-4 border-t">
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about events..."
                className="flex-grow text-sm xs:text-base min-h-[44px]"
                disabled={isPending}
              />
              <Button type="submit" disabled={isPending} size="icon" className="min-w-[44px] min-h-[44px] shrink-0">
                <Send className="h-4 w-4" />
                <span className="sr-only">Send message</span>
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
