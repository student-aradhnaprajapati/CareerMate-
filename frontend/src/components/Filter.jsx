import React from 'react';

const Filter = ({ filters, onChange }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target; 
    onChange({ ...filters, [name]: value });
  };
  // CUSTOM HOOK 
  return (
    <div className="flex justify-center mb-4 space-x-4">
      <select
        name="domain"
        value={filters.domain}
        onChange={handleInputChange}
        className="p-2 border rounded-md bg-yellow-500 text-black"
      >
        <option value="">Select Domain</option>
        <option value="domain1">Domain 1</option>
        <option value="domain2">Domain 2</option>
      </select>
      <select
        name="experience"
        value={filters.experience}
        onChange={handleInputChange}
        className="p-2 border rounded-md bg-red-500 text-white"
      >
        <option value="">Select Experience</option>
        <option value="1-3">1-3 Years</option>
        <option value="3-5">3-5 Years</option>
        <option value="5+">5+ Years</option>
      </select>
    </div>
  );
};

export default Filter;
