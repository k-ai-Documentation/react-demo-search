# React-demo-search

## Introduction
This is a vite react-ts demo shows you how to install and use sdk-js to send request and get response.
1. For search function, you can search questions and get answers.
2. For search with identify documents, you can chat with a chatbot. There will be 2 steps to get the answer. First step is to get the correct question, once we have the correct question, we will send the question to the server to get the answer.

## Before setup
Clone [react-demo-search](https://github.com/k-ai-Documentation/react-demo-search).

And your directory should like this:
```
|-your root directory
    |-react-demo-search
```
open terminal and run
```
cd react-demo-search
```
Add fill your keys in .env.development file.

If you are using SaaS version, you need 3 keys(organizationId, instanceId, apiKey).

If you are using Premise version, you need host and api key(optional).

See More about SaaS and Premise version in [here](https://github.com/k-ai-Documentation/sdk-js#usage-guide).
```
# if you are using saas 
VITE_REACT_APP_ORGANIZATION_ID = ''
VITE_REACT_APP_INSTANCE_ID = ''
VITE_REACT_APP_API_KEY = ''

# if you are using version premise. You must need host, but api key is optional, depends on your enterprise settings. 
VITE_REACT_APP_HOST = ''
VITE_REACT_APP_API_KEY = ''
```

You can change paramater of search in .env.development file to change the search result.
```bash
VITE_REACT_APP_MULTI_DOCUMENTS = true # if you want to search result have multiple documents sources, set it to true.
VITE_REACT_APP_NEED_FOLLOWING_QUESTIONS = true # if you want to search result have following questions, set it to true.
```
## Installation
```
npm install
```
### Compiles and hot-reloads for development
```
npm run dev
```


## play
Open your browser and go to http://localhost:5173/

Have fun!

# How to use sdk-js

+ make sure you have installed sdk-js and react-demo.
```
npm install
```
+ check in your package.json and node_modules, sdk-js should be installed.

+ check .env.development has VITE_REACT_APP_ORGANIZATION_ID, VITE_REACT_APP_INSTANCE_ID and VITE_REACT_APP_API_KEY.

+ in your tsx file, import sdk-js.
```
import { KaiStudio } from 'kaistudio-sdk-js';
```
if your are using typescript, you need to define searchResult.
```
import type { SearchResult } from 'kaistudio-sdk-js/modules/Search';
```
+ Create your sdk instance
````
const sdk = new KaiStudio({
    organizationId: import.meta.env.VITE_REACT_APP_ORGANIZATION_ID,
    instanceId: import.meta.env.VITE_REACT_APP_INSTANCE_ID,
    apiKey: import.meta.env.VITE_REACT_APP_API_KEY,
});
````

+ use it in your methods
```
const fetchData = async (input:string) => {
        try {
            if (input !== '') {
                const searchResult = await sdk.search().query(input, '');
                setResults(searchResult);
            }
        } catch (error) {
            console.error(error);
        }
    };
```