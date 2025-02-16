import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react'; // Icon for time display
import { Card } from './ui/card';

interface OpenTime {
  day: string;
  open: string;
  close: string;
}

const openTimes: OpenTime[] = [
  { day: 'Monday', open: '09:00 AM', close: '06:00 PM' },
  { day: 'Tuesday', open: '09:00 AM', close: '06:00 PM' },
  { day: 'Wednesday', open: '09:00 AM', close: '06:00 PM' },
  { day: 'Thursday', open: '09:00 AM', close: '06:00 PM' },
  { day: 'Friday', open: '09:00 AM', close: '06:00 PM' },
  { day: 'Saturday', open: '10:00 AM', close: '04:00 PM' },
  { day: 'Sunday', open: 'Closed', close: 'Closed' },
];

export const OpenTimesComponent = () => {
  const [currentDay, setCurrentDay] = useState('');

  useEffect(() => {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    setCurrentDay(today);
  }, []);

  return (
    <Card className="flex space-y-2 p-4 flex-col">
      <span className="flex self-center p-2 font-semibold text-xl">
        Business Hours
      </span>
      {openTimes.map((time) => (
        <li
          key={time.day}
          className={`flex justify-between p-2 rounded-md ${
            currentDay === time.day ? 'font-semibold' : ''
          }`}
        >
          <span>{time.day}</span>
          <span>
            {time.open === 'Closed' ? (
              <span className="text-red-500">Closed</span>
            ) : (
              `${time.open} - ${time.close}`
            )}
          </span>
        </li>
      ))}
    </Card>
  );
};
