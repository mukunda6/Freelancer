'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { MessageSquare, Send, Bot, User, X } from 'lucide-react';
import { chatbot } from '@/ai/flows/chatbot-flow';
import { ScrollArea } from '../ui/scroll-area';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Skeleton } from '../ui/skeleton';

type Message = {
  id: string;
  role: 'user' | 'bot';
  content: string;
};

export function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'bot',
      content: "Hello! I'm the Linkfolio assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const historyForAi = [...messages, userMessage].map((msg) => ({
        role: msg.role === 'bot' ? 'model' : 'user',
        content: [{ text: msg.content }],
      }));

      const botResponse = await chatbot({ history: historyForAi });
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        content: botResponse,
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Chatbot error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        content: 'Sorry, I encountered an error. Please try again.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size="icon"
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        align="end"
        className="w-[350px] sm:w-[400px] p-0 rounded-lg shadow-2xl border-none"
        sideOffset={10}
      >
        <Card className="flex flex-col h-[500px]">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className='flex items-center gap-3'>
              <div className='relative'>
                 <Bot className="h-8 w-8 text-primary" />
                 <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-white" />
              </div>
              <div>
                <CardTitle className="font-headline text-lg">Linkfolio Assistant</CardTitle>
                <CardDescription>Ready to help</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-hidden p-4">
            <ScrollArea className="h-full" ref={scrollAreaRef}>
              <div className="space-y-4 pr-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      'flex items-start gap-3 text-sm',
                      message.role === 'user' && 'justify-end'
                    )}
                  >
                    {message.role === 'bot' && (
                      <Avatar className="h-8 w-8 border">
                        <AvatarFallback><Bot size={18}/></AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={cn(
                        'rounded-lg px-3 py-2 max-w-[80%]',
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary text-secondary-foreground'
                      )}
                    >
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    </div>
                     {message.role === 'user' && (
                      <Avatar className="h-8 w-8 border">
                         <AvatarFallback><User size={18}/></AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
                {isLoading && (
                   <div className="flex items-start gap-3 text-sm">
                      <Avatar className="h-8 w-8 border">
                        <AvatarFallback><Bot size={18}/></AvatarFallback>
                      </Avatar>
                      <div className="rounded-lg px-3 py-2 bg-secondary">
                        <Skeleton className="h-4 w-12" />
                      </div>
                   </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
          <CardFooter className="p-4 border-t">
            <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                disabled={isLoading}
              />
              <Button type="submit" size="icon" disabled={isLoading}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      </PopoverContent>
    </Popover>
  );
}
