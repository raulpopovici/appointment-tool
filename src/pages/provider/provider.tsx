import image1 from '../../assets/photoTest.png';
import salon1 from '../../assets/salon1.jpeg';
import { useUser } from '../../hooks/useUser';
import { mockData } from '../../mocks/mocks';
import { StarRating } from '../../components/ui/starRating';
import { Toggle } from '../../components/ui/toggle';
import { useState } from 'react';
import { Category, Provider, Service } from '../../context/userContext';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { useNavigate } from 'react-router-dom';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '../../components/ui/avatar';

export const ProviderPage = () => {
  const {
    selectedProvider,
    selectedCategory,
    setSelectedService,
    setSelectedCategory,
    setSelectedProvider,
  } = useUser();
  const [categoryId, setCategoryId] = useState<string>(
    selectedCategory?.id ?? '',
  );
  const navigate = useNavigate();
  const categories = mockData.categories;
  const providerCategories = Array.from(
    new Set(
      selectedProvider?.services.map((service) =>
        categories.find((category) => category.id === service.categoryId),
      ),
    ),
  );

  const services = selectedProvider?.services.filter(
    (service) => service.categoryId === categoryId,
  );

  const category = categories.find((category) => category.id === categoryId);

  const handleSelect = (
    provider: Provider | null,
    category: Category | null,
    service: Service | null,
  ) => {
    setSelectedProvider(provider);
    setSelectedCategory(category);
    setSelectedService(service);
  };

  return (
    <div className="grow h-full w-full p-24 pt-[80px] flex items-center flex-col space-y-8 text-[#144066]">
      <div className="bg-white flex flex-col space-y-4 w-full max-w-[1200px]">
        <div className="flex flex-col space-y-1 w-full">
          <span className="text-4xl font-bold">{selectedProvider?.name}</span>
          <div className="flex flex-row items-center space-x-2">
            <span className="text-sm font-bold text-gray-500">
              {selectedProvider?.rating}
            </span>
            <StarRating rating={selectedProvider?.rating ?? 0} />
            <span className="text-sm text-gray-500">
              ({selectedProvider?.numberOfRatings ?? 0}) •{' '}
              {selectedProvider?.location}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 w-full">
          <div className="col-span-2 w-full aspect-[3/2] bg-blue-500 rounded-md transition-all duration-300 ease-in-out"></div>

          <div className="flex flex-col gap-4 w-full">
            <div className="w-full bg-red-500 rounded-md flex-1"></div>
            <div className="w-full bg-green-500 rounded-md flex-1"></div>
          </div>
        </div>

        <div className="grid grid-cols-3 space-y-4 w-full">
          <div className="col-span-2 pt-12 flex flex-col space-y-12 w-full">
            <div className="flex flex-col space-y-4 w-full">
              <span className="text-3xl font-bold">Services</span>
              <div className="flex flex-row space-x-4 w-full">
                {providerCategories?.map((category) => (
                  <div
                    className={`font-semibold px-4 py-2 rounded-3xl flex items-center transition-colors duration-300 cursor-pointer ${
                      categoryId === category?.id
                        ? 'bg-[#144066] text-white font-semibold hover:bg-[#144066]/90' // Selected background
                        : ' text-[#144066] font-semibold hover:bg-[#144066]/10' // Default with hover effect
                    }`}
                    onClick={() => setCategoryId(category?.id ?? '')} // Set selected category
                  >
                    {category?.name}
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-4 w-full">
                {services?.map((service) => (
                  <Card
                    key={service.id}
                    className="p-4 flex items-center justify-between w-full shadow-none bg-white transition transform hover:scale-[1.02] cursor-pointer"
                  >
                    <div className="flex flex-col">
                      <span className="font-semibold text-lg text-gray-800">
                        {service.name}
                      </span>
                      <span className="text-gray-500">
                        {service.duration} • {service.price}
                      </span>
                    </div>

                    <Button
                      variant="callToAction"
                      className="bg-[#144066] hover:bg-[#144066]/90"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelect(
                          selectedProvider,
                          category ?? null,
                          service,
                        );
                        navigate('/make-an-appointment');
                      }}
                    >
                      Book Now
                    </Button>
                  </Card>
                ))}
              </div>
            </div>
            <div>
              <span className="text-3xl font-bold ">About</span>
            </div>
          </div>
          <div className="flex pt-12 pl-8 flex-col space-y-4 w-full">
            <span className="text-3xl font-bold">Team</span>
            <div className="flex flex-wrap gap-3">
              <div className="flex flex-col items-center gap-2">
                <Avatar className="h-[80px] w-[80px]">
                  <AvatarImage src="" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span className="text-sm font-semibold">Cindy</span>
              </div>

              <div className="flex flex-col items-center gap-2">
                <Avatar className="h-[80px] w-[80px]">
                  <AvatarImage src="" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <span className="text-sm font-semibold">John</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Avatar className="h-[80px] w-[80px]">
                  <AvatarImage src="" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <span className="text-sm font-semibold">Alice</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
