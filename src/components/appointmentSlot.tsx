type AppointmentSlotProps = {
  hour: string;
  isSelected: boolean;
  onSelect: () => void;
};

export const AppointmentSlot = ({
  hour,
  isSelected,
  onSelect,
}: AppointmentSlotProps) => {
  return (
    <div
      onClick={onSelect}
      className={`hover:cursor-pointer rounded-lg justify-center shadow-sm w-full w-full max-w-[250px] pb-3 pt-3 pr-4 pl-4 flex flex-row items-center space-x-4 ${
        isSelected
          ? 'bg-gradient-to-r from-[#1C7ED6] via-[#63A3D9] to-[#A9D6F7] text-white'
          : 'bg-white text-[#1C7ED6] border-[1px] border-[#1C7ED6]'
      }`}
    >
      {isSelected ? (
        // Arrow Icon for Selected State
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="white"
          className="h-3.5 w-3.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
          />
        </svg>
      ) : (
        // Circle for Unselected State
        <div className="w-3.5 h-3.5 rounded-full border-[1.5px] border-[#1C7ED6]" />
      )}
      <span className="text-sm font-medium">{hour}</span>
    </div>
  );
};
