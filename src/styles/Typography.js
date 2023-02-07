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
    font-size:2.8rem;
    text-align:left;
}

h3 {
  font-size:2.3rem;
}

p,
a,
button,
label,
input {
  font-size:1.8rem;
}

a {
  text-decoration:none;
  color:var(--charcoal);
}
`

export default Typography