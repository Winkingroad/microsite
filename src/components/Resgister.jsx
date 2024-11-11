import React, { useRef, useState } from 'react';
import arrow from '../assets/rightarrow.png';

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