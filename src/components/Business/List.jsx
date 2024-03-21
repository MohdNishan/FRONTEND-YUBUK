import React, { useState, useEffect } from 'react';
import api from '../../api';
import { useNavigate, useParams } from 'react-router-dom';
import { LoginSignout } from '../cal';

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
      <h2>Businesses</h2>
      {businesses.length === 0 && <p>No Business Found</p>}
      <ul>
        {businesses.map((business,i) => (
          <li key={i} onClick={()=>navigate(`/business/view/${business.id} `)}>
            {business.Business_Name}
          </li>
        ))}
      </ul>
      <button onClick={handlebusiness}>Add Business</button>
      <br/>
      <br/>
      <LoginSignout/>
    </div>
  );
};

export default BusinessList;
