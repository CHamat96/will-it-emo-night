import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

:root {
    --green:#1DB954;
    --white: #ffffff;
    --bodyFont: 'Helvetica', sans-serif;
}

.spotifyButton {
    background:var(--green);
    color:var(--white);
    font-family:var(--bodyFont);
    font-weight:600;
    text-transform:uppercase;
    padding:15px 10px;
    border:none;
    border-radius:20px;
    &:hover {
        cursor: pointer;
        color:#000;
    }
}

.wrapper {
    max-width:1450px;
    width:90%;
    margin:0 auto;
}

img {
    display:block;
    max-width:100%;
    height:auto;
}

ul {
    list-style:none;
    margin:0;
    padding:0;
}

`

export default GlobalStyles