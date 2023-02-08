import { createGlobalStyle } from "styled-components";

const Typography = createGlobalStyle`

h1,
h3 {
  font-family:var(--titleFont);
}

h2 {
  font-family:var(--subFont);
  font-weight:600;
}

h1 {
  font-size:4rem;
}

h2 {
    font-size:3.2rem;
    text-align:left;
    margin:5px 0;
}

h3 {
  font-size:2.8rem;
  margin:5px 0;
  font-weight:400;
}

p,
a,
button,
label,
input {
  font-size:1.8rem;
  font-family:'Cabin', sans-serif;
}

a {
  text-decoration:none;
  color:var(--charcoal);
  &.spotifyLink {
    font-weight:600;
    &:hover,
    &:focus {
      color:var(--green);
    }
  }
}
`

export default Typography