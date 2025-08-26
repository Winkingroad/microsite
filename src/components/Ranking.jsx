import React, { useEffect, useState, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ChevronDown } from 'lucide-react';
import Calendar from '../assets/calendar.png';
import { format } from 'date-fns';
import bgImage from '../assets/website banner bg.png'; // ✅ import background image

const locations = {
  Delhi: [
    { region: "Connaught Place, Delhi" },
    { region: "Ambience Mall, Vasant Kunj" },
    { region: "South Extension, Delhi" },
    // { region: "Select Citywalk, Delhi" }, // New
    { region: "Samsung Experience Store - Select City Walk Saket, Delhi" }
  ],
  Chandigarh: [
    { region: "Elante Mall, Chandigarh" },
    { region: "ELECTROPHOTO EQUIPMENTS PRIVATE LIMITED - (SEC.-22 B)" }
  ],
  Pune: [
    { region: "Mall of Milenium, Pune" },
    { region: "Phoenix Market City Viman Nagar, Pune" } // New
  ],
  Mumbai: [
    { region: "Phoenix Palladium, Lower Parel, Mumbai" },
    { region: "Swiftlink Andheri" },
    { region: "Sky City by Oberoi Realty, Borivali" }
  ],
  Bengaluru: [
    { region: "Basaveshwara Nagar, Bengaluru" },
    // { region: "Opera House, Bengaluru" }, // New
    { region: "Mall of Asia, Bengaluru" } // New
  ],
  Kolkata: [
    { region: "Park Street, Kolkata" },
    { region: "South City, Kolkata" }
  ],
  Chennai: [
    { region: "Phoenix Market City, Chennai" },
    { region: "VR Mall, Chennai" }
  ],
  Surat: [
    { region: "IBC, Surat" }
  ],
  Ahmedabad: [
    { region: "Palladium Mall, Ahmedabad" }
  ],
  Mohali: [
    { region: "CP67, Mohali" }
  ],
  Lucknow: [
    { region: "Lulu Mall, Lucknow" }
  ],
  Hyderabad: [
    { region: "Inorbit Mall, Hyderabad" } // New
  ],
  Trivandrum: [
    { region: "Lulu Trivandrum" } // New
  ],
  Gurgaon: [
    { region: "Cyber Hub, Gurgaon" } // New
  ]
};


