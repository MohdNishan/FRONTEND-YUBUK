import React, { useEffect, useState } from 'react'
import api from '../../api';

const Userprofileedit = () => {

    const [userdata, setuserdata] = useState({
        Name: '',
        Email: '',
        Address: '',
        Date_of_Birth: ''
    })
    const [updatesuccess, setupdatesuccess] = useState(false);
    const [updatefail, setupdatefail] = useState(false);

    useEffect (() => {
        fetchUserProfile()
    },[])

    const fetchUserProfile = async () => {
        try {
            const response = await api.get('/authme')
            setuserdata(response.data[0]);
            console.log(response)
        }
        catch (error) {
            console.error(error)    
        }
    }

    const handleSubmit = async (event) =>{
        event.preventDefault();
        try{
            const response = await api.put('/user',userdata);
            setupdatesuccess(true)
            setupdatefail(false)
            console.log(response);
        }  catch (error) {
            console.error({ message: 'Error', error_message: error });
            setupdatesuccess(false)
            setupdatefail(true)
        }
    } 
    const handleChange = (event) => {
        const { name, value } = event.target;
        setuserdata(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


  return (
    <div className='w-72'>
        <h1 className='text-2xl font-bold font-serif'>Edit page</h1>
        <form onSubmit={handleSubmit}>
            <div className='flex justify-between'>
                <label>Name : </label>
                <input
                    type="text" 
                    name='Name'
                    value={userdata.Name || ''}
                    onChange={handleChange}
                    className='border-2 border-gray-400 rounded-sm'
                />
            </div>
            <div className='flex justify-between'>
                <label>Email : </label>
                <input
                    type="email"
                    name='Email'
                    value={userdata.Email || ''}
                    onChange={handleChange}
                    className='border-2 border-gray-400 rounded-sm mt-1'
                />
            </div>
            <div className='flex justify-between'>
                <label>Address : </label>
                <input
                    type="address"
                    name='Address'
                    value={userdata.Address || ''}
                    onChange={handleChange}
                    className='border-2 border-gray-400 rounded-sm mt-1'
                />
            </div>
            <div className='flex justify-between'>
                <label>Date of Birth : </label>
                <input
                    type="text"
                    name='Date_of_Birth'
                    value={userdata.Date_of_Birth || ''}
                    onChange={handleChange}
                    className='border-2 border-gray-400 rounded-sm mt-1'
                />
            </div>
                <button type="submit" className='bg-purple-800 rounded-md text-white h-7 w-20'>Submit</button>
            </form>
            {updatesuccess && <p style={{ color:'green' }}>Profile Updated Successfully</p>}
        </div>
  )
}

export default Userprofileedit