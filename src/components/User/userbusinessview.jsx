import React, { useEffect, useState } from 'react'
import api from '../../api'
import { useNavigate, useParams } from 'react-router-dom';

const UserBusinessView = () => {
    const [businessdata, setbusinessdata] = useState();
    const { business_id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchUserProfile()
    },[])

    const fetchUserProfile = async () => {
        try {
            const response = await api.get(`/businessview/${business_id}`);  
            if(!response.data.message){
                setbusinessdata(response.data[0]);
                console.log(response.data)
            }
            console.log(response.data[0].id);
        } catch (error) {
            console.error(error);
        }
    }

  return (
    <div>
        <h1 className='text-2xl font-serif font-bold'>
            Business Profile
        </h1>
        {businessdata && (
        <div>
            <p>Business_Name : {businessdata.Business_Name}</p>
            <p>Email : {businessdata.Email}</p>
            <p>Website : {businessdata.Website}</p>
            <p>Opening_hours : {businessdata.Opening_hours}</p>
            <p>Location : {businessdata.Location}</p>
            <p>Image : {businessdata.Image}</p>
            <p>Contact_number : {businessdata.Contact_Number}</p>
        </div>
        )}
        <button>Book Now</button>
    </div>
  )
}

export default UserBusinessView