This is a tilegram that interacts with the sigma plugin built in Vite.


A few build notes:

The project has 2 embedded files:
-tiles.topojson (the actual topojson svg)
-state_codes.csv (to get the two letter abbreviations, hopefully deprecated in the future)


Top level await is only supported in newer browsers but shouldn't be a problem. That is configured in vite.config.js

To include the static files in the build (vite build), they have to be imported. Including "?url" will just pass through the path instead of actually importing the data which doesn't work natively for CSV and TOPOJSON. d3.json()/csv() will then process the data
