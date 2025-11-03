import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { milestones } from '@/lib/data';
import type { VariantProps } from 'class-variance-authority';
import { badgeVariants } from '../ui/badge';

export function ProjectMilestones() {

  const getBadgeVariant = (status: 'Completed' | 'In Progress' | 'Pending'): VariantProps<typeof badgeVariants>['variant'] => {
    switch (status) {
      case 'Completed':
        return 'default';
      case 'In Progress':
        return 'secondary';
      case 'Pending':
        return 'outline';
      default:
        return 'outline';
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Milestone</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Due Date</TableHead>
          <TableHead className="text-right">Progress</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {milestones.map((milestone) => (
          <TableRow key={milestone.id}>
            <TableCell className="font-medium">{milestone.title}</TableCell>
            <TableCell>
              <Badge variant={getBadgeVariant(milestone.status)} className='whitespace-nowrap'>
                {milestone.status}
              </Badge>
            </TableCell>
            <TableCell>{milestone.dueDate}</TableCell>
            <TableCell className="text-right">
              <div className="flex items-center gap-2 justify-end">
                <span className='w-10'>{milestone.progress}%</span>
                <Progress value={milestone.progress} className="w-24" />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