const Ranking = () => {
  const datePickerRef = useRef(null);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [region, setRegion] = useState('');
  const [store, setStore] = useState('');
  const [date, setDate] = useState(null);
  const [setFilter, setSetFilter] = useState('');

  const [isCityOpen, setCityOpen] = useState(false);
  const [isRegionOpen, setRegionOpen] = useState(false);
  const [isSetOpen, setIsSetOpen] = useState(false);

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
    const filterData = () => {
      const filtered = data
        .filter(entry => {
          const matchesRegion = region ? entry.Region === region : true;
          const matchesStore = store ? entry.Store === store : true;
          const matchesDate = date ? entry.Date === format(date, 'yyyy-MM-dd') : true;
          const matchesSet = setFilter ? entry.Sets === setFilter : true;
          return matchesRegion && matchesStore && matchesDate && matchesSet;
        })
        .map((entry, index) => ({ ...entry, serial: index + 1 }));
      setFilteredData(filtered);
    };

    filterData();
  }, [data, region, store, date, setFilter]);

  const handleRegionChange = (selectedRegion) => {
    setRegion(selectedRegion);
    setStore('');
    setSetFilter('');
    setCityOpen(false);
  };

  const handleStoreChange = (selectedStore) => {
    setStore(selectedStore);
    setSetFilter('');
    setRegionOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container')) {
        setCityOpen(false);
        setRegionOpen(false);
        setIsSetOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <main className="relative w-full flex-grow text-white ">
      {/* Blurred Background */}
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

      {/* Content Overlay */}
      <div className="relative z-10 min-h-screen p-2 sm:p-4 md:p-8 w-full">
        <div className="max-w-7xl mx-auto bg-transparent rounded shadow-md mb-4 md:mb-6">
          <div className="flex flex-col w-full items-center space-y-3 md:space-y-4 mb-4 md:mb-6 px-2 md:px-6">
            {/* City Dropdown */}
            <div className="w-full md:w-2/3 dropdown-container relative">
              <button
                onClick={() => setCityOpen(!isCityOpen)}
                className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg text-base focus:outline-none  flex justify-between items-center"
              >
                <span>{region || "Select Your City"}</span>
                <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${isCityOpen ? 'rotate-180' : ''}`} />
              </button>
              {isCityOpen && (
                <div className="absolute w-full mt-1 bg-[#0a202b] border border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto z-50">
                  {Object.keys(locations).map(city => (
                    <div
                      key={city}
                      className="px-4 py-2 m-1 rounded-lg hover:bg-gray-800 cursor-pointer"
                      onClick={() => handleRegionChange(city)}
                    >
                      {city}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Region Dropdown */}
            <div className="w-full md:w-2/3 dropdown-container relative">
              <button
                onClick={() => region && setRegionOpen(!isRegionOpen)}
                disabled={!region}
                className={`w-full bg-gray-900 text-white py-3 px-4 rounded-lg text-base  flex justify-between items-center ${!region && 'opacity-50 cursor-not-allowed'}`}
              >
                <span>{store || "Select Your Samsung Experience Store"}</span>
                <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${isRegionOpen ? 'rotate-180' : ''}`} />
              </button>
              {isRegionOpen && region && (
                <div className="absolute w-full mt-1 bg-[#0a202b] border border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto z-50">
                  {locations[region].map(({ region: storeRegion }) => (
                    <div
                      key={storeRegion}
                      className="px-4 py-2 m-1 rounded-lg hover:bg-gray-800 cursor-pointer"
                      onClick={() => handleStoreChange(storeRegion)}
                    >
                      {storeRegion}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Set Dropdown */}
            <div className="w-full md:w-2/3 dropdown-container relative">
              <button
                onClick={() => setIsSetOpen(!isSetOpen)}
                className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg text-base focus:outline-none flex justify-between items-center"
              >
                <span>{setFilter || "Select Set"}</span>
                <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${isSetOpen ? 'rotate-180' : ''}`} />
              </button>
              {isSetOpen && (
                <div className="absolute w-full mt-1 bg-[#0a202b] border border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto z-50">
                  {["Set A", "Set B", "Set C"].map(setName => (
                    <div
                      key={setName}
                      className="px-4 py-2 m-1 rounded-lg hover:bg-gray-800 cursor-pointer"
                      onClick={() => {
                        setSetFilter(setName);
                        setIsSetOpen(false);
                      }}
                    >
                      {setName}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Date Input */}
            <div className="w-full md:w-2/3" onClick={() => datePickerRef.current.setOpen(true)}>
              <div className="flex flex-row items-center justify-between w-full cursor-pointer bg-gray-900 text-white py-3 px-4 rounded-lg text-base focus:outline-none">
                <DatePicker
                  ref={datePickerRef}
                  selected={date}
                  onChange={(date) => setDate(date)}
                  placeholderText="Select the Date"
                  dateFormat="yyyy-MM-dd"
                  className="cursor-pointer w-full bg-gray-900 text-white rounded-lg text-base focus:outline-none"
                />
                <img src={Calendar} className="h-6 w-6" alt="Calendar Icon" />
              </div>
            </div>
          </div>

          {/* Table Section */}
          <div className="w-full overflow-x-auto overflow-y-auto border-gray-900 border rounded-xl" style={{ maxHeight: '70vh', scrollbarWidth: 'none' }}>
            <div className="min-w-full inline-block align-middle">
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead className="bg-gray-900 bg-opacity-50">
                    <tr>
                      <th className="px-3 md:px-4 py-2 md:py-3 text-center text-xs md:text-sm font-semibold text-white uppercase tracking-wider w-1/6 border-r-2 border-gray-500">Ranking</th>
                      <th className="px-3 md:px-4 py-2 md:py-3 text-center text-xs md:text-sm font-semibold text-white uppercase tracking-wider w-1/2 md:w-1/3 border-r-2 border-gray-500">Name</th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-900 bg-opacity-10 divide-y divide-gray-700">
                    {filteredData.map((entry, index) => (
                      <tr key={index} className="hover:bg-gray-800 hover:bg-opacity-50 transition-colors duration-200">
                        <td className="px-3 md:px-4 py-2 md:py-3 text-xs md:text-sm text-white border-r-2 border-gray-500 text-center">{entry.serial}</td>
                        <td className="px-3 md:px-4 py-2 md:py-3 text-xs md:text-sm text-white border-r-2 border-gray-500 text-center">{entry.Name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Ranking;
