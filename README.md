
# Will It Emo Night?
Use the Spotify API to search for a song &amp; display it's "Energy" and "Sadness" ratings to determine whether or not it would be suitable to play at an "Emo Night"


## Run Locally

Clone the project to your local machine

```bash
  git clone https://github.com/CHamat96/will-it-emo-night.git
```

Go to the project directory

```bash
  cd will-it-emo-night
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```


## Environment Variables

The project requires a client ID token from the [Spotify API](https://developer.spotify.com/) in order to Work. To run the project locally, you will need to sign up for one and set it as an environment variable. Once you have signed up for a key, create a `.env` file at the root folder of the project, then paste the key as a `REACT_APP_CLIENT_ID` variable. 

Additionally, the API requires a "redirect URI" to redirect the user to after successfull (or unsuccessful) authentication. To run the local build of the project, create another environment variable called `REACT_APP_REDIRECT_URI` with the value `http://localhost:3000`
## Roadmap

- Add functionality for the user to create a new "Emo Night" playlist based on the song they have searched for.

