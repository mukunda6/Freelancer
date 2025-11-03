
import type { Testimonial } from "@/lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
    return (
        <Card className="bg-secondary/30 border-l-4 border-accent">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
                 <Avatar className="h-10 w-10 border">
                    <AvatarImage src={testimonial.clientAvatar} alt={testimonial.clientName} />
                    <AvatarFallback>{testimonial.clientName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-sm font-semibold">{testimonial.clientName}</CardTitle>
                  <CardDescription className="text-xs">{testimonial.clientTitle}</CardDescription>
                </div>
            </CardHeader>
            <CardContent className="pt-0">
                 <blockquote className="text-sm text-foreground/90 italic">"{testimonial.quote}"</blockquote>
            </CardContent>
        </Card>
    );
}
