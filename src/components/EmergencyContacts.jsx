import { useState } from 'react';
import { PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

export default function EmergencyContacts() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Contacts' },
    { id: 'police', name: 'Police' },
    { id: 'medical', name: 'Medical' },
    { id: 'rescue', name: 'Rescue Teams' },
  ];

  const contacts = [
    {
      id: 1,
      name: 'Emergency Police Hotline',
      category: 'police',
      phone: '911',
      email: 'emergency@police.gov',
      address: 'Police Headquarters, City Center',
      available: true,
    },
    {
      id: 2,
      name: 'City General Hospital',
      category: 'medical',
      phone: '555-0123',
      email: 'emergency@citygeneral.com',
      address: '123 Healthcare Ave',
      available: true,
    },
    {
      id: 3,
      name: 'Mountain Rescue Team',
      category: 'rescue',
      phone: '555-0124',
      email: 'rescue@mountains.org',
      address: 'Mountain Base Station',
      available: true,
    },
    // Add more contacts as needed
  ];

  const filteredContacts = contacts.filter(
    (contact) => selectedCategory === 'all' || contact.category === selectedCategory
  );

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="flex space-x-2 rounded-lg bg-secondary p-1">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`rounded-md px-3 py-1.5 text-sm font-medium ${
              selectedCategory === category.id
                ? 'bg-primary text-secondary'
                : 'text-primary hover:bg-secondary-light'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Contacts Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredContacts.map((contact) => (
          <div
            key={contact.id}
            className="relative rounded-lg bg-secondary p-4 shadow-lg"
          >
            <div
              className={`absolute right-4 top-4 h-3 w-3 rounded-full ${
                contact.available ? 'bg-green-500' : 'bg-red-500'
              }`}
            />
            <h3 className="text-lg font-medium text-primary">{contact.name}</h3>
            <p className="mt-1 text-sm capitalize text-primary-dark">
              {contact.category}
            </p>
            <div className="mt-4 space-y-2">
              <a
                href={`tel:${contact.phone}`}
                className="flex items-center text-primary hover:text-primary-dark"
              >
                <PhoneIcon className="mr-2 h-5 w-5" />
                {contact.phone}
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center text-primary hover:text-primary-dark"
              >
                <EnvelopeIcon className="mr-2 h-5 w-5" />
                {contact.email}
              </a>
            </div>
            <div className="mt-4">
              <p className="text-sm text-primary-dark">{contact.address}</p>
            </div>
            <div className="mt-4 flex space-x-2">
              <button className="flex-1 rounded bg-primary px-3 py-1.5 text-sm text-secondary hover:bg-primary-dark">
                Call Now
              </button>
              <button className="flex-1 rounded bg-secondary-light px-3 py-1.5 text-sm text-primary hover:bg-secondary">
                Send Message
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}