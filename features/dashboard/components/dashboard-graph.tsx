import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/common/card';

import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from 'recharts';

export interface DashboardGraphProps {
  title: string;
  data: any[];
}

export const DashboardGraph = ({ title, data }: DashboardGraphProps) => {
  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-3'>
        <CardTitle className='text-sm font-medium'>{title}</CardTitle>
      </CardHeader>
      <CardContent className='pl-2'>
        <ResponsiveContainer width='100%' height={350}>
          <BarChart data={data}>
            <XAxis
              dataKey='name'
              stroke='#000'
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke='#000'
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
            />
            <Bar dataKey='total' fill='#000' radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
