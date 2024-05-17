import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/common/card';

export interface DashboardCardProps {
  title: string;
  content: string | number | JSX.Element;
  icon: JSX.Element;
}

export const DashboardCard = ({ title, content, icon }: DashboardCardProps) => {
  return (
    <Card className=''>
      <CardHeader className='flex flex-row items-center justify-between space-y-3'>
        <CardTitle className='text-sm font-medium'>{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className='text-2xl font-bold'>{content}</div>
      </CardContent>
    </Card>
  );
};
