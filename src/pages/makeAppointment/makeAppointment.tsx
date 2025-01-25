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
};

const initialState = {
  filters: {
    service: '',
    serviceDetails: '',
    provider: '',
    dayTime: '',
  },
};

const slots = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM'];

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

  const filtersPopulated =
    state.filters.service &&
    state.filters.serviceDetails &&
    state.filters.provider &&
    state.filters.dayTime;

  return (
    <div className="bg-[#F4F8F9] h-screen w-full pr-72 pl-72 pt-24 flex flex-col space-y-12 text-[#144066">
      <div className="bg-white rounded-lg shadow-sm pr-3 pl-3 py-4 flex flex-row space-x-8 items-center">
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

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="#1C7ED6"
          className="size-6 justify-self-end"
        >
          <path
            fill-rule="evenodd"
            d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
            clip-rule="evenodd"
          />
        </svg>
        <div>Location</div>
      </div>
      {filtersPopulated && (
        <div className="flex flex-row space-x-8">
          <Calendar className="bg-white rounded-lg shadow-sm max-w-[310px] max-h-[418px]" />
          <div className="rounded-lg shadow-sm bg-white max-h-[418px] grow">
            <div className="flex p-8 pb-4 items-center space-x-6 ">
              <div>
                {state?.filters?.dayTime === 'morning' ||
                state?.filters?.dayTime === 'afternoon' ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill={
                      state?.filters.dayTime === 'morning'
                        ? '#F59E0B'
                        : '#F97316'
                    }
                    className="size-8"
                  >
                    <path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.758 17.303a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12ZM6.697 7.757a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#3B82F6"
                    className="size-8"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                )}
              </div>
              <div>
                <div className="font-semibold text-[#144066]">
                  {getDayTimeDescription(state?.filters?.dayTime ?? 'morning')}
                </div>
                <div className="text-sm text-[#4E666A]">
                  {getDayTimeHours(state?.filters?.dayTime ?? 'morning')}
                </div>
              </div>
            </div>
            <div className="w-[calc(100% - 2rem)]  bg-[#e0e0e0] h-[0.5px] justify-self-center" />

            <div className="p-8 pt-4 flex flex-col gap-4 over">
              {slots?.length > 0 ? (
                slots.map((slot) => (
                  <AppointmentSlot
                    key={slot} // Add a key to avoid React warnings
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
