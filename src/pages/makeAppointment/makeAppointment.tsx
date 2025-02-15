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
import { Input } from '../../components/ui/input';
import { Checkbox } from '../../components/ui/checkbox';
import { mockData } from '../../mocks/mocks'; // New structured data
import { useUser } from '../../hooks/useUser';
import { Category, Provider, Service } from '../../context/userContext';

type MakeAppointmentState = {
  selectedSlot: string;
  selectedDate: Date;
  isSecondStep: boolean;
};

const initialState: MakeAppointmentState = {
  selectedSlot: '',
  selectedDate: new Date(),
  isSecondStep: false,
};

const slots = [
  '9:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '1:00 PM',
  '2:00 PM',
  '3:00 PM',
  '4:00 PM',
  '5:00 PM',
];

export const MakeAppointment = () => {
  const [state, setState] = useState(initialState);
  const {
    selectedCategory,
    setSelectedCategory,
    selectedService,
    setSelectedService,
    selectedProvider,
    setSelectedProvider,
  } = useUser();

  const handleCategoryChange = (categoryId: string) => {
    const category =
      mockData.categories.find((c) => c.id === categoryId) || null;
    setSelectedCategory(category);
    setSelectedService(null); // Reset service
    setSelectedProvider(null); // Reset provider
  };

  const handleServiceChange = (serviceId: string) => {
    const service =
      mockData.providers
        .flatMap((provider) => provider.services)
        .find((s) => s.id === serviceId) || null;

    setSelectedService(service);
    setSelectedProvider(null); // Reset provider when service changes
  };

  const handleProviderChange = (providerId: string) => {
    const provider =
      mockData.providers.find((p) => p.id === providerId) || null;
    setSelectedProvider(provider);
  };

  const handleSelect = (slot: string) => {
    setState((prevState) => ({
      ...prevState,
      selectedSlot: slot,
    }));
  };

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setState((prevState) => ({
        ...prevState,
        selectedDate: date,
      }));
    }
  };

  const getOrdinalSuffix = (day: number): string => {
    if (day > 3 && day < 21) return 'th';
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

  const handleButtonClick = () => {
    setState((prevState) => ({
      ...prevState,
      isSecondStep: !prevState.isSecondStep,
    }));
  };

  const formattedDateTime = `${state.selectedDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })} at ${state.selectedSlot}`;

  const { categories, providers } = mockData;

  const availableServices = selectedCategory
    ? mockData.providers.flatMap((provider) =>
        provider.services.filter((s) => s.categoryId === selectedCategory.id),
      )
    : [];

  const availableProviders = mockData.providers.filter((provider) =>
    provider.services.some(
      (s) =>
        s.id === selectedService?.id && s.categoryId === selectedCategory?.id,
    ),
  );

  return (
    <div className="bg-[#F4F8F9] grow h-full min-h-screen w-full p-24 flex items-center flex-col space-y-8 text-[#144066]">
      <div className="bg-white rounded-md shadow-sm p-3 flex flex-row space-x-8 items-center justify-center w-full max-w-[800px]">
        <Select
          value={selectedCategory?.id ?? ''}
          onValueChange={handleCategoryChange}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={selectedService?.id ?? ''}
          disabled={!selectedCategory}
          onValueChange={handleServiceChange}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select service" />
          </SelectTrigger>
          <SelectContent>
            {availableServices.map((service) => (
              <SelectItem key={service.id} value={service.id}>
                {service.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={selectedProvider?.id ?? ''}
          onValueChange={handleProviderChange}
          disabled={!selectedService}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select provider" />
          </SelectTrigger>
          <SelectContent>
            {availableProviders.map((provider) => (
              <SelectItem key={provider.id} value={provider.id}>
                {provider.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedProvider && (
        <div className="flex bg-white h-[600px] rounded-md shadow-sm flex-row w-full max-w-[1200px]">
          <div className="flex flex-col w-[25%] p-6 space-y-6">
            <span className="text-xl font-semibold">
              {selectedService?.name ?? ''}
            </span>
            <div className="flex flex-row space-x-2 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#1C7ED6"
                className="size-5"
              >
                <path
                  fill-rule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z"
                  clip-rule="evenodd"
                />
              </svg>

              <span className="text-sm ">
                {selectedService?.duration ?? ''}
              </span>
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
                  {selectedProvider?.location ?? ''}
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <div className=" flex flex-row items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#1C7ED6"
                  className="size-5"
                >
                  <path d="M12 7.5a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" />
                  <path
                    fill-rule="evenodd"
                    d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 0 1 1.5 14.625v-9.75ZM8.25 9.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM18.75 9a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V9.75a.75.75 0 0 0-.75-.75h-.008ZM4.5 9.75A.75.75 0 0 1 5.25 9h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H5.25a.75.75 0 0 1-.75-.75V9.75Z"
                    clip-rule="evenodd"
                  />
                  <path d="M2.25 18a.75.75 0 0 0 0 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 0 0-.75-.75H2.25Z" />
                </svg>

                <span className="text-sm ">{selectedService?.price ?? ''}</span>
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
              If you need to reschedule or cancel, please let us know as soon as
              possible.
            </span>
            <span className="text-sm">See you there!</span>
          </div>

          {!state.isSecondStep ? (
            <>
              <div className="w-[50%] border-l border-r p-6 flex flex-col space-y-6">
                <span className="text-sm font-semibold">Select Day & Time</span>
                <Calendar
                  selected={state.selectedDate}
                  onDayClick={handleDateChange}
                />
              </div>
              <div className="w-[25%] p-6 flex flex-col space-y-6">
                <div className="flex flex-col gap-4 overflow-y-auto overflow-x-hidden">
                  {slots.map((slot) => (
                    <AppointmentSlot
                      key={slot}
                      hour={slot}
                      isSelected={state.selectedSlot === slot}
                      onSelect={() => handleSelect(slot)}
                    />
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="border-l flex flex-col space-y-6 p-6 h-full grow">
              <div className="flex flex-row">
                <span className="text-sm font-semibold flex grow">
                  Date & Time
                </span>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="size-6 cursor-pointer"
                    onClick={() => handleButtonClick()}
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                    />
                  </svg>
                </div>
              </div>

              <div className="flex row space-x-2 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6.75 2.994v2.25m10.5-2.25v2.25m-14.252 13.5V7.491a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v11.251m-18 0a2.25 2.25 0 0 0 2.25 2.25h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5m-6.75-6h2.25m-9 2.25h4.5m.002-2.25h.005v.006H12v-.006Zm-.001 4.5h.006v.006h-.006v-.005Zm-2.25.001h.005v.006H9.75v-.006Zm-2.25 0h.005v.005h-.006v-.005Zm6.75-2.247h.005v.005h-.005v-.005Zm0 2.247h.006v.006h-.006v-.006Zm2.25-2.248h.006V15H16.5v-.005Z"
                  />
                </svg>
                <span className="text-sm">{formattedDateTime}</span>
              </div>

              <div className="flex flex-col">
                <div className="flex flex-row space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="size-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                    />
                  </svg>

                  <span className="text-sm">Phone number</span>
                </div>

                <span className="text-[12px] ml-[27px] text-[#8B99AE]">
                  Enter the phone number for receiving checkup-related details
                </span>
                <Input className="ml-[26px] max-w-[250px]"></Input>

                <div className="flex flex-row mt-[20px] space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="size-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z"
                    />
                  </svg>

                  <span className="text-sm">Email</span>
                </div>

                <span className="text-[12px] text-[#8B99AE] ml-[27px]">
                  Enter the email address for receiving checkup-related details
                </span>
                <Input className=" max-w-[250px] ml-[26px]" />

                <div className="items-top flex space-x-2 mt-[20px] text-sm text-[#8B99AE]">
                  * By providing your contact details, you agree to receive
                  communications from us via email and phone.
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {selectedProvider && (
        <Button
          variant="callToAction"
          className="w-72 h-12 rounded-2xl self-center mt-72"
          onClick={handleButtonClick}
        >
          {state.isSecondStep ? 'Book appointment' : 'Next step'}
        </Button>
      )}
    </div>
  );
};
