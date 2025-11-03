import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { invoices } from '@/lib/data';
import { Badge } from '../ui/badge';
import type { VariantProps } from 'class-variance-authority';
import { badgeVariants } from '../ui/badge';

export function InvoiceStatus() {
  const getBadgeVariant = (status: 'Paid' | 'Pending' | 'Overdue'): VariantProps<typeof badgeVariants>['variant'] => {
    switch (status) {
      case 'Paid':
        return 'default';
      case 'Pending':
        return 'secondary';
      case 'Overdue':
        return 'destructive';
      default:
        return 'outline';
    }
  }

  return (
    <div className="space-y-4">
      {invoices.map((invoice) => (
        <div key={invoice.id} className="flex items-center">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
             <span className="text-sm font-medium">{invoice.client.charAt(0)}</span>
          </div>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{invoice.client}</p>
            <p className="text-sm text-muted-foreground">Due: {invoice.dueDate}</p>
          </div>
          <div className="ml-auto font-medium text-right">
            <p className="font-semibold">${invoice.amount.toLocaleString()}</p>
            <Badge variant={getBadgeVariant(invoice.status)} className="mt-1">
              {invoice.status}
            </Badge>
          </div>
        </div>
      ))}
    </div>
  );
}
