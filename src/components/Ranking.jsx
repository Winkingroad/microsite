import React, { useEffect, useState, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ChevronDown } from 'lucide-react';
import Calendar from '../assets/calendar.png';
import { format } from 'date-fns';
import bgImage from '../assets/website banner bg.png';

const locations = {
  Delhi: [
    { region: "Samsung Experience Store Connaught Place" },
    { region: "Samsung Experience Store Select CityWalk" },
    { region: "Samsung Experience Store Ambience Mall" },
    { region: "Samsung Experience Store South Extension II" }
  ],
  Gurgaon: [
    { region: "Samsung Experience Store Cyberhub" },
    { region: "Samsung Experience Store Bestech Mall" }
  ],
  Ahmedabad: [
    { region: "Samsung Experience Store Science City" },
    { region: "Samsung Experience Store Bhagwan Nagar" },
    { region: "Samsung Experience Store Palladium Ahmedabad" },
    { region: "Samsung Experience Store Navrangpura" }
  ],
  Surat: [
    { region: "Samsung Experience Store IBC Surat" },
    { region: "Samsung Experience Store Adajan" }
  ],
  Mumbai: [
    { region: "Samsung Experience Store SkyCity Mall" },
    { region: "Samsung Experience Store Andheri West" },
    { region: "Samsung Experience Store Kurla" },
    { region: "Samsung Experience Store Inorbit Mall" },
    { region: "Samsung Experience Store Phoenix Palladium" },
    { region: "Samsung Experience Store Palm Beach" }
  ],
  Bengaluru: [
    { region: "Samsung Experience Store Basaveshwara Nagar" },
    { region: "Samsung Experience Store Mall of Asia" },
    { region: "Samsung Experience Store Koramangala" },
    { region: "Samsung Experience Store Brigade Road" }
  ],
  Hyderabad: [
    { region: "Samsung Experience Store Lake Shore" },
    { region: "Samsung Experience Store Inorbit Mall" }
  ],
  Chennai: [
    { region: "Samsung Experience Store Adyar" },
    { region: "Samsung Experience Store Express Avenue" },
    { region: "Samsung Experience Store Nexus Vijaya Mall" },
    { region: "Samsung Experience Store Phoenix Velachery" },
    { region: "Samsung Experience Store VR Mall" }
  ],
  Pune: [
    { region: "Samsung Experience Store Viman Nagar" },
    { region: "Samsung Experience Store Mall of Millennium" },
    { region: "Samsung Experience Store Kopa Mall" },
    { region: "Samsung Experience Store Phoenix MarketCity" },
    { region: "Samsung Experience Store Vishrantwadi" }
  ],
  Bhubaneswar: [
    { region: "Samsung Experience Store Patia" },
    { region: "Samsung Experience Store Khorda" }
  ],
  Kolkata: [
    { region: "Samsung Experience Store Park Street" },
    { region: "Samsung Experience Store South City Mall" }
  ],
  Chandigarh: [
    { region: "Samsung Experience Store Elante Mall" },
    { region: "Samsung Experience Store Sector 35C" },
    { region: "Samsung Experience Store Manimajra" }
  ],
  Mohali: [
    { region: "Samsung Experience Store CP67 Mall" }
  ],
  Jaipur: [
    { region: "Samsung Experience Store MI Road" },
    { region: "Samsung Experience Store Viva City Mall" },
    { region: "Samsung Experience Store Pratap Nagar" },
    { region: "Samsung Experience Store Mansarovar" }
  ],
  Indore: [
    { region: "Samsung Experience Store Phoenix Citadel" },
    { region: "Samsung Experience Store Tirupati Nagar" }
  ],
  Dehradun: [
    { region: "Samsung Experience Store Centrio Mall" },
    { region: "Samsung Experience Store Nehru Colony" }
  ]
};

