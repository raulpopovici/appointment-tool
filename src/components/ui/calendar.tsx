import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DayPicker } from 'react-day-picker';

import { cn } from '../../lib/utils';
import { buttonVariants } from '../../components/ui/button';
import { format } from 'date-fns';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      className={cn('p-4', className)}
      showOutsideDays
      formatters={{
        formatWeekdayName: (day) =>
          day?.toLocaleDateString('en-US', { weekday: 'short' }),
        formatCaption: (date, options) => format(date, 'LLLL yyyy', options),
      }}
      classNames={{
        months: '',
        month: 'space-y-6',
        caption: 'flex  pt-2 relative items-center',
        caption_label: 'text-base font-semibold grow',
        nav: 'space-x-2 flex items-center',
        nav_button: cn(
          buttonVariants({ variant: 'outline' }),
          'h-9 w-9 bg-transparent p-0 opacity-60 hover:opacity-100',
        ),
        nav_button_previous: 'flex',
        nav_button_next: 'flex',
        table: 'w-full border-collapse space-y-2',
        head_row: 'flex justify-between text-[#4E666A]',
        head_cell:
          'text-[#144066] rounded-md w-10 text-sm text-center font-bold', // Centered single-letter day names
        row: 'flex w-full mt-3 justify-between',
        cell: cn(
          'relative p-0 text-center text-base focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md',
          props.mode === 'range'
            ? '[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md'
            : '[&:has([aria-selected])]:rounded-md',
        ),
        day: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-10 w-10 p-0 font-medium aria-selected:opacity-100 text-[#4E666A] border',
        ),
        day_range_start: 'day-range-start',
        day_range_end: 'day-range-end',
        day_selected:
          'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
        day_today: 'bg-[#FF8C42] text-white',
        day_outside:
          'day-outside text-[#94A3A5] hover:bg-white hover:text-[#94A3A5] pointer-events-none',

        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft className={cn('h-5 w-5', className)} {...props} />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight className={cn('h-5 w-5', className)} {...props} />
        ),
      }}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
