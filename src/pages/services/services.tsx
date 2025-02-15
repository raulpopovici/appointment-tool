import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { useUser } from '../../hooks/useUser';
import { useNavigate } from 'react-router-dom';
import { mockData } from '../../mocks/mocks'; // Encapsulated JSON

export const Services = () => {
  const { setSelectedProvider } = useUser();
  const navigate = useNavigate();

  const { categories, providers } = mockData; // Extract categories & providers

  return (
    <div className="grow h-full w-full p-24 pt-[80px] flex items-center flex-col space-y-8 text-[#144066]">
      <div className="bg-white flex flex-col space-y-6 w-full max-w-[1200px]">
        <span className="text-2xl font-bold">Services</span>

        <div className="space-y-12 w-full">
          {categories.map((category) => (
            <div key={category.id} className="border-b pb-6 w-full">
              {/* Category Name */}
              <h2 className="text-lg font-semibold">{category.name}</h2>

              {/* List all providers offering services in this category */}
              <div className="mt-4 flex flex-wrap gap-6">
                {providers.flatMap((provider) =>
                  provider.services
                    .filter((service) => service.categoryId === category.id)
                    .map((service) => (
                      <Card
                        key={`${provider.id}-${service.id}`}
                        className="p-4 flex items-center justify-between w-full shadow-none bg-white transition transform hover:scale-[1.02] cursor-pointer"
                        onClick={() => {
                          setSelectedProvider(provider.id);
                          navigate('/provider');
                        }}
                      >
                        {/* Left Section - Service Details */}
                        <div className="flex flex-col">
                          <span className="font-semibold text-lg text-gray-800">
                            {service.name}
                          </span>
                          <span className="text-gray-500">
                            {service.duration} • {service.price}
                          </span>

                          <div className="flex flex-row items-center space-x-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="#1C7ED6"
                              className="size-5"
                            >
                              <path
                                fillRule="evenodd"
                                d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-sm">{provider.location}</span>
                          </div>
                        </div>

                        {/* Right Section - Provider Info & Book Button */}
                        <div className="flex flex-col items-end space-y-2">
                          <span className="text-gray-600 text-sm">
                            {provider.name} ⭐ {provider.rating}
                          </span>
                          <Button
                            variant="callToAction"
                            className="bg-[#144066] hover:bg-[#144066]/90"
                          >
                            Book Now
                          </Button>
                        </div>
                      </Card>
                    )),
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
