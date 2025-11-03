import { competitors } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Crown } from 'lucide-react';
import { Badge } from '../ui/badge';

export function TopCompetitors() {
  return (
    <div className="space-y-4">
      {competitors
        .sort((a, b) => a.rank - b.rank)
        .map((competitor, index) => (
          <div key={competitor.id} className="flex items-center gap-4 p-2 rounded-lg hover:bg-secondary/50">
            <div className="flex items-center gap-4 w-12 text-lg font-bold text-muted-foreground">
                {competitor.rank === 1 && <Crown className="w-6 h-6 text-yellow-500" />}
                {competitor.rank !== 1 && <span className='pl-1.5'>{competitor.rank}</span>}
            </div>
            <Avatar className="h-10 w-10 border">
              <AvatarImage src={competitor.avatar} alt={competitor.name} />
              <AvatarFallback>{competitor.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm font-medium leading-none">{competitor.name}</p>
              <p className="text-sm text-muted-foreground">{competitor.specialty}</p>
            </div>
             <div className="flex items-center gap-2">
                {competitor.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
            </div>
            <p className="ml-auto font-medium text-right text-sm">
                <span className="text-muted-foreground">Earnings: </span>
                <span className="text-foreground">${competitor.earnings.toLocaleString()}</span>
            </p>
          </div>
        ))}
    </div>
  );
}
