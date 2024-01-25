import React, { useLayoutEffect, useRef, useState } from 'react';
// import logo from './logo.svg';
import './App.css';

interface LinkResponse {
  _id: string;
  shortLink: string;
}
function App() {
  const linkRef = useRef<HTMLInputElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [shortenUrl, setShortenUrl] = useState<LinkResponse | null>(null)

  useLayoutEffect(() => {



  }, [])
  const shorten = async () => {
    const url = linkRef.current?.value.trim();

    await fetch("http://localhost:8080/shortener",
      {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify({ url }), // body data type must match "Content-Type" header
      }
    )
      .then(r => r.json())
      .then((data) => {
        setShortenUrl(data);
      })
  }
  return (
    <div className="App">
      <header className="App-header">
        <div className='short-link-wrapper'
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <label htmlFor="link">Short Link</label>
          <input id='link' placeholder='https://google.com' ref={linkRef} />
          <button onClick={shorten}>Shorten</button>
        </div>
        {shortenUrl && <div>
          <label>id {shortenUrl?._id}</label>
          <label>id <a href={shortenUrl.shortLink}>{shortenUrl.shortLink}</a></label>
        </div>}
      </header>
    </div>
  );
}

export default App;
