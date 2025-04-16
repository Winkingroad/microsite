import React, { useEffect, useState, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ChevronDown } from 'lucide-react';
import Calendar from '../assets/calendar.png';
import { format } from 'date-fns'; 

const locations = {
  Delhi: [
    { region: "Select Citywalk Saket" },
    { region: "Aidhi Projects Pvt Ltd, Rajouri Garden" },
    { region: "Metro Mobiles, Paschim Vihar" },
    { region: "Connaught Place" },
    { region: "Star Mobitel Ltd, South Extension" },
    { region: "Ambience Vasant Kunj" },
    { region: "The British Motor Car Company P Ltd" },
    { region: "PARAMA RETAIL SOLUTIONS (INDIA) PRIVATE LIMITED" },
    { region: "Spectra & Star Convergence Limited" }
  ],
  Gurgaon: [
    { region: "Spectra & Star Convergence Limited, Ambience Mall" },
    { region: "Spectra And Star Convergence Limited, Ardee Mall" },
    { region: "Cyberhub" }
  ],
  Noida: [
    { region: "Agmatel India Pvt.Ltd, DLF Mall of India" },
    { region: "Tech Mart, Sector 18" },
    { region: "Device Mart Private Limited, Sector 18" }
  ],
  Ahmedabad: [
    { region: "Techno Ventures, Prahlad Nagar Road" },
    { region: "Techno Ventures, Maninagar" },
    { region: "Palladium Ahmedabad" },
    { region: "VTech NxtGen Retails LLP" },
    { region: "VTECH NXTGEN RETAILS LLP ( PALLADIUM AHMEDABAD )" }
  ],
  Surat: [
    { region: "IBC Surat" },
    { region: "Shivam Sales, Adajan" },
    { region: "BHATIA COMMUNICATION (IBC CAFE)" }
  ],
  Mumbai: [
    { region: "Ssk Retails Pvt Ltd, Phoenix Market City Mall" },
    { region: "Retail Shop, Lower Parel" },
    { region: "Swiftlink Connections Pvt. Ltd. (Phoenix Lower Parel)" }
  ],
  NaviMumbai: [
    { region: "Breathe Enterprises, Koparkhairane" }
  ],
  Pune: [
    { region: "Mall of Millennium Pune" },
    { region: "Karuna Management Services Limited, Viman Nagar" },
    { region: "Tech Star Retail, Seasons Mall" },
    { region: "Navkar Communication, Bibvewadi" },
    { region: "Ssk Retails Pvt Ltd, Jangli Maharaj Road" },
    { region: "ABM DELIGHT-MAH" },
    { region: "KARUNA MANAGEMENT SERVICES LIMITED" }
  ],
  Bangalore: [
    { region: "Concepts Inc, Indiranagar" },
    { region: "Samsung Opera House" },
    { region: "UB City Bengaluru" },
    { region: "Concepts Inc, Marathalli" },
    { region: "Mall of Asia Bengaluru" },
    { region: "Touch Tech Telecom, Electronic City" },
    { region: "IT World, Lulu Mall" },
    { region: "Jfk Trust, Whitefield" },
    { region: "Innesfree Retail LLP-KOR" },
    { region: "Innesfree Retail llp BSW" },
    { region: "ABM DELIGHT" },
    { region: "CONCEPTS_MOA" }
  ],
  Hyderabad: [
    { region: "Inorbit Mall Hyderabad" },
    { region: "Vasisht Retail, Madhapur" },
    { region: "Premium Lifestyle India Pvt Ltd, Kondapur" },
    { region: "S.S. Communications, Himayat Nagar" },
    { region: "VASISHT RETAIL [INORBIT MALL-HYD]" }
  ],
  Secunderabad: [
    { region: "IT World, DSL Virtue Mall" }
  ],
  Chennai: [
    { region: "Phoenix MarketCity, Chennai" },
    { region: "IT World ( Velacherry phoenix )" }
  ],
  Lucknow: [
    { region: "Lulu Mall Lucknow" },
    { region: "Sigma It Super Store Pvt Ltd-Lulu" }
  ],
  Virar: [
    { region: "Infiniti Telecom, Virar West" }
  ],
  Mohali: [
    { region: "CP67 Mohali" },
    { region: "ELECTR0PHOTO EQUIPMENTS PRIVATE LIMITED" }
  ],
  Chandigarh: [
    { region: "Elante Mall, Chandigarh" },
    { region: "Electro Photo Equipments Pvt Ltd, Sector 35 C" },
    { region: "Electrophoto Equipments Private Limited, Sector 22" },
    { region: "ELECTRO PHOTO EQUIPMENTS PVT.LTD." },
    { region: "ELECTROPHOTO EQUIPMENTS PRIVATE LIMITED - (SEC.-22 B)" }
  ],
  Dehradun: [
    { region: "Arora Enterprises, Old Connaught Place" },
    { region: "Pacific Mall Dehradun" },
    { region: "Arora Enterprises, Chakarata Road" }
  ],
  Kolkata: [
    { region: "Park Street, Kolkata" },
    { region: "R G Networks, South City Mall" },
    { region: "R G NETWORKS" },
    { region: "SURYA VISTACOM PRIVATE LIMITED" }
  ],
  Trivandrum: [
    { region: "Lulu Mall Trivandrum" },
    { region: "TECH HAVEN" }
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
    <div className="min-h-screen p-2 sm:p-4 md:p-8 text-white w-full bg-main-bg bg-cover bg-center">
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
            <div className="flex flex-row items-center justify-between w-full cursor-pointer bg-gray-900 text-white py-3 px-4 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-white">
              <DatePicker
                ref={datePickerRef}
                selected={date}
                onChange={(date) => setDate(date)}
                placeholderText="Select the Date"
                dateFormat="yyyy-MM-dd"
                className="cursor-pointer w-full bg-gray-900 text-white rounded-lg text-base focus:outline-none placeholder-white"
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
                    {/* <th className="px-3 md:px-4 py-2 md:py-3 text-center text-xs md:text-sm font-semibold text-white uppercase tracking-wider w-1/3">Lap Time</th> */}
                  </tr>
                </thead>
                <tbody className="bg-gray-900 bg-opacity-10 divide-y divide-gray-700">
                  {filteredData.map((entry, index) => (
                    <tr key={index} className="hover:bg-gray-800 hover:bg-opacity-50 transition-colors duration-200">
                      <td className="px-3 md:px-4 py-2 md:py-3 text-xs md:text-sm text-white border-r-2 border-gray-500 text-center">{entry.serial}</td>
                      <td className="px-3 md:px-4 py-2 md:py-3 text-xs md:text-sm text-white border-r-2 border-gray-500 text-center">{entry.Name}</td>
                      {/* <td className="px-3 md:px-4 py-2 md:py-3 text-xs md:text-sm text-white text-center">{entry.LapTime}</td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ranking;