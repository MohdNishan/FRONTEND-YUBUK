import React, { useState } from 'react'
import api from '../../api';
import { useParams } from 'react-router-dom';


const Businessprofile = () => {
    const { profile_id } = useParams();

    const [Business_Name, setBusinessName] = useState('');
    const [Email, setemail] = useState('');
    const [Website, setWebsite] = useState('');
    const [Opening_hours, setOpeninghours] = useState('');
    const [Location, setLocation] = useState('');
    const [Image, setImage] = useState('');
    const [Contact_Number, setContactnumber] = useState('');
    
    const [created, setcreated] = useState("");
    const [exist, setexist] = useState("");
 
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {

            const response = await api.post(
                '/business',
                { Business_Name,Email,Website,Opening_hours,Location,Image,Contact_Number,user_id:profile_id },
            )
            setcreated(response.data)
            setexist("")
            console.log(response)
        } catch (error) {
            setexist(error.response.data)
            setcreated("")

            console.log({ message : 'Error', error_message : error })
        }
    }


  return (
    <div>
        <h1>
            Create Business
        </h1>
        <form onSubmit={handleSubmit}>
            <label>Business Name : </label>
            <input 
                type='text'
                value={Business_Name}
                onChange={(event) => setBusinessName(event.target.value) }
            />
            <br/>
            <label>Email : </label>
            <input 
                type='email'
                value={Email}
                onChange={(event) => setemail(event.target.value) }
            /> 
            <br/>
            <label>Website : </label>
            <input 
                type='text'
                value={Website}
                onChange={(event) => setWebsite(event.target.value)}
            />
            <br/>
            <label>Operating Hours : </label>
            <input 
                type='text'
                value={Opening_hours}
                onChange={(event) => setOpeninghours(event.target.value)}
            />
            <br/>
            <label>Location : </label>
            <input 
                type='text'
                value={Location}
                onChange={(event) => setLocation(event.target.value)}
            />
            <br/>
            <label>Image : </label>
            <input 
                type='image'
                value={Image}
                onChange={(event) => setImage(event.target.value)}
            />
            <br/>
            <label>Contact Number : </label>
            <input 
                type='text'
                value={Contact_Number}
                onChange={(event) => setContactnumber(event.target.value)}
            />
            <br/>
            <button>Submit</button>
        </form>
        {created && <p style={{ color: 'green', fontStyle: 'italic' }}>{created}</p>}
        {exist && <p style={{ color: 'red', fontStyle: 'italic' }}>{exist}</p>}

    </div>
    )
}

export default Businessprofile 