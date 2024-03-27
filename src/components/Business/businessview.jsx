import React, { useEffect, useState } from 'react'
import api from '../../api'
import { useNavigate, useParams } from 'react-router-dom';

const Profileview = () => {
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


    
    const handleDelete = async (event) => {
        event.preventDefault()
        try {
            const response = await api.delete(`/business/${business_id}`)
            if(response.status === 200){
            alert('Business Deleted Successfully')
            navigate(`/business/list/${response.data.user_id}`)    
            console.log(response)
            }
        }
        catch (error) {
            console.log(error)
        }
    }


    const handleEdit = () => {
        navigate(`/business/edit/${business_id}`)
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
        {businessdata && <button onClick={handleEdit} className='bg-purple-800 rounded-md text-white h-7 w-28'>Edit Business</button>}

        <button onClick={handleDelete} className='bg-purple-800 rounded-md text-white h-7 w-36 ml-1'>Delete Business</button>
    </div>
  )
}

export default Profileview