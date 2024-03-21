import React, { useEffect } from 'react'
import { useState } from 'react';

export const LoginSignout = () => {
  const gapi = window.gapi;
  const google = window.google;

  const CLIENT_ID = process.env.CLIENT_ID;
  const API_KEY = process.env.API_KEY;
  const DISCOVERY_DOC = process.env.DISCOVERY_DOC;
  const SCOPES = process.env.SCOPES;


  const [accessToken, setaccessToken] = useState()
  const [expiresIn, setexpiresIn] = useState()
//   console.log(accessToken,expiresIn)

  const [tokenClient, setTokenClient] = useState()
// let tokenClient

  useEffect(() => {
    //const expiryTime = new Date().getTime() + expiresIn * 1000;
    setaccessToken(localStorage.getItem('access_token'))
    setexpiresIn(localStorage.getItem('expires_in'))
    gapiLoaded()
    gisLoaded()
}, [accessToken,expiresIn])

function gapiLoaded() {
    
    gapi.load('client', initializeGapiClient);
}

async function initializeGapiClient() {
    await gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: [DISCOVERY_DOC],
    });
    
    
    if (accessToken && expiresIn) {
        gapi.client.setToken({
            access_token: accessToken,
            expires_in: expiresIn,
        });
        //   listUpcomingEvents();
    }
}

function gisLoaded() {
    setTokenClient(google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: "" // defined later
    }))
  }
  
  

  //Enables user interaction after all libraries are loaded.

  function handleAuthClick() {
    // console.log("hwlloooo")
    // if (!tokenClient) {
    //     console.error('tokenClient is undefined');
    //     return;
    // }
        tokenClient.callback = async (resp) => {
          if (resp.error) {
            throw (resp);
          }
        //   await listUpcomingEvents();
          const { access_token, expires_in } = gapi.client.getToken();
          localStorage.setItem('access_token', access_token);
          localStorage.setItem('expires_in', expires_in)
        };
        if (!(accessToken && expiresIn)) {
          // Prompt the user to select a Google Account and ask for consent to share their data
          // when establishing a new session.
          tokenClient.requestAccessToken({ prompt: 'consent' });
        } else {
          // Skip display of account chooser and consent dialog for an existing session.
          tokenClient.requestAccessToken({ prompt: '' });
        }
  }

  //Sign out the user upon button click.

  function handleSignoutClick() {
    const token = gapi.client.getToken();
    if (token !== null) {
      google.accounts.oauth2.revoke(token.access_token);
      gapi.client.setToken('');
      localStorage.removeItem("access_token");
      localStorage.removeItem("expires_in");
      setaccessToken();
      setexpiresIn();
    }
  }

//   async function listUpcomingEvents() {
//     let response;
//     try {
//       const request = {
//         'calendarId': 'primary',
//         'timeMin': (new Date()).toISOString(),
//         'showDeleted': false,
//         'singleEvents': true,
//         'maxResults': 10,
//         'orderBy': 'startTime',
//       };
//       response = await gapi.client.calendar.events.list(request);
//     } catch (err) {
//       document.getElementById('content').innerText = err.message;
//       return;
//     }

//     const events = response.result.items;
//     if (!events || events.length === 0) {
//       document.getElementById('content').innerText = 'No events found.';
//       return;
//     }
//     // Flatten to string to display
//     const output = events.reduce(
//       (str, event) => `${str}${event.summary} (${event.start.dateTime || event.start.date})\n,'Events:\n'`);
//     document.getElementById('content').innerText = output;
//   }
  
  function addManualEvent(){
    var event = { 
      'summary': 'Event 3',
      'location': 'cusat School, kochi',
      'description': 'Paty time',
      'start': {
        'dateTime': '2024-03-21T04:04:00.000Z',
        'timeZone': 'UTC'
      },
      'end': {
        'dateTime': '2024-03-22T04:35:00.000Z',
        'timeZone': 'UTC'
      },
    }

      var request = gapi.client.calendar.events.insert({'calendarId': 'primary','resource': event,'sendUpdates': 'all'});
      request.execute((event)=>{
          console.log(event)
        //   window.open(event.htmlLink)
      },(error)=>{
        console.error(error);
      });
  }
//   console.log(tokenClient)
  return (
    <div>
      <button id="authorize_button" hidden={accessToken && expiresIn} onClick={handleAuthClick}>Authorize</button>
      <button id="signout_button" hidden={!accessToken && !expiresIn}   onClick={handleSignoutClick}>Switch Account</button>
      <button id='add_manual_event' hidden={!accessToken && !expiresIn} onClick={addManualEvent}>Add Event</button>
      {/* <pre id="content" style={{ whiteSpace: 'pre-wrap' }}></pre> */}
    </div>
  )
}