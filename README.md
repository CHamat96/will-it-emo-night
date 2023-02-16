
# Will It Emo Night?
Use the Spotify API to search for a song &amp; display it's "Sadness" and  ratings to determine whether or not it would be suitable to play at an "Emo Night"

## New Features
* Users can Randomly generate a song & view its Sadness/Moshability ratings
* Users can add the current song to an "Emo Night Playlist," which can then be exported to their Spotify Account

### Roadmap
#### Recent Updates
- Fixed a few issues with the "Random Song" button that would either prevent a new song from loading, or on a few occurrences display the same song as the previous entry.
- Cut down the number of accepted genres in the `TrackAnalysis` component, but also added an array of "Emo-Adjacent" artists that would be considered "Emo enough for Emo Night".
- Made the "Add to Playlist" CTA conditionally render for Emo or Emo-adjacent songs.
- Added a Text Input for users to change the name of their playlist.

#### Current Work
* General bugfixes & testing

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

The project requires a client ID token from the [Spotify API](https://developer.spotify.com/) in order to work. To run the project locally, you will need to sign up for one and set it as an environment variable. Once you have signed up for a key, create a `.env` file at the root folder of the project, then paste the key as a `REACT_APP_CLIENT_ID` variable. 

Additionally, the API requires a "redirect URI" to redirect the user to after successfull (or unsuccessful) authentication. To run the local build of the project, create another environment variable called `REACT_APP_REDIRECT_URI` with the value `http://localhost:3000`



