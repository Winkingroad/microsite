import React, { useEffect, useState, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ChevronDown } from 'lucide-react';
import Calendar from '../assets/calendar.png';
import { format } from 'date-fns'; 

const locations = {
  Delhi: [
    { region: "Samsung Experience Store - Star Mobitel Ltd South Ex - South Extension", address: "South Extension, New Delhi, Delhi 110049" },
    { region: "Samsung Experience Store - Ambience Vasant Kunj", address: "Ambience Mall, Vasant Kunj, New Delhi, Delhi 110070" },
    { region: "Samsung Experience Store - Aidhi Projects Pvt Ltd - Rajouri Garden", address: "Rajouri Garden, New Delhi, Delhi 110027" },
    { region: "Samsung Experience Store - Metro Mobiles - Paschim Vihar", address: "Paschim Vihar, New Delhi, Delhi 110063" },
    { region: "Samsung Experience Store - Connaught Place", address: "Connaught Place, New Delhi, Delhi 110001" },
    { region: "Samsung Experience Store - Select Citywalk Saket", address: "Select Citywalk Mall, Saket, New Delhi, Delhi 110017" }
  ],
  Gurgaon: [
    { region: "Samsung Experience Store - Spectra & Star Convergence Limited - Ambience Mall", address: "Ambience Mall, Gurgaon, Haryana 122002" },
    { region: "Samsung Experience Store - Cyberhub", address: "Cyberhub, DLF Cyber City, Gurgaon, Haryana 122002" }
  ],
  Noida: [
    { region: "Samsung Experience Store - Agmatel India Pvt. Ltd. - DLF Mall of India", address: "DLF Mall of India, Sector 18, Noida, Uttar Pradesh 201301" },
    { region: "Samsung Experience Store - Tech Mart - Sector 18", address: "Sector 18, Noida, Uttar Pradesh 201301" },
    { region: "Samsung Experience Store - Device Mart Private Limited - Sector 18", address: "Sector 18, Noida, Uttar Pradesh 201301" }
  ],
  Dehradun: [
    { region: "Samsung Experience Store - Arora Enterprises - Old Connaught Place", address: "Old Connaught Place, Dehradun, Uttarakhand 248001" },
    { region: "Samsung Experience Store - Pacific Mall Dehradun", address: "Pacific Mall, Dehradun, Uttarakhand 248001" }
  ],
  Lucknow: [
    { region: "Samsung Experience Store - Lulu Mall Lucknow", address: "Lulu Mall, Lucknow, Uttar Pradesh 226010" }
  ],
  Mumbai: [
    { region: "Samsung Experience Store - Retail Shop - Lower Parel", address: "Lower Parel, Mumbai, Maharashtra 400013" },
    { region: "Samsung Experience Store - Ssk Retails Pvt Ltd - Phoenix Market City Mall", address: "Phoenix Market City Mall, Mumbai, Maharashtra 400070" }
  ],
  Virar: [
    { region: "Samsung Experience Store - Infiniti Telecom - Virar West", address: "Virar West, Virar, Maharashtra 401303" }
  ],
  NaviMumbai: [
    { region: "Samsung Experience Store - Breathe Enterprises - Koparkhairane", address: "Koparkhairane, Navi Mumbai, Maharashtra 400709" }
  ],
  Pune: [
    { region: "Samsung Experience Store - Karuna Management Services Limited - Viman Nagar", address: "Viman Nagar, Pune, Maharashtra 411014" },
    { region: "Samsung Experience Store - Tech Star Retail - Seasons Mall", address: "Seasons Mall, Pune, Maharashtra 411028" },
    { region: "Samsung Experience Store - Navkar Communication - Bibvewadi", address: "Bibvewadi, Pune, Maharashtra 411037" },
    { region: "Samsung Experience Store - Mall of Millennium Pune", address: "Mall of Millennium, Pune, Maharashtra 411045" },
    { region: "Samsung Experience Store - Ssk Retails Pvt Ltd - Jangli Maharaj Road", address: "Jangli Maharaj Road, Pune, Maharashtra 411005" }
  ],
  Bangalore: [
    { region: "Samsung Experience Store - Concepts Inc - Marathalli", address: "Marathalli, Bangalore, Karnataka 560037" },
    { region: "Samsung Experience Store - Mall of Asia Bengaluru", address: "Mall of Asia, Bangalore, Karnataka 560037" },
    { region: "Samsung Experience Store - Touch Tech Telecom - Electronic City", address: "Electronic City, Bangalore, Karnataka 560100" },
    { region: "Samsung Experience Store - IT World - Lulu Mall", address: "Lulu Mall, Bangalore, Karnataka 560068" },
    { region: "Samsung Experience Store - Concepts Inc - Indiranagar", address: "Indiranagar, Bangalore, Karnataka 560038" },
    { region: "Samsung Experience Store - UB City Bengaluru", address: "UB City Mall, Bangalore, Karnataka 560001" },
    { region: "Experience Store - Samsung Opera House", address: "Opera House, Bangalore, Karnataka 560002" }
  ],
  Hyderabad: [
    { region: "Samsung Experience Store - Inorbit Mall Hyderabad", address: "Inorbit Mall, Hyderabad, Telangana 500081" },
    { region: "Samsung Experience Store - Vasisht Retail - Madhapur", address: "Madhapur, Hyderabad, Telangana 500081" },
    { region: "Samsung Experience Store - Premium Lifestyle India Pvt Ltd - Kondapur", address: "Kondapur, Hyderabad, Telangana 500084" },
    { region: "Samsung Experience Store - S.S. Communications - Himayat Nagar", address: "Himayat Nagar, Hyderabad, Telangana 500029" }
  ],
  Secunderabad: [
    { region: "Samsung Experience Store - IT World - DSL Virtue Mall", address: "DSL Virtue Mall, Secunderabad, Telangana 500003" }
  ],
  Chennai: [
    { region: "Samsung Experience Store - Phoenix MarketCity Chennai", address: "Phoenix MarketCity, Chennai, Tamil Nadu 600042" }
  ],
  Mohali: [
    { region: "Samsung Experience Store - CP67 Mohali", address: "CP67 Mall, Mohali, Punjab 160062" }
  ],
  Chandigarh: [
    { region: "Samsung Experience Store - Elante Mall Chandigarh", address: "Elante Mall, Chandigarh, Punjab 160002" },
    { region: "Samsung Experience Store - Electro Photo Equipments Pvt Ltd - Sector 35 C", address: "Sector 35 C, Chandigarh, Punjab 160022" },
    { region: "Samsung Experience Store - Electrophoto Equipments Private Limited - Sector 22", address: "Sector 22, Chandigarh, Punjab 160022" }
  ],
  Kolkata: [
    { region: "Samsung Experience Store - Park Street Kolkata", address: "Park Street, Kolkata, West Bengal 700016" },
    { region: "Samsung Experience Store - R G Networks - South City Mall", address: "South City Mall, Kolkata, West Bengal 700068" }
  ],
  Ahmedabad: [
    { region: "Samsung Experience Store - Techno Ventures - Maninagar", address: "Maninagar, Ahmedabad, Gujarat 380008" },
    { region: "Samsung Experience Store - Palladium Ahmedabad", address: "Palladium Mall, Ahmedabad, Gujarat 380054" },
    { region: "Samsung Experience Store - Techno Ventures - Prahlad Nagar Road", address: "Prahlad Nagar Road, Ahmedabad, Gujarat 380015" }
  ],
  Surat: [
    { region: "Samsung Experience Store - Shivam Sales - Adajan", address: "Adajan, Surat, Gujarat 395009" },
    { region: "Samsung Experience Store - IBC Surat", address: "IBC Mall, Surat, Gujarat 395007" }
  ],
  Trivandrum: [
    { region: "Samsung Experience Store - Lulu Mall Trivandrum", address: "Lulu Mall, Trivandrum, Kerala 695029" }
  ]
};





