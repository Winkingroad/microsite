import React, { useRef, useState } from 'react';
import arrow from '../assets/rightarrow.png';

const locations = {
  Delhi: [
    { region: "Samsung Experience Store Connaught Place (28 Mar 2026)" },
    { region: "Samsung Experience Store Select CityWalk (29 Mar 2026)" },
    { region: "Samsung Experience Store Ambience Mall (05 Apr 2026)" },
    { region: "Samsung Experience Store South Extension II (19 Apr 2026)" }
  ],

  Gurgaon: [
    { region: "Samsung Experience Store Cyberhub (28 Mar 2026)" },
    { region: "Samsung Experience Store Bestech Mall (31 Mar 2026)" }
  ],

  Ahmedabad: [
    { region: "Samsung Experience Store Science City (28 Mar 2026)" },
    { region: "Samsung Experience Store Bhagwan Nagar (29 Mar 2026)" },
    { region: "Samsung Experience Store Palladium Ahmedabad (31 Mar 2026)" },
    { region: "Samsung Experience Store Navrangpura (04 Apr 2026)" }
  ],

  Surat: [
    { region: "Samsung Experience Store IBC Surat (28 Mar 2026)" },
    { region: "Samsung Experience Store Adajan (31 Mar 2026)" }
  ],

  Mumbai: [
    { region: "Samsung Experience Store SkyCity Mall (28 Mar 2026)" },
    { region: "Samsung Experience Store Andheri West (29 Mar 2026)" },
    { region: "Samsung Experience Store Kurla (29 Mar 2026)" },
    { region: "Samsung Experience Store Inorbit Mall (04 Apr 2026)" },
    { region: "Samsung Experience Store Phoenix Palladium (05 Apr 2026)" },
    { region: "Samsung Experience Store Palm Beach (31 Mar 2026)" }
  ],

  Bengaluru: [
    { region: "Samsung Experience Store Basaveshwara Nagar (28 Mar 2026)" },
    { region: "Samsung Experience Store Mall of Asia (29 Mar 2026)" },
    { region: "Samsung Experience Store Koramangala (11 Apr 2026)" },
    { region: "Samsung Experience Store Brigade Road (18 Apr 2026)" }
  ],

  Hyderabad: [
    { region: "Samsung Experience Store Lake Shore (28 Mar 2026)" },
    { region: "Samsung Experience Store Inorbit Mall (29 Mar 2026)" }
  ],

  Chennai: [
    { region: "Samsung Experience Store Adyar (28 Mar 2026)" },
    { region: "Samsung Experience Store Express Avenue (29 Mar 2026)" },
    { region: "Samsung Experience Store Nexus Vijaya Mall (05 Apr 2026)" },
    { region: "Samsung Experience Store Phoenix Velachery (11 Apr 2026)" },
    { region: "Samsung Experience Store VR Mall (12 Apr 2026)" }
  ],

  Pune: [
    { region: "Samsung Experience Store Viman Nagar (29 Mar 2026)" },
    { region: "Samsung Experience Store Mall of Millennium (04 Apr 2026)" },
    { region: "Samsung Experience Store Kopa Mall (05 Apr 2026)" },
    { region: "Samsung Experience Store Phoenix MarketCity (11 Apr 2026)" },
    { region: "Samsung Experience Store Vishrantwadi (12 Apr 2026)" }
  ],

  Bhubaneswar: [
    { region: "Samsung Experience Store Patia (04 Apr 2026)" },
    { region: "Samsung Experience Store Khorda (05 Apr 2026)" }
  ],

  Kolkata: [
    { region: "Samsung Experience Store Park Street (05 Apr 2026)" },
    { region: "Samsung Experience Store South City Mall (19 Apr 2026)" }
  ],

  Chandigarh: [
    { region: "Samsung Experience Store Elante Mall (11 Apr 2026)" },
    { region: "Samsung Experience Store Sector 35C (12 Apr 2026)" },
    { region: "Samsung Experience Store Manimajra (18 Apr 2026)" }
  ],

  Mohali: [
    { region: "Samsung Experience Store CP67 Mall (19 Apr 2026)" }
  ],

  Jaipur: [
    { region: "Samsung Experience Store MI Road (11 Apr 2026)" },
    { region: "Samsung Experience Store Viva City Mall (12 Apr 2026)" },
    { region: "Samsung Experience Store Pratap Nagar (18 Apr 2026)" },
    { region: "Samsung Experience Store Mansarovar (19 Apr 2026)" }
  ],

  Indore: [
    { region: "Samsung Experience Store Phoenix Citadel (12 Apr 2026)" },
    { region: "Samsung Experience Store Tirupati Nagar (18 Apr 2026)" }
  ],

  Dehradun: [
    { region: "Samsung Experience Store Centrio Mall (18 Apr 2026)" },
    { region: "Samsung Experience Store Nehru Colony (19 Apr 2026)" }
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
    const { name, phoneNumber, email, region, store } = formData;
    if (formRef.current && name && phoneNumber && email && region && store) {
      formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    } else {
      setSubmissionMessage('Please fill in all required fields.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-main-bg text-white w-full px-4 py-8 md:py-0">
      <div className="fixed inset-0 bg-main-bg bg-no-repeat bg-center bg-opacity-0 pointer-events-none w-full"
           style={{ backgroundSize: 'contain', filter: 'blur(40px)' }} />

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
              placeholder="Name *"
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
          className="relative -mt-6 md:-mt-8 flex items-center justify-center space-x-2 px-6 py-3 bg-white rounded-full font-semibold text-lg md:text-xl transition duration-300 hover:bg-opacity-25 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
        >
          <span className='text-[#172554]'>All Set</span>
          <svg
            className="w-5 h-5 md:w-6 md:h-6"
            fill="none"
            stroke="#411754"
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
