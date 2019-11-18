#  JB Hi-Fi Node.js programming challenge 

A project to deliver a description of the users local weather by Laurence Dibah

# Setting it up


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



# Running it


## Start the app

    $ node index.js

## Enter the below in your browser address bar

    localhost:5000

## Use one of the following API Keys to enter into the API Key field

    9ebd42b1-a467-495c-bb9f-5933f0431a33
    a07833c3-adc1-4841-8996-965b87815438
    261864a9-68bf-4a75-811b-fd6d134da049
    a638f906-8fb4-4365-8661-8da80cfaa29b
    18c4b2c0-9ace-48a1-9708-ae0ce8abd59a


# Testing it


## Run the test suite in the project directory

    $ npm test


# Creating it

I first wanted to create the back end of the app, just starting by working in the console and directly hitting the OpenWeather API to verify that it was working. 

I implemented a simple method to detect if the required parameters of city and country were being provided, present the user with an error if they weren't or if the request failed. Since the challenge required a method to detect if hitting the OpenWeather API was required or not I found a city list on the OpenWeather site complete with country codes that I could set up a query at a later stage to check if the information provided was correct.

The next step was to create a method to verify that the user request was providing the data in the correct format, and if so then hit the API. I used a package called "fs" to read the list of cities within the local directory and then return the list of cities within a JSON format. I then modified an existing method to verify if the name of the city and country were within the JSON list.

I passed the "verifyLocation" function as middleware to the router method that would ultimately hit the OpenWeather API. 

Then onto the API Key scheme. To start of with I found a site that would create simple API keys to use. I started off with simply checking if the user had provided a key or not. Then I created a counter method that if the counter was 0 at the time the API was hit it would begin adding to the counter total but would bar the user as soon after they had already used their 5th request. I also added in a timeout method that if the counter for the API key was 0 would start a timer for 1 hour, after the hour had passed it would take the counter of an API key back to 0.

I passed the "verifyAPI" function as middleware to the router method that would ultimately hit the OpenWeather API. I put this before the verifyLocation function as it would be quicker to first check if the user had exceeded the API key limit before combing through the whole city list.

After this the back end requirements of the app were meeting their requirements. However before starting on the front end I wanted to cater for users entering their search paramters without the correct letter capitalization. I then put in a very basic front end layout.

For the front end I ended up using Bootstrap for simplicity, fleshed out the form and added in methods for error messages to display on the front end. I made these error messages particular to what the user was missing from their submission. Then I included the axios request in the front end to display the result of the user query, or if something went wrong, the error.

Unit testing is not something I've had too much experience with, so I looked for a simple testing suite that would enable me to quickly test my endpoints and responses if there were missing parameters. So I started off with showing if the using had an invalid api key and if they had a valid one, successfully hitting the OpenWeather endpoint. 

This was a bit tricky as there is no predictable string that I could tell the test to expect, so I added in 'Report: ' to the beginning of the weather description if the endpoint was successfully hit and told the unit test to look for that phrase.

Other than adding a few more test cases I felt this brought the app close to an MVP. I removed the cors package because any user would be running this locally, therefore it wasn't required. I then added in some additional test cases for if the user was missing a certain parameter, API key and if they had incorrectly entered city and/or country. Last but not least I had to add in a '--forceExit' to the test command so the test suite stopped running once it was complete.

Overall it was a really interesting challenge to have a crack at, it certainly had a few tricky moments but overall I came away feeling like I learnt a lot. Time constraints not being present I'd certainly enjoy fleshing out a more complete front end and would like to explore testing more. Would love to hear any feedback and hope you enjoy!