const Ranking = () => {
  const datePickerRef = useRef(null);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [region, setRegion] = useState('');
  const [store, setStore] = useState('');
  const [date, setDate] = useState(null);

  const [isCityOpen, setCityOpen] = useState(false);
  const [isRegionOpen, setRegionOpen] = useState(false);

  useEffect(() => {
    const ws = new WebSocket("wss://microsite-pbec.onrender.com");

    ws.onopen = () => {
      console.log("WebSocket is open now.");
    };

    ws.onmessage = (event) => {
      const leaderboardData = JSON.parse(event.data);
      console.log("Received leaderboard data:", leaderboardData);
      setData(leaderboardData);
    };

    return () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    const filtered = data
      .filter(entry => {
        const matchesRegion = region ? entry.Region === region : true;
        const matchesStore = store ? entry.Store === store : true;
        const matchesDate = date ? entry.Date === format(date, 'yyyy-MM-dd') : true;
        return matchesRegion && matchesStore && matchesDate;
      })
      .map((entry, index) => ({ ...entry, serial: index + 1 }));

    setFilteredData(filtered);
  }, [data, region, store, date]);

  const handleRegionChange = (selectedRegion) => {
    setRegion(selectedRegion);
    setStore('');
    setCityOpen(false);
  };

  const handleStoreChange = (selectedStore) => {
    setStore(selectedStore);
    setRegionOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container')) {
        setCityOpen(false);
        setRegionOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <main className="relative w-full flex-grow text-white">
      {/* Background */}
      <div
        className="absolute inset-0 z-0 bg-main-bg"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: '1970px',
          backgroundPosition: 'center',
          backgroundRepeat: 'repeat',
          filter: 'blur(20px)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 min-h-screen p-2 sm:p-4 md:p-8 w-full">
        <div className="max-w-7xl mx-auto bg-transparent rounded shadow-md mb-4 md:mb-6">

          {/* Filters */}
          <div className="flex flex-col w-full items-center space-y-3 md:space-y-4 mb-4 md:mb-6 px-2 md:px-6">

            {/* City */}
            <div className="w-full md:w-2/3 dropdown-container relative">
              <button
                onClick={() => setCityOpen(!isCityOpen)}
                className="w-full bg-gray-900 bg-opacity-50 text-white py-3 px-4 rounded-lg flex justify-between items-center"
              >
                <span>{region || "Select Your City"}</span>
                <ChevronDown className={`w-5 h-5 ${isCityOpen ? 'rotate-180' : ''}`} />
              </button>

              {isCityOpen && (
                <div className="absolute w-full mt-1 bg-[#1c0e3b] rounded-lg max-h-60 overflow-y-auto z-50">
                  {Object.keys(locations).map(city => (
                    <div
                      key={city}
                      className="px-4 py-2 hover:bg-gray-800 cursor-pointer"
                      onClick={() => handleRegionChange(city)}
                    >
                      {city}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Store */}
            <div className="w-full md:w-2/3 dropdown-container relative">
              <button
                onClick={() => region && setRegionOpen(!isRegionOpen)}
                disabled={!region}
                className={`w-full bg-gray-900 bg-opacity-50 py-3 px-4 rounded-lg flex justify-between items-center ${!region && 'opacity-50'}`}
              >
                <span>{store || "Select Store"}</span>
                <ChevronDown className={`w-5 h-5 ${isRegionOpen ? 'rotate-180' : ''}`} />
              </button>

              {isRegionOpen && (
                <div className="absolute w-full mt-1 bg-[#1c0e3b] rounded-lg max-h-60 overflow-y-auto z-50">
                  {locations[region]?.map(({ region: s }) => (
                    <div
                      key={s}
                      className="px-4 py-2 hover:bg-gray-800 cursor-pointer"
                      onClick={() => handleStoreChange(s)}
                    >
                      {s}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Date */}
            <div className="w-full md:w-2/3" onClick={() => datePickerRef.current.setOpen(true)}>
              <div className="flex items-center justify-between bg-gray-900 bg-opacity-50 py-3 px-4 rounded-lg cursor-pointer">
                <DatePicker
                  ref={datePickerRef}
                  selected={date}
                  onChange={(d) => setDate(d)}
                  placeholderText="Select Date"
                  dateFormat="yyyy-MM-dd"
                  className="bg-transparent w-full text-white outline-none"
                />
                <img src={Calendar} className="h-6 w-6" alt="Calendar" />
              </div>
            </div>

          </div>

          {/* Table */}
          <div className="w-full overflow-auto border rounded-xl" style={{ maxHeight: '70vh' }}>
            <table className="min-w-full">
              <thead className="bg-gray-900 bg-opacity-50">
                <tr>
                  <th className="py-3 text-center">Ranking</th>
                  <th className="py-3 text-center">Name</th>
                </tr>
              </thead>

              <tbody>
                {filteredData.map((entry, index) => (
                  <tr key={index} className="text-center hover:bg-gray-800">
                    <td className="py-2">{entry.serial}</td>
                    <td className="py-2">{entry.Name}</td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>

        </div>
      </div>
    </main>
  );
};

export default Ranking;