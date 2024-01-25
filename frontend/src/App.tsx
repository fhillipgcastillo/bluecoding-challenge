import React, { useLayoutEffect, useRef, useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import { createShortLink, getShortLinks } from './services/apiFetcher';

interface LinkResponse {
  _id: string;
  shortLink: string;
}

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [shortenUrl, setShortenUrl] = useState<LinkResponse | null>(null)
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
      createShortLink(url).then((data) => {
        setShortenUrl(data);
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

        {shortenLinks &&
          <div>
            <h2>Top shortlinks</h2>
            {
              shortenLinks.map((link) => (
                <div key={link._id}>
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
