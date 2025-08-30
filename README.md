Project demo — Google CSE setup

This project can optionally use Google Custom Search (CSE) to fetch web results for a chosen subject. The topic page will attempt to load local credentials from `cse-config.json` or use globals set on `window`.

Steps to create an API key and a Custom Search Engine (CX)

1) Create or use a Google Cloud project
   - Visit https://console.cloud.google.com/ and sign in.
   - Create a new project or select an existing one.

2) Enable the Custom Search API
   - In the Cloud Console, open "APIs & Services" → "Library".
   - Search for "Custom Search API" and click Enable.

3) Create an API key
   - In "APIs & Services" → "Credentials", click "Create credentials" → "API key".
   - Copy the created API key (keep it private).
   - Optional: restrict the key by HTTP referrers or by API for better security.

4) Create a Custom Search Engine (CX)
   - Go to https://cse.google.com/cse/ and click "Add" to create a new search engine.
   - For "Sites to search" you can enter any site (e.g., "en.wikipedia.org") during setup — you'll refine it later.
   - After creation, open the Control Panel for the CSE and under "Search engine ID" you'll find the CX value. Copy it.
   - In the CSE control panel you can adjust settings (enable searching the entire web by toggling "Search the entire web" under "Setup" → "Basics", and remove required sites if present).

5) Provide credentials to this project
   - Option A (recommended for local development): create a file named `cse-config.json` next to `topic.html` with contents:
     {
       "key": "YOUR_GOOGLE_API_KEY",
       "cx": "YOUR_CUSTOM_SEARCH_CX"
     }

   - Option B (inline script): add before the `topic.html` script block a small inline script in the HTML:
     <script>
       window.GOOGLE_CSE_KEY = 'YOUR_GOOGLE_API_KEY';
       window.GOOGLE_CSE_CX = 'YOUR_CUSTOM_SEARCH_CX';
     </script>

6) Test
   - Open `demo.html` in your browser, pick or type a subject and press Enter. The app will navigate to `topic.html?subject=YourSubject` and attempt to use Google CSE to fetch results.
   - If results do not appear, check the browser console for CORS errors or API quota/permission errors.

Notes and troubleshooting
 - Google CSE has daily quotas; monitor usage in the Cloud Console.
 - If you see CORS errors when calling the Google API from the browser, confirm your API key and CSE settings, or consider proxying requests through a server.
 - For production, avoid embedding unrestricted API keys in client-side code. Use a small server-side proxy to keep keys secret.

If you want, I can add a small Node.js proxy in this repo to hide the API key and avoid CORS issues.
