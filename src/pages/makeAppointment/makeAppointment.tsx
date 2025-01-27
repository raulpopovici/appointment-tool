import { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Calendar } from '../../components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { AppointmentSlot } from '../../components/appointmentSlot';

type MakeAppointmentFilters = {
  service: string;
  serviceDetails: string;
  provider: string;
  dayTime: string;
};

type MakeAppointmentState = {
  filters: MakeAppointmentFilters;
  selectedSlot: string;
  selectedDate: Date;
};

const initialState: MakeAppointmentState = {
  filters: {
    service: '',
    serviceDetails: '',
    provider: '',
    dayTime: '',
  },
  selectedSlot: '',
  selectedDate: new Date(),
};

const slots = [
  '9:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '19:00 AM',
  '93:00 AM',
  '211:00 AM',
  '122:00 PM',
  '122:00 PM',
  '122:00 PM',
  '122:00 PM',
];

function getDayTimeDescription(dayTime: string): string {
  switch (dayTime) {
    case 'morning':
      return 'Morning';
    case 'evening':
      return 'Evening';
    case 'afternoon':
      return 'Afternoon';
    default:
      return 'Evening';
  }
}

function getDayTimeHours(dayTime: string): string {
  switch (dayTime) {
    case 'morning':
      return '9:00 AM to  12:00 PM';
    case 'evening':
      return '5:00 PM to 12:00 AM';
    case 'afternoon':
      return '12:00 PM to 5:00 PM';
    default:
      return '5:00 PM to 12:00 AM';
  }
}

