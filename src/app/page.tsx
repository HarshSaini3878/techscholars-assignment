"use client";

import React, { useState } from "react";
import Events from "../data/events";
// Adjust import path as needed

interface Event {
  id: number;
  event_name: string;
  event_category: string;
  start_time: string;
  end_time: string;
}

const Page: React.FC = () => {
  const [selectedEvents, setSelectedEvents] = useState<Event[]>([]);
  const [totalEvents,setTotalEvents] = useState<Event[]>(Events);

  return (
    <div className="w-screen overflow-x-hidden h-screen flex">
      <div className="w-1/2 h-full bg-green-200 overflow-y-scroll">
        <h1 className="font-bold text-4xl font-mono m-2">Available Events</h1>
        <div className="flex flex-col gap-3 my-8">
          {totalEvents.map(event => (
            <Card
              key={event.id}
              event={event}
              totalEvents={totalEvents}
              selected={selectedEvents.some(e => e.id === event.id)}
              selectedEvents={selectedEvents}
              setSelectedEvents={setSelectedEvents}
              setTotalEvents={setTotalEvents}
            />
          ))}
        </div>
      </div>
      <div className="w-1/2 h-full bg-red-200 overflow-y-scroll">
        <h1 className="font-bold text-4xl font-mono m-2">Selected Events</h1>
        <div className="flex flex-col gap-3 my-8">
          {selectedEvents.map(event => (
            <Card
              key={event.id}
              event={event}
              selected={true}
              selectedEvents={selectedEvents}
              setSelectedEvents={setSelectedEvents}
              totalEvents={totalEvents}
              setTotalEvents={setTotalEvents}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;







interface CardProps {
  event: Event;
  selected: boolean;
  selectedEvents: Event[];
  totalEvents: Event[];
  setSelectedEvents: React.Dispatch<React.SetStateAction<Event[]>>;
  setTotalEvents: React.Dispatch<React.SetStateAction<Event[]>>;
}

const Card: React.FC<CardProps> = ({ event, selected,totalEvents, selectedEvents, setSelectedEvents , setTotalEvents}) => {
  const isOverlapping = (event1: Event, event2: Event): boolean => {
    return !(event1.end_time <= event2.start_time || event1.start_time >= event2.end_time);
  };
 
  const handleSelectEvent = (event: Event) => {
    if (selected) {
     
      setSelectedEvents(prevSelected => prevSelected.filter(e => e.id !== event.id));
      setTotalEvents(prevSelected => [...prevSelected, event]);
    } else {
    
      if (selectedEvents.length >= 3) {
        alert("Please remove a selected item before selecting a new one.");
        return;
      }
      const hasOverlap = selectedEvents.some(selectedEvent => isOverlapping(selectedEvent, event));
      if (hasOverlap) {
        alert("The selected event overlaps with an already selected event. Please choose a non-overlapping event.");
        return; 
      }
      setTotalEvents(prevSelected => prevSelected.filter(e => e.id !== event.id));
      setSelectedEvents(prevSelected => [...prevSelected, event]);
    }
  };

  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{event.event_name}</h2>
        <p className="text-gray-600 mb-2">Category: {event.event_category}</p>
        <p className="text-gray-600 mb-2">Start Time: {event.start_time}</p>
        <p className="text-gray-600 mb-4">End Time: {event.end_time}</p>
        <button
          onClick={() => handleSelectEvent(event)}
          className={`${
            selected ? 'bg-red-500' : 'bg-green-500'
          } text-white hover:${selected ? 'bg-red-600' : 'bg-green-600'} focus:outline-none focus:ring-2 focus:ring-green-500 rounded px-4 py-2`}
        >
          {selected ? 'Remove' : 'Select'}
        </button>
      </div>
    </div>
  );
};
