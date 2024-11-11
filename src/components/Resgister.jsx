import React, { useRef, useState } from 'react';
import arrow from '../assets/rightarrow.png';

const locations = {
  Delhi: [
    { region: "South Extension", address: "No G26 Part 1 Near Bombay Shirt Company, South Extension, New Delhi, Delhi 110049" },
    { region: "Ambience Mall, Vasant Kunj", address: "No F107, 1st Floor, Ambience Mall, Vasant Kunj, New Delhi, Delhi 110070" },
    { region: "Paschim Vihar", address: "No B2/8, Near HDFC Bank, Paschim Vihar, New Delhi, Delhi 110063" },
    { region: "Connaught Place", address: "N45, Pratap Building, N Block, Opposite Statesman House, Connaught Circus, New Delhi, Delhi 110001" },
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
    { region: "LULU Mall, Sushant Golf City", address: "No D013A, Ground Floor, LULU Mall, Shaheed Path, Sushant Golf City, Lucknow, Uttar Pradesh 226030" },
  ],
  Mumbai: [
    { region: "Highstreet Phoenix", address: "Shop No G 16/17, Highstreet Phoenix, Senapati Bapat Marg, Opposite Citi Bank, Lower Parel, Mumbai, Maharashtra 400013" },
    { region: "Phoenix Market City Mall, Kurla", address: "Ug 83A, Phoenix Market City Mall, LBS Marg, Kurla West, Mumbai, Maharashtra 400070" },
  ],
  Navi_Mumbai: [
    { region: "Krishna Tower, Koparkhairane", address: "SN 11, PN 17, New Krishna Tower Bldg, Sector 14, Next to Jhama Sweets, Koparkhairane, Navi Mumbai, Maharashtra 400709" },
  ],
  Virar: [
    { region: "Kingston Court, Virar West", address: "No 11B, Ground Floor, Kingston Court, 100 Feet Road, Near Kingston Tower, Virar West, Virar, Maharashtra 401303" },
  ],
};

const Register = () => {
  const [formData, setFormData] = useState({
    name: '', phoneNumber: '', email: '', region: '', store: '', age: ''
  });
  const [regions, setRegions] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState('');
  const formRef = useRef(null);
  const [submissionMessage, setSubmissionMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCityChange = (e) => {
    const city = e.target.value;
    setFormData({ ...formData, region: city, store: '' });
    setRegions(locations[city] || []);
    setSelectedAddress('');
  };

  const handleRegionChange = (e) => {
    const region = e.target.value;
    setFormData({ ...formData, store: region });
    const address = locations[formData.region]?.find((loc) => loc.region === region)?.address || '';
    setSelectedAddress(address);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formParams = new URLSearchParams();
    formParams.append('entry.845749839', formData.name);
    formParams.append('entry.1570823663', formData.phoneNumber);
    formParams.append('entry.1504333223', formData.email);
    formParams.append('entry.1333575331', formData.store);
    formParams.append('entry.64713434', formData.region);
    formParams.append('entry.706476518', formData.age);

    setFormData({ name: '', phoneNumber: '', email: '', region: '', store: '', age: '' });
    setSubmissionMessage('Form submitted successfully!');
    try {
      await fetch('https://docs.google.com/forms/u/0/d/e/1FAIpQLScahxCgse3UVzMk_wsFL2S3OxIAVP-ajOv1wtUegV1me5LQ3Q/formResponse', {
        method: 'POST',
        body: formParams,
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });
    } catch (error) {
      console.error('Error:', error);
      setSubmissionMessage('There was an error submitting the form.');
    }
  };

  const handleButtonClick = () => {
    if (formRef.current && Object.values(formData).every(field => field)) {
      formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    } else {
      setSubmissionMessage('Please fill in all required fields.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white w-full px-4 py-8 md:py-0">
      {/* Background image container with responsive sizing */}
      <div className="fixed inset-0 bg-thumbnail bg-no-repeat bg-center opacity-50 pointer-events-none"
           style={{ backgroundSize: 'contain' }} />
      
      {/* Main content container */}
      <div className="relative w-full max-w-md md:max-w-xl p-4 md:p-8 bg-white bg-opacity-5 shadow-custom2 rounded-3xl md:rounded-[44px]">
        <h2 className="text-2xl md:text-3xl font-semibold text-left mb-4 md:mb-6 py-2 md:py-4 border-b border-white border-opacity-20">
          Register Yourself
        </h2>
        
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
          <div className="space-y-3 md:space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full px-3 md:px-4 py-3 md:py-4 bg-gray-700 bg-opacity-50 text-white placeholder-gray-100 focus:outline-none text-lg md:text-xl font-bold md:font-extrabold rounded-lg"
              required
            />
            
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full px-3 md:px-4 py-3 md:py-4 bg-gray-700 bg-opacity-50 text-white placeholder-gray-100 focus:outline-none text-lg md:text-xl font-bold md:font-extrabold rounded-lg"
              required
            />
            
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email ID"
              className="w-full px-3 md:px-4 py-3 md:py-4 bg-gray-700 bg-opacity-50 text-white placeholder-gray-100 focus:outline-none text-lg md:text-xl font-bold md:font-extrabold rounded-lg"
              required
            />
            
            <select
              name="region"
              value={formData.region}
              onChange={handleCityChange}
              className="w-full px-3 md:px-4 py-3 md:py-4 bg-gray-700 bg-opacity-50 text-white placeholder-gray-100 focus:outline-none text-lg md:text-xl font-bold md:font-extrabold rounded-lg"
              required
            >
              <option value="" className='bg-[#0a202b]'>Select Region</option>
              {Object.keys(locations).map((city) => (
                <option key={city} className='bg-[#0a202b]' value={city}>{city}</option>
              ))}
            </select>
            
            <select
              name="store"
              value={formData.store}
              onChange={handleRegionChange}
              className="w-full px-3 md:px-4 py-3 md:py-4 bg-gray-700 bg-opacity-50 text-white placeholder-gray-100 focus:outline-none text-lg md:text-xl font-bold md:font-extrabold rounded-lg"
              required
            >
              <option value="" className='bg-[#0a202b]'>Select Store</option>
              {regions.map((region, index) => (
                <option key={index} className='bg-[#0a202b]' value={region.region}>{region.region}</option>
              ))}
            </select>
            
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Age"
              className="w-full px-3 md:px-4 py-3 md:py-4 bg-gray-700 bg-opacity-50 text-white placeholder-gray-100 focus:outline-none text-lg md:text-xl font-bold md:font-extrabold rounded-lg"
              required
            />
          </div>
        </form>
        {submissionMessage && (
          <p className="mt-4 text-center text-lg font-semibold text-green-400">{submissionMessage}</p>
        )}
      </div>
      <div className='mt-5'>
      <button
        type="button"
        onClick={handleButtonClick}
        className="relative  -mt-6 md:-mt-8 flex items-center justify-center space-x-2 px-6 py-3 bg-white rounded-full font-semibold text-lg md:text-xl transition duration-300 hover:bg-opacity-25 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
      >
        <span className='text-[#172554]'>All Set</span>
        <svg
          className="w-5 h-5 md:w-6 md:h-6 "
          fill="none"
          stroke="#172554"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
      </button>
      </div>
    </div>
  );
};

export default Register;