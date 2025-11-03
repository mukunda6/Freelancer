"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Cell } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { milestones } from "@/lib/data"

const chartData = milestones.map(item => ({
    name: item.title.split(':')[0],
    progress: item.progress
}));

const chartConfig = {
  progress: {
    label: "Progress",
  },
} satisfies ChartConfig

const colors = ["#2563eb", "#f97316", "#22c55e", "#8b5cf6", "#ec4899"];

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
            <Bar dataKey="progress" radius={4}>
                {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
            </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
