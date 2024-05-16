<div>
        <h1 className='text-2xl font-serif font-bold'>
            Business Profile
        </h1>
        { businessdata && (
        <div>
            <p>Business_Name : {businessdata?.Business_Name}</p>
            <p>Email : {businessdata?.Email}</p>
            <p>Website : {businessdata?.Website}</p>
            <p>Opening_hours : {businessdata?.Opening_hours}</p>
            <p>Location : {businessdata?.Location}</p>
            <p>Image : {businessdata?.Image}</p>
            <p>Contact_number : {businessdata?.Contact_Number}</p>
        </div>
        )}
        <button>Book Now</button>
    </div>