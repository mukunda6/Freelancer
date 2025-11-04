
'use client';

import { Search } from 'lucide-react';
import { Input } from './ui/input';

export function GlobalSearch() {
    // In a real app, this would be wired up to a global state management
    // solution like Zustand or React Context to control search across the app.
    // For this demo, it's a UI placeholder.
    return (
        <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
                type="search"
                placeholder="Search projects, freelancers..."
                className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
            />
        </div>
    );
}
