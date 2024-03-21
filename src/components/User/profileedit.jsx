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
    <div>
        <h1>Edit page</h1>
        <form onSubmit={handleSubmit}>
        
        <label>Name : </label>
                <input
                    type="text" 
                    name='Name'
                    value={userdata.Name || ''}
                    onChange={handleChange}
                />
                <br />
                <label>Email : </label>
                <input
                    type="email"
                    name='Email'
                    value={userdata.Email || ''}
                    onChange={handleChange}
                />
                <br />
                <label>Address : </label>
                <input
                    type="address"
                    name='Address'
                    value={userdata.Address || ''}
                    onChange={handleChange}
                />
                <br/>
                <label>Date of Birth : </label>
                <input
                    type="text"
                    name='Date_of_Birth'
                    value={userdata.Date_of_Birth || ''}
                    onChange={handleChange}
                />
                <br />
                <button type="submit">Submit</button>
            </form>
            {updatesuccess && <p style={{ color:'green' }}>Profile Updated Successfully</p>}
        </div>
  )
}

export default Userprofileedit