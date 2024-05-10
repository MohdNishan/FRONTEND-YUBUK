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
            console.log(response.data[0]);
        } catch (error) {
            console.error(error);
        }
    }

  return (
    <section className='grid gap-8 md:grid-cols-2 md:items-center md:text-left lg:bg-slate-600'> 
        <div>
            <img src="/Images/tree.jpg" alt="" className='m-5 rounded-lg'/>
        </div>
        <div>
            <h1 className='mb-2 text-3xl font-medium'>Heading</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde esse, labore, praesentium at perferendis voluptatum similique debitis modi officia suscipit beatae accusantium molestiae. Quod animi itaque facere molestias quidem numquam.</p>
        </div>
    </section>
  )
}

export default UserBusinessView