Routes
- `/` method `get` will give us the top 100 urls
- `/shorts` method `get` will give us the top 100 shortened urls
- `/s/:id` method `get` will give us the full link
- `/shortener` method `post` will create a new short link
    - request data 
        ```typescript
        {
            "link": string
        }
        ```
    - respose data
        ```typescript
        {
            "title": string,
            "link": OriginalLinkInfo,
            "shortenLink": string, //Shorten link
        }
        ```
