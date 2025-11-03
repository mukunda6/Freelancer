import { messages } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { ChevronRight } from 'lucide-react';

export function ClientCommunication() {
  return (
    <div className="space-y-1">
      {messages.map((message) => (
        <a href="#" key={message.id} className="flex items-center p-2 rounded-lg hover:bg-secondary/50 -mx-2">
          <div className={cn("h-2 w-2 rounded-full mr-2", message.isRead ? 'bg-transparent' : 'bg-accent')} />
          <Avatar className="h-9 w-9">
            <AvatarImage src={`https://picsum.photos/seed/${message.client.replace(/\s+/g, '')}/100/100`} alt={message.client} />
            <AvatarFallback>{message.client.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="ml-4 flex-1 grid grid-cols-3 items-center gap-4">
            <p className={cn("text-sm font-medium", !message.isRead && "text-foreground")}>{message.client}</p>
            <p className={cn("text-sm text-muted-foreground col-span-2 truncate", !message.isRead && "text-foreground")}>{message.subject}</p>
          </div>
          <p className="ml-auto text-xs text-muted-foreground">{message.timestamp}</p>
          <ChevronRight className="h-4 w-4 ml-2 text-muted-foreground" />
        </a>
      ))}
    </div>
  );
}