const Ranking = () => {
  const datePickerRef = useRef(null);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [region, setRegion] = useState('');
  const [store, setStore] = useState('');
  const [date, setDate] = useState(null);  // Use null instead of an empty string

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
    const filterData = () => {
      const filtered = data
        .filter(entry => {
          const matchesRegion = region ? entry.Region === region : true;
          const matchesStore = store ? entry.Store === store : true;
          const matchesDate = date ? entry.Date === format(date, 'yyyy-MM-dd') : true;  // Format the selected date
          return matchesRegion && matchesStore && matchesDate;
        })
        .map((entry, index) => ({ ...entry, serial: index + 1 }));
      setFilteredData(filtered);
    };

    filterData();
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
    <div className="min-h-screen p-2 sm:p-4 md:p-8 text-white w-full bg-main-bg bg-cover bg-center">
      <div className="max-w-7xl mx-auto bg-transparent rounded shadow-md mb-4 md:mb-6">
        <div className="flex flex-col w-full items-center space-y-3 md:space-y-4 mb-4 md:mb-6 px-2 md:px-6">
          {/* City Dropdown */}
          <div className="w-full md:w-2/3 dropdown-container relative">
            <button
              onClick={() => setCityOpen(!isCityOpen)}
              className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500 flex justify-between items-center"
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
              className={`w-full bg-gray-900 text-white py-3 px-4 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500 flex justify-between items-center ${!region && 'opacity-50 cursor-not-allowed'}`}
            >
              <span>{store || "Select Your Region"}</span>
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
                    <th scope="col" className="px-3 md:px-4 py-2 md:py-3 text-center text-xs md:text-sm font-semibold text-white uppercase tracking-wider w-1/6 border-r-2 border-gray-500">
                      Ranking
                    </th>
                    <th scope="col" className="px-3 md:px-4 py-2 md:py-3 text-center text-xs md:text-sm font-semibold text-white uppercase tracking-wider w-1/2 md:w-1/3 border-r-2 border-gray-500">
                      Name
                    </th>
                    <th scope="col" className="px-3 md:px-4 py-2 md:py-3 text-center text-xs md:text-sm font-semibold text-white uppercase tracking-wider w-1/3">
                      Lap Time
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-900 bg-opacity-10 divide-y divide-gray-700">
                  {filteredData.map((entry, index) => (
                    <tr key={index} className="hover:bg-gray-800 hover:bg-opacity-50 transition-colors duration-200 ">
                      <td className="px-3 md:px-4 py-2 md:py-3 whitespace-nowrap text-xs md:text-sm text-white border-r-2 border-gray-500 text-center">
                        {entry.serial}
                      </td>
                      <td className="px-3 md:px-4 py-2 md:py-3 whitespace-nowrap text-xs md:text-sm text-white border-r-2 border-gray-500 text-center">
                        {entry.Name}
                      </td>
                      <td className="px-3 md:px-4 py-2 md:py-3 whitespace-nowrap text-xs md:text-sm text-white text-center">
                        {entry.LapTime}
                      </td>
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