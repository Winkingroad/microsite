import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from 'react-icons/fa'; // Optional for custom icon

const CustomDatePicker = () => {
  const [date, setDate] = useState(null);

  return (
    <div className="w-full">
      <DatePicker
        selected={date}
        onChange={(date) => setDate(date)}
        placeholderText="Select the Date"
        className="bg-gray-800 bg-opacity-40 text-white py-2 px-4 rounded focus:outline-none w-full"
        calendarClassName="bg-gray-800 text-white"
        renderCustomHeader={({
          date,
          changeYear,
          changeMonth,
          increaseMonth,
          decreaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div className="flex justify-between items-center mb-2">
            <button
              className={`p-2 ${prevMonthButtonDisabled ? 'opacity-50' : ''}`}
              onClick={decreaseMonth}
            >
              <FaCalendarAlt color="blue" />
            </button>
            <span className="text-white">{date.toLocaleString('default', { month: 'long' })} {date.getFullYear()}</span>
            <button
              className={`p-2 ${nextMonthButtonDisabled ? 'opacity-50' : ''}`}
              onClick={increaseMonth}
            >
              <FaCalendarAlt color="blue" />
            </button>
          </div>
        )}
      />
    </div>
  );
};

export default CustomDatePicker;
