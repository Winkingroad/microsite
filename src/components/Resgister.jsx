import React, { useRef, useState } from 'react';
import arrow from '../assets/rightarrow.png';

const locations = {
  Delhi: [
    { region: "Select Citywalk Saket (16th & 17th Nov)" },
    { region: "Aidhi Projects Pvt Ltd, Rajouri Garden (23rd & 24th Nov)" },
    { region: "Metro Mobiles, Paschim Vihar (30th Nov & 1st Dec)" },
    { region: "Connaught Place (30th Nov & 1st Dec)" },
    { region: "Star Mobitel Ltd, South Extension (7th & 8th Dec)" },
    { region: "Ambience Vasant Kunj (7th & 8th Dec)" }
  ],
  Gurgaon: [
    { region: "Spectra & Star Convergence Limited, Ambience Mall (16th & 17th Nov)" },
    { region: "Spectra And Star Convergence Limited, Ardee Mall (23rd & 24th Nov)" },
    { region: "Cyberhub (30th Nov & 1st Dec)" }
  ],
  Noida: [
    { region: "Agmatel India Pvt.Ltd, DLF Mall of India (23rd & 24th Nov)" },
    { region: "Tech Mart, Sector 18 (7th & 8th Dec)" },
    { region: "Device Mart Private Limited, Sector 18 (7th & 8th Dec)" }
  ],
  Ahmedabad: [
    { region: "Techno Ventures, Prahlad Nagar Road (16th & 17th Nov)" },
    { region: "Techno Ventures, Maninagar (30th Nov & 1st Dec)" },
    { region: "Palladium Ahmedabad (7th & 8th Dec)" }
  ],
  Surat: [
    { region: "IBC Surat (16th & 17th Nov)" },
    { region: "Shivam Sales, Adajan (30th Nov & 1st Dec)" }
  ],
  Mumbai: [
    { region: "Ssk Retails Pvt Ltd, Phoenix Market City Mall (16th & 17th Nov)" },
    { region: "Retail Shop, Lower Parel (23rd & 24th Nov)" }
  ],
  NaviMumbai: [
    { region: "Breathe Enterprises, Koparkhairane (16th & 17th Nov)" }
  ],
  Pune: [
    { region: "Mall of Millennium Pune (16th & 17th Nov)" },
    { region: "Karuna Management Services Limited, Viman Nagar (23rd & 24th Nov)" },
    { region: "Tech Star Retail, Seasons Mall (23rd & 24th Nov)" },
    { region: "Navkar Communication, Bibvewadi (30th Nov & 1st Dec)" },
    { region: "Ssk Retails Pvt Ltd, Jangli Maharaj Road (7th & 8th Dec)" }
  ],
  Bangalore: [
    { region: "Concepts Inc, Indiranagar (16th & 17th Nov)" },
    { region: "Samsung Opera House (16th & 17th Nov)" },
    { region: "UB City Bengaluru (16th & 17th Nov)" },
    { region: "Concepts Inc, Marathalli (23rd & 24th Nov)" },
    { region: "Mall of Asia Bengaluru (23rd & 24th Nov)" },
    { region: "Touch Tech Telecom, Electronic City (30th Nov & 1st Dec)" },
    { region: "IT World, Lulu Mall (30th Nov & 1st Dec)" },
    { region: "Jfk Trust, Whitefield (7th & 8th Dec)" }
  ],
  Hyderabad: [
    { region: "Inorbit Mall Hyderabad (23rd & 24th Nov)" },
    { region: "Vasisht Retail, Madhapur (23rd & 24th Nov)" },
    { region: "Premium Lifestyle India Pvt Ltd, Kondapur (30th Nov & 1st Dec)" },
    { region: "S.S. Communications, Himayat Nagar (7th & 8th Dec)" }
  ],
  Secunderabad: [
    { region: "IT World, DSL Virtue Mall (7th & 8th Dec)" }
  ],
  Chennai: [
    { region: "Phoenix MarketCity, Chennai (23rd & 24th Nov)" }
  ],
  Lucknow: [
    { region: "Lulu Mall Lucknow (23rd & 24th Nov)" }
  ],
  Virar: [
    { region: "Infiniti Telecom, Virar West (23rd & 24th Nov)" }
  ],
  Mohali: [
    { region: "CP67 Mohali (30th Nov & 1st Dec)" }
  ],
  Chandigarh: [
    { region: "Elante Mall, Chandigarh (30th Nov & 1st Dec)" },
    { region: "Electro Photo Equipments Pvt Ltd, Sector 35 C (7th & 8th Dec)" },
    { region: "Electrophoto Equipments Private Limited, Sector 22 (7th & 8th Dec)" }
  ],
  Dehradun: [
    { region: "Arora Enterprises, Old Connaught Place (23rd & 24th Nov)" },
    { region: "Arora Enterprises, Chakarata Road (30th Nov & 1st Dec)" },
    { region: "Pacific Mall Dehradun (7th & 8th Dec)" }
  ],
  Kolkata: [
    { region: "Park Street, Kolkata (30th Nov & 1st Dec)" },
    { region: "R G Networks, South City Mall (7th & 8th Dec)" }
  ],
  Trivandrum: [
    { region: "Lulu Mall Trivandrum (7th & 8th Dec)" }
  ]
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
              placeholder="Phone Number *"
              className="w-full px-3 md:px-4 py-3 md:py-4 bg-gray-700 bg-opacity-50 text-white placeholder-gray-100 focus:outline-none text-lg md:text-xl font-bold md:font-extrabold rounded-lg"
              required
            />
            
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email ID *"
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
              <option value="" className='bg-[#0a202b]'>Select Your City</option>
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
              <option value="" className='bg-[#0a202b]'>Select Your Samsung Experience Store</option>
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