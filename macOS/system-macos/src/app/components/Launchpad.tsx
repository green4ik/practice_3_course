'use client'
import React, { useState } from 'react';
import IconComponent from './IconComponent';


const apps = [
  { name: 'Mail', icon: 'image/icons/launchpad/mail.png' },
  { name: 'Activity monitor', icon: 'image/icons/launchpad/activitymonitor.png' },
  { name: 'Safari', icon: 'image/icons/launchpad/safari.png' },
  { name: 'AppStore', icon: 'image/icons/launchpad/appstore.png' },
  { name: 'Calculator', icon: 'image/icons/launchpad/calculator.png' },
  { name: 'Calendar', icon: 'image/icons/launchpad/calendar.png' },
  { name: 'Contacts', icon: 'image/icons/launchpad/contacts.png' },
  { name: 'Dictionary', icon: 'image/icons/launchpad/dictionary.png' },
  { name: 'Home', icon: 'image/icons/launchpad/Home.png' },
  { name: 'Message', icon: 'image/icons/launchpad/messages.png' },
  { name: 'Netnewswire', icon: 'image/icons/launchpad/netnewswire.png' },
  { name: 'Numbers', icon: 'image/icons/launchpad/numbers.png' },
  { name: 'Pages', icon: 'image/icons/launchpad/pages.png' },
  { name: 'Podacasts', icon: 'image/icons/launchpad/Podcasts.png' },
  { name: 'Siri', icon: 'image/icons/launchpad/siri.png' },
  { name: 'Zoom', icon: 'image/icons/launchpad/zoom.png' },
  { name: 'Finder', icon: 'image/icons/dock/finder.png' },
  { name: 'ClickerGame', icon: '/image/icons/dock/1456_oooo.plus.png'},
  { name: 'Game2048', icon: 'image/icons/dock/2048-game.png' }
];

const Launchpad: React.FC<{ onAppOpen: (appName: string) => void }> = ({ onAppOpen }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const filteredApps = apps.filter(app => app.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const pages = [];
  for (let i = 0; i < filteredApps.length; i += 16) {
    pages.push(filteredApps.slice(i, i + 16));

  }

  const handlePageClick = (pageIndex: number) => {
    setCurrentPage(pageIndex);
  };
  const findApp=(n:string)=>{
      setSearchTerm(n);
      setCurrentPage(0);
  }

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-start bg-white bg-opacity-0 backdrop-blur-lg fade-in">
      <div className="search flex border border-gray my-8 rounded">
        <svg className='m-1 mr-0 text-white w-6 h-6'>
        <path className='fill-white' d="M10,18c1.846,0,3.543-0.635,4.897-1.688l4.396,4.396l1.414-1.414l-4.396-4.396C17.365,13.543,18,11.846,18,10 c0-4.411-3.589-8-8-8s-8,3.589-8,8S5.589,18,10,18z M10,4c3.309,0,6,2.691,6,6s-2.691,6-6,6s-6-2.691-6-6S6.691,4,10,4z"></path>
        </svg>
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => findApp(e.target.value)}
          className="border-none outline-none w-50 p-0 my-0 pr-8 text-lg text-center focus:text-left text-white placeholder-white bg-white bg-opacity-0 backdrop-blur-lg"
        />
      </div>

      <div className="flex  overflow-x-hidden w-full justify-center">
        <div className="w-full   flex transition-transform duration-500"  style={{ transform: `translateX(-${currentPage * 100}%)` }}>
          {pages.map((page, pageIndex) => (
            <div key={pageIndex} className=" grid grid-cols-4 grid-rows-4 min-w-full gap-x-10 gap-y-2  place-items-center">
              {page.map(app => (
                <IconComponent  key={app.name} name={app.name} icon={app.icon} />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex space-x-2 mt-1">
        {pages.map((_, pageIndex) => (
          <button
            key={pageIndex}
            className={`w-3 h-3 rounded-full ${currentPage === pageIndex ? 'bg-white scale-125' : 'bg-gray-400'}`}
            onClick={() => handlePageClick(pageIndex)}
          />
        ))}
      </div>
    </div>
  );
};

export default Launchpad;
