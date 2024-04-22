import React, { useEffect } from 'react'
import { useState } from 'react';

export const LoginSignout = () => {
  const gapi = window.gapi;
  const google = window.google;

  
  const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
  const API_KEY = import.meta.env.VITE_API_KEY;
  const DISCOVERY_DOC = import.meta.env.VITE_DISCOVERY_DOC;
  const SCOPES = import.meta.env.VITE_SCOPES;


  const [googletoken, setgoogletoken] = useState()
  const [expiresIn, setexpiresIn] = useState()

  const [tokenClient, setTokenClient] = useState()

  useEffect(() => {
    setgoogletoken(localStorage.getItem('google_token'))
    setexpiresIn(localStorage.getItem('expires_in'))
    gapiLoaded()
    gisLoaded()
}, [googletoken,expiresIn])

function gapiLoaded() {
    
    gapi.load('client', initializeGapiClient);
}

async function initializeGapiClient() {
    await gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: [DISCOVERY_DOC],
    });
    
    
    if (googletoken && expiresIn) {
        gapi.client.setToken({
            access_token: googletoken,
            expires_in: expiresIn,
        });
    }
}

function gisLoaded() {
    setTokenClient(google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: ""
    }))
  }
  
  
  function handleAuthClick() {
        tokenClient.callback = async (resp) => {
          if (resp.error) {
            throw (resp);
          }
          const { access_token, expires_in } = gapi.client.getToken();
          localStorage.setItem('google_token', access_token);
          localStorage.setItem('expires_in', expires_in)
          addManualEvent()
        };
        if (!(googletoken && expiresIn)) {
          tokenClient.requestAccessToken({ prompt: 'consent' });
        } else {
          tokenClient.requestAccessToken({ prompt: '' });
        }
  }

  //Sign out the user upon button click.

  // function handleSignoutClick() {
  //   const token = gapi.client.getToken();
  //   if (token !== null) {
  //     google.accounts.oauth2.revoke(token.google_token);
  //     gapi.client.setToken('');
  //     localStorage.removeItem("google_token");
  //     localStorage.removeItem("expires_in");
  //     setgoogletoken();
  //     setexpiresIn();
  //   }
  // }
  
  function addManualEvent(){
    var event = { 
      'summary': 'Event 8',
      'location': 'cusat School, kochi',
      'description': 'Paty time',
      'start': {
        'dateTime': '2024-04-21T04:04:00.000Z',
        'timeZone': 'UTC'
      },
      'end': {
        'dateTime': '2024-04-22T04:35:00.000Z',
        'timeZone': 'UTC'
      },
    }

      var request = gapi.client.calendar.events.insert({'calendarId': 'primary','resource': event,'sendUpdates': 'all'});
      request.execute((event)=>{
          console.log(event)
      },(error)=>{
        console.error(error);
      });
  }
  return (
    <div>
      <button id="authorize_button" hidden={googletoken && expiresIn} onClick={handleAuthClick} className='bg-purple-800 h-8 w-36 text-white rounded-md hover:bg-sky-800 mt-1'>Add to Calendar</button>
      <button id="signout_button" hidden={!googletoken && !expiresIn}   onClick={handleAuthClick} className='bg-purple-800 h-8 w-36 text-white rounded-md hover:bg-sky-800 mt-1'>Switch Account</button>
      <button id='add_manual_event' hidden={!googletoken && !expiresIn} onClick={addManualEvent} className='bg-purple-800 h-8 w-36 text-white rounded-md hover:bg-sky-800 mt-1 ml-1'>Add Event</button>
      {/* <pre id="content" style={{ whiteSpace: 'pre-wrap' }}></pre> */}
    </div>
  )
}