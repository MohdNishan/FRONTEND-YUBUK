import React, { useState, useEffect } from 'react';
import api from '../../api';
import { useNavigate, useParams } from 'react-router-dom';
import { LoginSignout } from '../calendar';

const BusinessList = () => {
  const [businesses, setBusinesses] = useState([]);
  const { profile_id } = useParams();
  const navigate = useNavigate();


  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const response = await api.get(`/businesses/${profile_id}`);
        setBusinesses(response.data);
      } catch (error) {
        console.error({message:'Error fetching businesses', error_message: error});
      } 
    };

    fetchBusinesses();
  },[profile_id]);


  const handlebusiness = () => {
    navigate(`/business/create/${profile_id}`)
  }



  return (  
    <div>
      <h1 className='font-serif font-bold text-2xl'>Businesses</h1>
      {businesses.length === 0 && <p>No Business Found</p>}
      <ul className='list-disc'>
        {businesses.map((business,i) => (
          <li className='hover:text-orange-700 w-28' key={i} onClick={()=>navigate(`/business/view/${business.id} `)}>
            {business.Business_Name}
          </li> 
        ))}
      </ul>
      <button onClick={handlebusiness} className='bg-purple-800 h-8 w-36 text-white rounded-md hover:bg-sky-800 mt-1'>Add Business</button>
      <br/>
      <LoginSignout/>
    </div>
  );
};

export default BusinessList;
