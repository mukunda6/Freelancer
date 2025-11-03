"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { milestones } from "@/lib/data"

const chartData = milestones.map(item => ({
    name: item.title.split(':')[0],
    progress: item.progress,
    fill: `hsl(var(--chart-${milestones.indexOf(item) + 1}))`
}));


const chartConfig = {
  progress: {
    label: "Progress",
  },
} satisfies ChartConfig

export function ProjectOverview() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={chartData} margin={{ top: 20, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid vertical={false} />
            <XAxis
                dataKey="name"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                
            />
            <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}%`}
            />
            <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent 
                    labelClassName="font-bold text-foreground"
                    indicator="dot" 
                />}
            />
            <Bar dataKey="progress" radius={4} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
