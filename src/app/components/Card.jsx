import React from 'react';

const Card = ({ event,selected }) => {
  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{event.eventName}</h2>
        <p className="text-gray-600 mb-2">Category: {event.eventCategory}</p>
        <p className="text-gray-600 mb-2">Start Time: {event.startTime}</p>
        <p className="text-gray-600 mb-4">End Time: {event.endTime}</p>
        <button
  className={`${
    selected ? 'bg-red-500' : 'bg-green-500'
  } text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-green-500 rounded px-4 py-2`}
>
  {selected ? 'Remove' : 'Select'}
</button>

      </div>
    </div>
  );
};

export default Card;
