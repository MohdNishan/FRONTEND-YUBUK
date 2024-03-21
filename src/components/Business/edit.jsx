import React, { useEffect, useState } from 'react'
import api from '../../api';
import { useParams } from 'react-router-dom';

const Businessedit = () => {

    const [businessdata, setbusinessdata] = useState({
        Business_Name: '',
        Email: '',
        Website: '',
        Opening_hours: '',
        Location: '',
        Image: '',
        Contact_Number: ''
    });
    
    const [updatesuccess, setupdatesuccess] = useState("");
    const [updatefail, setupdatefail] = useState("");
    const { business_id } = useParams()

    useEffect(() => {
        fetchbusinessprofile()
    },[business_id])

    const fetchbusinessprofile = async () => {
        try {
            const response = await api.get(`/businessview/${business_id}`)
            setbusinessdata(response.data[0])
        }
        catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {

            const response = await api.put(`/business/${business_id}`,businessdata)
            setupdatesuccess(response.data)
            setupdatefail("")
            console.log(response)
        } catch (error) {
            console.log({ message: 'Error', error_messge: error})
            setupdatesuccess("")
            setupdatefail(error.response.data)
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setbusinessdata(prevState => ({
            ...prevState,
            [name]: value
        }))
    }


  return (
    <div>
        <h1>
            Business Edit
        </h1>
        <form onSubmit={handleSubmit}>
            <label>Business Name : </label>
            <input 
                type='text'
                name='Business_Name'
                value={businessdata.Business_Name || ''}
                onChange={handleChange}
            />
            <br/>
            <label>Email : </label>
            <input 
                type='email'
                name='Email'
                value={businessdata.Email || ''}
                onChange={handleChange}
            />
            <br/>
            <label>Website : </label>
            <input
                type='text'
                name='Website'
                value={businessdata.Website || ''}
                onChange={handleChange}
            />
            <br/>
            <label>Opening hours : </label>
            <input
                type='text'
                name='Opening_hours'
                value={businessdata.Opening_hours || ''}
                onChange={handleChange}
            />
            <br/>
            <label>Location : </label>
            <input
                type='text'
                name='Location'
                value={businessdata.Location || ''}
                onChange={handleChange}
            />
            <br/>
            <label>Image : </label>
            <input
                type='Image'
                name='Image'
                value={businessdata.Image || ''}
                onChange={handleChange}
            />
            <br/>
            <label>Contact number : </label>
            <input
                type='text'
                name='Contact_number'
                defaultValue={businessdata.Contact_Number || ''}
                onChange={handleChange}
            />
            <br/>
            <button>Submit</button>
        </form>
        {updatesuccess && <p style={{ color: 'green', fontStyle: 'italic' }}>Update Successfull</p>}
        {updatefail && <p style={{ color: 'red', fontStyle: 'italic' }}>Update Failed</p>}
    </div>
  )
}

export default Businessedit