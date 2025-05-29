// src/components/HistoryBanner.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const panels = [
  {
    id: 1,
    title: 'Indus Valley',
    image: '/indus.jpg',
    section: 'ancient',
    slug: 'indus-valley',
  },
  {
    id: 2,
    title: 'Maurya Empire',
    image: '/maurya.jpg',
    section: 'ancient',
    slug: 'maurya-empire',
  },
  {
    id: 3,
    title: 'Gupta Period',
    image: '/gupta.jpg',
    section: 'ancient',
    slug: 'gupta-period',
  },
  {
    id: 4,
    title: 'Mughal Era',
    image: '/mughal.jpg',
    section: 'medieval',
    slug: 'mughal-era',
  },
  {
    id: 5,
    title: 'British Raj',
    image: '/british.jpg',
    section: 'modern',
    slug: 'british-raj',
  },
  {
    id: 6,
    title: 'Modern India',
    image: '/modern.jpg',
    section: 'modern',
    slug: 'modern-india',
  },
];

const HistoryBanner = () => {
  return (
    <div className="w-full flex h-40 overflow-hidden group">
      {panels.map((panel) => (
        <Link
          key={panel.id}
          to={`/history/${panel.section}/${panel.slug}`}
          className="flex-1 relative overflow-hidden transition-all duration-500 ease-in-out hover:flex-[3] cursor-pointer"
        >
          <img
            src={panel.image}
            alt={panel.title}
            className="object-cover w-full h-full transition-transform duration-500 scale-100 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          <div className="absolute bottom-4 left-4 z-10 text-white">
            <h3 className="text-xl font-bold drop-shadow-md">{panel.title}</h3>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default HistoryBanner;
