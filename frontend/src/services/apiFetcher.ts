/* eslint-disable @typescript-eslint/no-explicit-any */
const options: any = {
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
    body: null, // body data type must match "Content-Type" header
}

export async function createShortLink(url: string) {
    return await fetch("http://localhost:8080/shortener",
        {
            ...options,
            body: JSON.stringify({ url }), // body data type must match "Content-Type" header
        }
    )
        .then(r => r.json())
}


export async function getShortLinks() {
    return await fetch("http://localhost:8080/shorts",
        {
            ...options,
            method: "GET",
        }
    )
        .then(r => r.json())
}
