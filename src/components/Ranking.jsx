import React, { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

const locations = {
  Delhi: [
      { region: "South Extension", address: "No G26 Part 1 Near Bombay Shirt Company, South Extension, New Delhi, Delhi 110049" },
      { region: "Ambience Mall, Vasant Kunj", address: "No F107, 1st Floor, Ambience Mall, Vasant Kunj, New Delhi, Delhi 110070" },
      { region: "Paschim Vihar", address: "No B2/8, Near HDFC Bank, Paschim Vihar, New Delhi, Delhi 110063" },
      { region: "Connaught Circus", address: "N45, Pratap Building, N Block, Opposite Statesman House, Connaught Circus, New Delhi, Delhi 110001" },
      { region: "Rajouri Garden", address: "No A2/40 Main Market Chowk, Rajouri Garden, New Delhi, Delhi 110027" },
      { region: "Select City Walk, Saket", address: "F 29, 1st Floor, Select City Walk, Near Malvia Nagar Metro Station Gate No 3, Saket, New Delhi, Delhi 110017" },
  ],
  Noida: [
      { region: "Sector 18, JOP Plaza", address: "Shop No 7, Ground Floor, JOP Plaza, Opposite Mc Donalds, Sector 18, Noida, Uttar Pradesh 201301" },
      { region: "Wave Silver Tower", address: "Unit No 12, Plot No 6, Wave Silver Tower, Behind Bikanerwala, Sector 18, Noida, Uttar Pradesh 201301" },
      { region: "DLF Mall of India", address: "No E/245, 1st Floor, DLF Mall of India, Opposite Radisson Hotel, Sector 18, Noida, Uttar Pradesh 201301" },
  ],
  Gurgaon: [
      { region: "Cyber City, DLF Phase 2", address: "Building No 10B, DLF Cyber City, DLF Phase 2, Sector 24, Gurugram, Haryana 122002" },
      { region: "Ambience Mall", address: "No S242, 2nd Floor, Ambience Mall, NH 8 Ambience Island, DLF Phase 3, Sector 24, Gurugram, Haryana 122002" },
  ],
  Chandigarh: [
      { region: "Sector 35 C", address: "SCO 464 & 465 Outer Market, Sector 35 C, Chandigarh, Chandigarh 160035" },
      { region: "Sector 22", address: "Sco 1026 & 1027, Sector 22, Chandigarh, Chandigarh 160022" },
      { region: "Elante Mall, Phase 1", address: "Shop No 245, 2nd Floor, Elante Mall, Phase 1, Industrial Area, Chandigarh, Chandigarh 160002" },
  ],
  Dehradun: [
      { region: "Pacific Mall, Jakhan", address: "Shop No 04, LGF, Pacific Mall, Rajpur Road, Jakhan, Dehradun, Uttarakhand 248006" },
      { region: "Chakrata Road", address: "No 16 Chakrata Road, Opposite LIC Building, Old Connaught Place, Dehradun, Uttarakhand 248001" },
  ],
  Kolkata: [
      { region: "South City Mall", address: "375, SN B006A, Basement, South City Mall, Prince Anwar Shah Rd, Kolkata, West Bengal 700068" },
      { region: "Park Street", address: "No 21, Ground Floor, Near Park Hotel, Park Street, Kolkata, West Bengal 700016" },
  ],
  Ahmedabad: [
      { region: "Palladium Mall, Thaltej", address: "No G1 to 3, Palladium Mall, SG Highway, Thaltej, Ahmedabad, Gujarat 380054" },
      { region: "Shivalik Arcade", address: "No 3, Shivalik Arcade, Besides HDFC Bank, Prahlad Nagar Road, Ahmedabad, Gujarat 380015" },
      { region: "Sigma Esquire, Maninagar", address: "No 01, Ground Floor, Sigma Esquire, Besides Dominos Pizza, Maninagar, Ahmedabad, Gujarat 380008" },
  ],
  Surat: [
      { region: "Vivanta Icon", address: "Shop No G6, Vivanta Icon, LP Savani Road, Near Madhuvan Circle, Adajan, Surat, Gujarat 395009" },
      { region: "International Business Center", address: "SN G14, International Business Center, Dumas Road, Near Mercedes Showroom, Piplod, Surat, Gujarat 395007" },
  ],
  Pune: [
      { region: "Barve Memorial Complex", address: "Shop No 1, Barve Memorial Complex, Opposite Panchali Hotel, Jangli Maharaj Road, Pune, Maharashtra 411005" },
      { region: "Premier Tower Solitare World", address: "S No 7, GF, Premier Tower Solitare World, Bibwewadi, Pune, Maharashtra 411037" },
      { region: "Phoenix Marketcity, Viman Nagar", address: "Shop No 18, LGF, Phoenix Marketcity, Nagar Road, Clover Park, Viman Nagar, Pune, Maharashtra 411014" },
      { region: "Seasons Mall, Magarpatta", address: "No G20A/B, Ground Floor, Seasons Mall, Magarpatta, Hadapsar, Pune, Maharashtra 411013" },
      { region: "Mall of Millennium", address: "Unit No UG06, UGF, Mall of Millennium, Behind Sayaji Hotel, Wakad, Pune, Maharashtra 411057" },
  ],
  Bangalore: [
      { region: "Nexus Mall, Whitefield", address: "No 62, Prestige Ozone Main Road, Near Nexus Mall, Whitefield, Bengaluru, Karnataka 560066" },
      { region: "Electronic City", address: "Shop No 62/B, Ground Floor, Phase 1, Opposite Post Office, Electronic City, Bengaluru, Karnataka 560100" },
      { region: "Lulu Mall", address: "Unit No G26, Upper Ground Flr, Lulu Mall, No 19/2, Mysore Deviation Road, Gopalapura, Bengaluru, Karnataka 560023" },
      { region: "Indiranagar", address: "No 514 Defence Colony, Next To ICICI Bank, Indiranagar, Bengaluru, Karnataka 560038" },
      { region: "UB City, Vittal Malaya Road", address: "No 24, Shop No S216, 2nd Floor, UB City Canberra Block, Vittal Malaya Road, Bengaluru, Karnataka 560001" },
      { region: "Phoenix Mall of Asia, Yelahanka", address: "S47 & 48, 2nd Flr, Phoenix Mall of Asia, Byatarayanapura, Near Mall of Asia, Yelahanka, Bengaluru, Karnataka 560092" },
      { region: "Marathalli", address: "No 97/2, Ground Floor, Marathalli Main Road, Next to SBI Bank, Marathalli, Bengaluru, Karnataka 560037" },
      { region: "Brigade Road", address: "No 57 Brigade Road, Shanthala Nagar, Near Junction of Residency Road, Ashok Nagar, Bengaluru, Karnataka 560025" },
  ],
  Hyderabad: [
      { region: "Himayat Nagar", address: "No 3/6/369/B/3/1, Beside TTD Temple, Himayat Nagar, Hyderabad, Telangana 500029" },
      { region: "DSL Virtue Mall, Uppal", address: "Unit No UGF 07, DSL Virtue Mall, Warangal Hwy, Near Rajiv Gandhi Intnl Cricket Stadium, Uppal, Hyderabad, Telangana 500039" },
      { region: "Inorbit Mall, Madhapur", address: "S No 64, Level 2, APIIC Software Layout, Inorbit Mall Road, Mindspace, Madhapur, Hyderabad, Telangana 500081" },
      { region: "Maphars MK Eternal, Madhapur", address: "Plot No 2/45/G3, Maphars MK Eternal, Beside Linen Club, Madhapur, Hyderabad, Telangana 500081" },
      { region: "Kondapur", address: "H No 2/40/1/A/A, Survey No 19 PN 1, Ravi Colony, Rangareddy, Beside Aptronix, Kondapur, Hyderabad, Telangana 500084" },
  ],
  Chennai: [
      { region: "Velachery", address: "Shop No G5/G6, No 142, LGF, Near Phoenix Market City, Velachery, Chennai, Tamil Nadu 600042" },
  ],
  Trivandrum: [
      { region: "Lulu Mall, Anayara", address: "TC 91/270, Unit No D14, GF, Lulu Mall, Anayara, Thiruvananthapuram, Kerala 695029" },
  ],
  Lucknow: [
      { region: "One Awadh Center", address: "Unit No G31, GF, One Awadh Center,  TC G 2/1, Vibhuti Khand, Gomti Nagar, Lucknow, Uttar Pradesh 226010" },
  ],
  Mumbai: [
      { region: "High Street Phoenix, Lower Parel", address: "Unit No 26, UG-23A, 2nd Floor, High Street Phoenix, Senapati Bapat Marg, Lower Parel, Mumbai, Maharashtra 400013" },
  ],
  Navi_Mumbai: [
      { region: "Seawoods Grand Central Mall", address: "No UG-008, Upper Ground Flr, Seawoods Grand Central Mall, Nerul, Navi Mumbai, Maharashtra 400706" },
  ],
  Virar: [
      { region: "Yazoo Park", address: "Shop No 3, Yazoo Park, Near Viva College, Global City, Virar, Maharashtra 401303" },
  ],
};


const Ranking = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [region, setRegion] = useState('');
  const [store, setStore] = useState('');
  const [date, setDate] = useState('');
  
  // State for dropdown visibility
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
      const filtered = data.filter(entry => {
        const matchesRegion = region ? entry.Region === region : true;
        const matchesStore = store ? entry.Store === store : true;
        const matchesDate = date ? entry.Date === date : true;
        return matchesRegion && matchesStore && matchesDate;
      });
      setFilteredData(filtered);
    };

    filterData();
  }, [data, region, store, date]);

  const handleRegionChange = (selectedRegion) => {
    setRegion(selectedRegion);
    setStore(''); // Reset store when region changes
    setCityOpen(false);
  };

  const handleStoreChange = (selectedStore) => {
    setStore(selectedStore);
    setRegionOpen(false);
  };

  // Click outside handler
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
        {/* Filters Section */}
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
  <div 
    className="absolute w-full mt-1 bg-[#0a202b] border border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto z-50"
    style={{ 
      msOverflowStyle: 'none',
      scrollbarWidth: 'none',
      '::-webkit-scrollbar': {
        display: 'none'
      }
    }}
  >
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
              <div className="absolute w-full mt-1 bg-[#0a202b] border border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto z-50"
              style={{ 
                msOverflowStyle: 'none',
                scrollbarWidth: 'none',
                '::-webkit-scrollbar': {
                  display: 'none'
                }
              }}
              >
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
          <div className="w-full md:w-2/3">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Table Section */}
        <div className="w-full overflow-x-auto overflow-y-auto border-gray-900 border rounded-xl"
             style={{ maxHeight: '70vh', scrollbarWidth: 'none' }}>
          <div className="min-w-full inline-block align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-900 bg-opacity-50">
                  <tr>
                    <th scope="col" 
                        className="px-3 md:px-4 py-2 md:py-3 text-center text-xs md:text-sm font-semibold text-white uppercase tracking-wider w-1/6 border-r-2 border-gray-500">
                      Ranking
                    </th>
                    <th scope="col" 
                        className="px-3 md:px-4 py-2 md:py-3 text-center text-xs md:text-sm font-semibold text-white uppercase tracking-wider w-1/2 md:w-1/3 border-r-2 border-gray-500">
                      Name
                    </th>
                    <th scope="col" 
                        className="px-3 md:px-4 py-2 md:py-3 text-center text-xs md:text-sm font-semibold text-white uppercase tracking-wider w-1/3">
                      Lap Time
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-900 bg-opacity-10 divide-y divide-gray-700">
                  {filteredData.map((entry, index) => (
                    <tr key={index} 
                        className="hover:bg-gray-800 hover:bg-opacity-50 transition-colors duration-200 ">
                      <td className="px-3 md:px-4 py-2 md:py-3 whitespace-nowrap text-xs md:text-sm text-white border-r-2 border-gray-500 text-center">
                        {entry.Rank}
                      </td>
                      <td className="px-3 md:px-4 py-2 md:py-3 whitespace-nowrap text-xs md:text-sm text-white border-r-2 border-gray-500 text-center">
                        {entry.Name}
                      </td>
                      <td className="px-3 md:px-4 py-2 md:py-3 whitespace-nowrap text-xs md:text-sm text-white  text-center">
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