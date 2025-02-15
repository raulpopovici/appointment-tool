export const mockData = {
  categories: [
    {
      id: 'c1',
      name: 'Hair Services',
    },
    {
      id: 'c2',
      name: 'Nail Services',
    },
    {
      id: 'c3',
      name: 'Dental Care',
    },
    {
      id: 'c4',
      name: 'Automotive Services',
    },
  ],
  providers: [
    {
      id: 'p1',
      name: 'Salon A',
      location: 'Downtown',
      rating: 4.7,
      contact: '123-456-7890',
      services: [
        {
          id: 's1',
          categoryId: 'c1',
          name: 'Haircut',
          price: '$20',
          duration: '30 min',
        },
        {
          id: 's2',
          categoryId: 'c1',
          name: 'Hair Coloring',
          price: '$50',
          duration: '1 hr 30 min',
        },
        {
          id: 's3',
          categoryId: 'c2',
          name: 'Manicure',
          price: '$25',
          duration: '45 min',
        },
      ],
    },
    {
      id: 'p2',
      name: 'Bright Smile Dental',
      location: 'Medical Plaza',
      rating: 4.9,
      contact: '555-987-6543',
      services: [
        {
          id: 's4',
          categoryId: 'c3',
          name: 'Teeth Cleaning',
          price: '$90',
          duration: '1 hr',
        },
        {
          id: 's5',
          categoryId: 'c3',
          name: 'Cavity Filling',
          price: '$120',
          duration: '45 min',
        },
      ],
    },
    {
      id: 'p3',
      name: 'Speedy Auto Shop',
      location: 'Highway 12',
      rating: 4.5,
      contact: '555-432-1098',
      services: [
        {
          id: 's6',
          categoryId: 'c4',
          name: 'Oil Change',
          price: '$40',
          duration: '45 min',
        },
        {
          id: 's7',
          categoryId: 'c4',
          name: 'Brake Inspection',
          price: '$60',
          duration: '1 hr',
        },
      ],
    },
  ],
};
