import React, { useEffect, useState } from 'react';
import Card from './Card';
import Filter from './Filter';
import VerticalNavBar from './verticalNavBar';
import { json } from 'react-router';

const CounsellorList = () => {
  // const [counselors, setCounselors] = useState([
  //   {
  //     id: 1,
  //     name: 'Mr. Jagdish Rajput',
  //     domain: 'Engineering',
  //     rating: 4.5,
  //     // slots: [
  //     //   { date: '2024-09-10', time: '10:00 AM' },
  //     //   { date: '2024-09-11', time: '2:00 PM' }
  //     // ]
  //   },


  // ]);
  
  const [counselors, setCounselors] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:5001/api/v1/counsellor/getAllCouns');
      const result = await response.json();
      setCounselors(result.counsellors.rows);
      console.log(result);
      console.log(result.counsellors.rows);
    };
    fetchData();
  }, []);
  
  const [filters, setFilters] = useState({ domain: '', experience: '' });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    // Filter logic based on the filters
  };

  return (
    <div className="flex">
      {/* <VerticalNavBar /> */}
      <div className="p-4 w-full">
        {/* <Filter filters={filters} onChange={handleFilterChange} /> */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {counselors?.map((counselor) => (
            <Card counselor={counselor} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CounsellorList;
