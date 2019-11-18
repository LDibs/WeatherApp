#  JB Hi-Fi Node.js programming challenge 


A project to deliver a description of the users local weather by Laurence Dibah

## Setting up the app
---
## Clone to your local drive

    $ git clone

## Enter project directory

    $ cd weatherapp

## Create a '.env' file

    $ touch .env

## Create new/using existing OpenWeather account at 'https://openweathermap.org/' and paste your API key into the .env file as below

    API_KEY=xxxxxxxxxxxxxxxxxxxxxx

## Install the required npm packages

    $ npm install

## Start the app

    $ node index.js

## Enter the below in your browser address bar

    localhost:5000

---

## Creating the App

I first wanted to create the back end of the app, just starting by working in the console and directly hitting the OpenWeather API to verify that it was working. 

I implemented a simple method to detect if the required parameters of city and country were being provided, present the user with an error if they weren't or if the request failed. Since the challenge required a method to detect if hitting the OpenWeather API was required or not I found a city list on the OpenWeather site complete with country codes that I could set up a query at a later stage to check if the information provided was correct.

The next step was to create a method to verify that the user request was providing the data in the correct format, and if so then hit the API. I used a package called "fs" to read the list of cities within the local directory and then return the list of cities within a JSON format. I then modified an existing method to verify if the name of the city and country were within the JSON list.

I passed the "verifyLocation" function as middleware to the router method that would ultimately hit the OpenWeather API. 

Then onto the API Key scheme. To start of with I found a site that would create simple API keys to use. I started off with simply checking if the user had provided a key or not. Then I created a counter method that if the counter was 0 at the time the API was hit it would begin adding to the counter total but would bar the user as soon after they had already used their 5th request. I also added in a timeout method that if the counter for the API key was 0 would start a timer for 1 hour, after the hour had passed it would take the counter of an API key back to 0.

I passed the "verifyAPI" function as middleware to the router method that would ultimately hit the OpenWeather API. I put this before the verifyLocation function as it would be quicker to first check if the user had exceeded the API key limit before combing through the whole city list.

After this the back end requirements of the app were meeting their requirements. However before starting on the front end I wanted to cater for users entering their search paramters without the correct letter capitalization. I then put in a very basic front end layout.

For the front end I ended up using Bootstrap for simplicity, fleshed out the form and added in methods for error messages to display on the front end. I made these error messages particular to what the user was missing from their submission. Then I included the axios request in the front end to display the result of the user query, or if something went wrong, the error.
