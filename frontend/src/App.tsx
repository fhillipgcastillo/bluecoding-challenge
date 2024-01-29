import React, { useLayoutEffect, useRef, useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import { createShortLink, getShortLinks } from './services/apiFetcher';

interface ILink {
  _id: string;
  url: string;
}
interface IShortenLink {
  _id: string;
  title?: string;
  link: ILink;
  shortenLink: string;
}

function App() {
  const linkRef = useRef<HTMLInputElement>(null);
  const [shortenLinks, setShortenLink] = useState<IShortenLink[]>([]);

  useLayoutEffect(() => {
    refreshShortenLinks()
  }, []);

  const refreshShortenLinks = async () => {
    await getShortLinks()
      .then((data) => {
        setShortenLink(data)
      })
  }

  const shorten = async () => {
    const url = linkRef.current?.value.trim();
    if (url) {
      createShortLink(url).then(() => {
        refreshShortenLinks();
      })
    }
  }
  return (
    <div className="App">
      <header className="App-header">
        <div className='short-link-wrapper'
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            alignItems: "center",
            height: "50vh"
          }}
        >
          <h1>Short Link</h1>
          <input id='link' placeholder='https://google.com' ref={linkRef} />
          <button className='button' onClick={shorten}>Shorten</button>
        </div>

        {shortenLinks &&
          <div>
            <h2>Top shortlinks</h2>
            <button className='button' onClick={async () => refreshShortenLinks()}>Refresh</button>
            {
              shortenLinks.map((link) => (
                <div key={link._id} style={{ display: "flex", justifyContent: "center", gap: "16px" }}>
                  <label>{link.title || "N/A"}</label>
                  <a href={link.link.url}>{link.shortenLink}</a>
                </div>
              )
              )}
          </div>
        }
      </header>
    </div>
  );
}

export default App;
