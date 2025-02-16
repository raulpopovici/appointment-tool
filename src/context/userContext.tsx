import React, { createContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
}

interface UserContextType {
  isLoggedIn: boolean;
  user: User | null;
  login: (userData: User) => void;
  selectedProvider: Provider | null;
  setSelectedProvider: (provider: Provider | null) => void;
  selectedCategory: Category | null;
  setSelectedCategory: (category: Category | null) => void;
  selectedService: Service | null;
  setSelectedService: (service: Service | null) => void;
}

export type Category = {
  id: string;
  name: string;
};

export type Service = {
  id: string;
  name: string;
  categoryId: string;
  duration: string;
  price: string;
};

export type Provider = {
  id: string;
  name: string;
  location: string;
  contact: string;
  rating: number;
  numberOfRatings: number;
  services: Service[];
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(
    null,
  );

  const login = (userData: User) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        user,
        login,
        selectedProvider,
        setSelectedProvider,
        selectedCategory,
        setSelectedCategory,
        selectedService,
        setSelectedService,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
