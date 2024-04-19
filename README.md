# News
Build a news app that fetches the top 100 news headlines, stores them for offline access, displays them in a dynamic list view, and allows user interaction.

We have both IOS and Android App UI's. Please check out the apk below to download it in your phone and run your app.



https://github.com/isha241/News/assets/42209224/6fd788de-50ee-4516-8c0c-053b74f1c61d




# Installation
To install dependencies and start the server:

For starting the frontend server:

cd project-repo/
yarn
yarn start


# Tech Stack

The application backend is from a public api

React Native - Frontend
The frontend is based on React


# Hosting URLs
Frontend: https://expo.dev/artifacts/eas/fEx2MA9EEaLXd6XpcD9mSG.aab

# API Endpoints
The APIs have a base url =='/api==' pre-pended to all endpoints. The various endpoints are:

Endpoint	HTTP Method	API Info	Params/Body

 Using axiosInstance:

  axiosInstance.get(
      "/v2/everything?q=health&apiKey=477a66c5e50849d7af0b7e31a2bdbb06&pageSize=50"
    );


  baseURL: "https://newsapi.org",   




