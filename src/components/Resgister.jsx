import React, { useRef, useState } from 'react';
import arrow from '../assets/rightarrow.png';

const locations = {
 Pune: [
   { region: "Samsung Experience Store - Mall of Millennium, Pune (3rd & 4th May)" },
   { region: "Samsung Experience Store - Phoenix Marketcity, Pune (3rd & 4th May)" }
 ],
 Bangalore: [
   { region: "Samsung Experience Store - Koramangala, Bengaluru (3rd & 4th May)" },
   { region: "Samsung Experience Store - Basaveshwara Nagar, Bengaluru (3rd & 4th May)" },
   { region: "Samsung Experience Store - Indiranagar, Bengaluru (26th & 27th April)" },
   { region: "Samsung Opera House, Bengaluru (26th & 27th April)" },
   { region: "Samsung Experience Store - Mall of Asia, Bengaluru (26th & 27th April)" }
 ],
 Chandigarh: [
   { region: "Samsung Experience Store - Elante Mall, Chandigarh (3rd & 4th May)" },
   { region: "Samsung Experience Store - Sector 22, Chandigarh (26th & 27th April)" }
 ],
 Mohali: [
   { region: "Samsung Experience Store - CP67 Mall, Mohali (3rd & 4th May)" }
 ],
 Surat: [
   { region: "Samsung Experience Store - IBC, Surat (3rd & 4th May)" }
 ],
 Delhi: [
   { region: "Samsung Experience Store - Connaught Place, Delhi (3rd & 4th May)" },
   { region: "Samsung Experience Store - South Extension II, Delhi (3rd & 4th May)" },
   { region: "Samsung Experience Store - Select Citywalk, Saket, Delhi (3rd & 4th May)" },
   { region: "Samsung Experience Store - Ambience Vasant Kunj, Delhi (26th & 27th April)" }
 ],
 Ahmedabad: [
   { region: "Samsung Experience Store - Navrangpura, Ahmedabad (3rd & 4th May)" },
   { region: "Samsung Experience Store - Palladium, Ahmedabad (26th & 27th April)" }
 ],
 Mumbai: [
   { region: "Samsung Experience Store - Phoenix Palladium, Lower Parel, Mumbai (3rd & 4th May)" }
 ],
 Chennai: [
   { region: "Samsung Experience Store - Phoenix MarketCity, Chennai (26th & 27th April)" }
 ],
 Hyderabad: [
   { region: "Samsung Experience Store - Inorbit Mall, Hyderabad (26th & 27th April)" }
 ],
 Lucknow: [
   { region: "Samsung Experience Store - Lulu Mall, Lucknow (26th & 27th April)" }
 ],
 Gurgaon: [
   { region: "Samsung Experience Store - Cyberhub, Gurugram (26th & 27th April)" }
 ],
 Trivandrum: [
   { region: "Samsung Experience Store - Lulu Mall, Trivandrum (26th & 27th April)" }
 ],
 Kolkata: [
   { region: "Samsung Experience Store - South City Mall, Kolkata (26th & 27th April)" },
   { region: "Samsung Experience Store - Park Street, Kolkata (26th & 27th April)" }
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white w-full px-4 py-8 md:py-0">
      <div className="fixed inset-0 bg-main-bg bg-no-repeat bg-center opacity-50 pointer-events-none"
           style={{ backgroundSize: 'contain', filter: 'blur(20px)' }} />

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