export const MakeAppointment = () => {
  const [state, setState] = useState(initialState as MakeAppointmentState);
  const handleChangeFilters = (
    key: keyof MakeAppointmentFilters,
    value: string,
  ) => {
    setState((prevState) => {
      const newFilters = { ...prevState.filters, [key]: value };

      // Reset and disable dependent filters based on the current key
      if (key === 'service') {
        newFilters.serviceDetails = ''; // Reset serviceDetails when service changes
        newFilters.provider = ''; // Reset provider when service changes
        newFilters.dayTime = ''; // Reset dayTime when service changes
      } else if (key === 'serviceDetails') {
        newFilters.provider = ''; // Reset provider when serviceDetails changes
        newFilters.dayTime = ''; // Reset dayTime when serviceDetails changes
      } else if (key === 'provider') {
        newFilters.dayTime = ''; // Reset dayTime when provider changes
      }

      return {
        ...prevState,
        filters: newFilters,
      };
    });
  };

  const handleSelect = (slot: string) => {
    setState((prevState) => ({
      ...prevState,
      selectedSlot: slot,
    }));
  };

  const handleDateChange = (date: Date | undefined) => {
    console.log('Date selected:', date);
    if (date) {
      setState((prevState) => ({
        ...prevState,
        selectedDate: date,
      }));
      console.log('Date selected:', date);
    }
  };

  const getOrdinalSuffix = (day: number): string => {
    if (day > 3 && day < 21) return 'th'; // Handles 11th - 19th
    switch (day % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  };

  const filtersPopulated =
    state.filters.service &&
    state.filters.serviceDetails &&
    state.filters.provider &&
    state.filters.dayTime;

  const weekday = state?.selectedDate?.toLocaleDateString('en-US', {
    weekday: 'long',
  });
  const day = state?.selectedDate?.getDate();
  const formattedDate = `${weekday}, ${day}${getOrdinalSuffix(day)}`;

  return (
    <div className="bg-[#F4F8F9] h-screen w-full p-24 flex items-center  flex-col space-y-8 text-[#144066]">
      <div className="bg-white rounded-lg shadow-sm p-3 flex flex-row space-x-8 items-center w-full max-w-[1200px]">
        <Select
          value={state?.filters?.service}
          onValueChange={(value) => handleChangeFilters('service', value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="dentists">Dentists</SelectItem>
            <SelectItem value="mechanic">Mechanic</SelectItem>
            <SelectItem value="hairstylist">Hairstylist</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={state?.filters?.serviceDetails}
          onValueChange={(value) =>
            handleChangeFilters('serviceDetails', value)
          }
          disabled={!state.filters.service} // Disable if service is not selected
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Service Details 1</SelectItem>
            <SelectItem value="dark">Service Details 2</SelectItem>
            <SelectItem value="system">Service Details 3</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={state?.filters?.provider}
          onValueChange={(value) => handleChangeFilters('provider', value)}
          disabled={!state.filters.serviceDetails} // Disable if serviceDetails is not selected
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select provider" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="provider1">Provider 1</SelectItem>
            <SelectItem value="provider2">Provider 2</SelectItem>
            <SelectItem value="provider3">Provider 3</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={state?.filters?.dayTime}
          onValueChange={(value) => handleChangeFilters('dayTime', value)}
          disabled={!state.filters.provider} // Disable if provider is not selected
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time of day" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="morning">Morning</SelectItem>
            <SelectItem value="afternoon">Afternoon</SelectItem>
            <SelectItem value="evening">Evening</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {filtersPopulated && (
        <div className="flex bg-white h-[600px] rounded-md shadow-sm flex-row w-full max-w-[1200px]">
          <div className="flex flex-col w-[25%] p-6 space-y-6">
            <span className="text-xl font-semibold">Oil Change</span>
            <div className="flex flex-row space-x-2 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <span className="text-sm ">30 minutes</span>
            </div>
            <div className="flex flex-col">
              <div className=" flex flex-row items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#1C7ED6"
                  className="size-5"
                >
                  <path
                    fill-rule="evenodd"
                    d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span className="text-sm ">
                  Intrarea Virgil Simionescu nr 8A sc A ap 7
                </span>
              </div>
            </div>
            <div className="space-x-1">
              <span className="inline text-sm font-semibold">Heads-up:</span>
              <span className="inline text-sm">
                Be sure to arrive at least 10 minutes early to get settled
                before your appointment.
              </span>
            </div>
            <span className="text-sm">
              If you need to reschedule or cancel, please let us know at least
              24 hours in advance to avoid any fees.
            </span>
            <span className="text-sm">See you there!</span>
          </div>
          <div className="w-[50%] border-l border-r p-6 flex flex-col space-y-6">
            <span className="text-sm font-semibold">Select Day & Time</span>
            <div className="flex">
              <Calendar
                className="bg-white w-full"
                selected={state.selectedDate}
                onDayClick={(date: Date | undefined) => {
                  handleDateChange(date); // Triggers when a date is selected
                }}
              />
            </div>
          </div>
          <div className="w-[25%] p-6 flex flex-col space-y-6">
            <span className="text-sm font-semibold">{formattedDate}</span>
            <div className="flex flex-col gap-4 overflow-y-auto overflow-x-hidden">
              {slots?.length > 0 ? (
                slots.map((slot) => (
                  <AppointmentSlot
                    key={slot} // Add a  key to avoid React warnings
                    hour={slot}
                    isSelected={state.selectedSlot === slot}
                    onSelect={() => handleSelect(slot)}
                  />
                ))
              ) : (
                <p className="text-sm text-center text-[#4E666A]">
                  No available slots. Please adjust the filters.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
      {filtersPopulated && (
        <Button
          variant="callToAction"
          className="w-72 h-12 rounded-2xl self-center mt-72"
        >
          Next step
        </Button>
      )}

      {/* <button className="w-72 self-center relative overflow-hidden text-white font-bold shadow-lg px-6 py-3 rounded-lg transition-transform transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1864AB] bg-gradient-to-r from-blue-500 to-blue-600">
        <span className="relative z-10">Continue as guest</span>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 opacity-50 rounded-lg transition-transform duration-500 clip-path-wave"></div>
      </button> */}
    </div>
  );
};
