# Introduction
This is a vite react-ts demo shows you how to install and use sdk-js to send request and get response.

## install
clone sdk-js and react-demo. 
```
cd react-demo
```
Open .env.development and change VITE_REACT_APP_ORGANIZATION_ID, VITE_REACT_APP_INSTANCE_ID and VITE_REACT_APP_API_KEY with your keys.
```
npm install ../sdk-js
npm install
```

## run
```
npm run dev
```

## play
Open your browser and go to http://localhost:5173/

Have fun!

# How to use sdk-js

+ make sure you have installed sdk-js and react-demo.
```
npm install ../sdk-js
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