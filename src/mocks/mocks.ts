export const mockData = {
  categories: [
    {
      id: 'c1',
      name: 'Hair',
    },
    {
      id: 'c2',
      name: 'Nail',
    },
    {
      id: 'c3',
      name: 'Dental',
    },
    {
      id: 'c4',
      name: 'Automotive',
    },
  ],
  providers: [
    {
      id: 'p1',
      name: 'Salon A',
      location: 'Downtown',
      rating: 4.7,
      contact: '123-456-7890',
      numberOfRatings: 100,
      about:
        'Salon A is a luxurious hair and beauty salon located in the heart of Downtown. We specialize in a variety of hair services, including precision haircuts, balayage, keratin treatments, and vibrant hair coloring. Our highly skilled stylists undergo continuous training to stay up-to-date with the latest industry trends, ensuring that our clients receive modern and stylish makeovers. At Salon A, we pride ourselves on using high-quality, chemical-free hair care products that nourish and protect your hair. ' +
        'In addition to hair services, we also offer expert manicures and pedicures, making us your one-stop beauty destination. Whether you are looking for a bold transformation or a simple refresh, our professional team is here to help you achieve the look you desire. We also provide personalized consultations to match your hair type and lifestyle. Our salon offers a warm and relaxing ambiance, making your beauty experience as enjoyable as possible. Join our many satisfied customers who trust us for all their beauty needs!',
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
      numberOfRatings: 100,
      about:
        'Bright Smile Dental is a highly-rated dental clinic dedicated to providing exceptional oral care to patients of all ages. Located in the prestigious Medical Plaza, we specialize in comprehensive dental services, including teeth cleaning, cavity fillings, cosmetic dentistry, orthodontics, and emergency dental care. Our team of experienced and compassionate dentists is committed to using state-of-the-art technology and advanced procedures to ensure pain-free treatments and long-lasting oral health. ' +
        'We believe in preventative care and offer personalized dental plans tailored to each patient’s needs. At Bright Smile Dental, patient comfort is our priority. Our clinic is designed with modern amenities to create a relaxing and stress-free experience. We also offer sedation dentistry for those who experience dental anxiety. Whether you need a routine check-up or a complete smile makeover, our skilled professionals will help you achieve optimal oral health. Book your appointment today and discover why we are one of the most trusted dental clinics in the city!',
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
      numberOfRatings: 100,
      about:
        'Speedy Auto Shop is your trusted partner for reliable and efficient car maintenance and repair services. Conveniently located on Highway 12, we have been serving the community for over a decade with our expert automotive solutions. Our team of certified mechanics specializes in oil changes, brake inspections, engine diagnostics, tire rotations, transmission repairs, and full-service vehicle maintenance. We take pride in our transparent pricing, honest recommendations, and quick turnaround times, ensuring that you get back on the road safely and efficiently. ' +
        'At Speedy Auto Shop, customer satisfaction is our top priority. We use high-quality parts and the latest diagnostic tools to accurately assess and repair your vehicle. Whether you drive a compact car, SUV, or a heavy-duty truck, we have the expertise to keep your vehicle running smoothly. We also offer seasonal maintenance packages and emergency roadside assistance for your convenience. Our friendly staff is always ready to provide expert advice and exceptional service. Visit Speedy Auto Shop today and experience the difference!',
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
