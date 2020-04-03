
## WhatTheySaid, a React/Redux/Rails application

*Deployed to Heroku: http://what-they-said.herokuapp.com/*

This application provides a portal to discover and record what politicians are saying in the House of Commons, Scottish Parliament, Northern Ireland Assembly, and Westminster Hall. 

Users can search speeches and oral questions for keywords, browse search results, save individual search results, and create and browse lists. The application uses Compromise for natural language processessing with Javascript, and Bulma, a CSS framework based on flexbox. The database is Postgres.  

## How it works

This application consumes the TheyWorkForYou API, specifically the getDebates endpoint. Contact information is sourced from the EveryPolitician database. The backend is a Rails API, while the frontend uses React and Redux.

## Features

* Users can search House of Commons, House of Lord, Northern Ireland Assembly and Westminster Hall debates for keywords
* Users can create a list and save search results to their profile
* Search results are auto tagged with keywords for ease of browsing

