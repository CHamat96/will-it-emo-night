import { createGlobalStyle } from "styled-components";
import '@fontsource/oswald/index.css'
import '@fontsource/bangers/index.css'
import '@fontsource/cabin/'
import '@fontsource/cabin/700.css'
import '@fontsource/sora'
import '@fontsource/sora/800.css'

const GlobalStyles = createGlobalStyle`

html{line-height:1.15;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}body{margin:0}article,aside,footer,header,nav,section{display:block}figcaption,figure,main{display:block}figure{margin:1em 40px}hr{box-sizing:content-box;height:0;overflow:visible}pre{font-family:monospace,monospace;font-size:1em}a{background-color:transparent;-webkit-text-decoration-skip:objects}abbr[title]{border-bottom:none;text-decoration:underline;text-decoration:underline dotted}b,strong{font-weight:inherit}b,strong{font-weight:bolder}code,kbd,samp{font-family:monospace,monospace;font-size:1em}dfn{font-style:italic}mark{background-color:#ff0;color:#000}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}audio,video{display:inline-block}audio:not([controls]){display:none;height:0}img{border-style:none}button,input,optgroup,select,textarea{line-height:1.15;margin:0}button,input{overflow:visible}button,select{text-transform:none}button,html [type=button],[type=reset],[type=submit]{-webkit-appearance:button}button::-moz-focus-inner,[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner{border-style:none;padding:0}button:-moz-focusring,[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring{outline:1px dotted ButtonText}fieldset{padding:.35em .75em .625em}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal}progress{display:inline-block;vertical-align:baseline}textarea{overflow:auto}[type=checkbox],[type=radio]{box-sizing:border-box;padding:0}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-cancel-button,[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}details,menu{display:block}summary{display:list-item}canvas{display:inline-block}template{display:none}[hidden]{display:none}

* { -moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box; }

.sr-only { position: absolute; width: 1px; height: 1px; margin: -1px; border: 0; padding: 0; white-space: nowrap; clip-path: inset(100%); clip: rect(0 0 0 0); overflow: hidden;}

* { -moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box; }

.sr-only { position: absolute; width: 1px; height: 1px; margin: -1px; border: 0; padding: 0; white-space: nowrap; clip-path: inset(100%); clip: rect(0 0 0 0); overflow: hidden;}

:root {
    --green:#1DB954;
    --black:#1C2321;
    --white:#FFFFFF;
    --offWhite: #E0FFFF;
    --darkRed: #69140e;
    --red:#E63946;
    --charcoal: #242f40;
    --blue: #0582CA;
    --yellow: #CCA43B;
    --brown: #2B0000;

    --titleFont: 'Bangers', sans-serif;
    --bodyFont: 'Cabin', sans-serif;
    --subFont: 'Oswald', sans-serif;

    --dashedBorder: dashed 10px black;
}

html {
    font-size:62.5%;
    font-family:var(--bodyFont);
}

.cta {
    background:var(--green);
    color:var(--white);
    font-weight:600;
    font-size:2rem;
    text-transform:uppercase;
    padding:15px 20px;
    border:none;
    border-radius:20px;
    text-shadow:2px 3px 1px black;
    font-family:var(--titleFont);
    &:hover {
        cursor: pointer;
        color:#000;
        text-shadow: 2px 3px 1px var(--white);
    }
    &.spotifyCTA {
        font-family:'Oswald', sans-serif;
        font-weight:700;
        text-shadow:none;
        margin:15px 0;
    }
}

.wrapper {
    width:1400px;
    max-width:80%;
    margin:0 auto;
    @media screen and (max-width:500px){
        max-width:90%;
    }
}

main {
    min-height:70vh;
}

img {
    display:block;
    max-width:100%;
    height:auto;
    margin:0;
    padding:0;
}

ul {
    list-style:none;
    margin:0;
    padding:0;
}

.initialSearch {
    margin:25px auto;
    min-height:50vh;
    text-align:center;
    padding:50px;
    max-width:600px;
    border:ridge 10px var(--green);
    display:flex;
    flex-direction:column;
    justify-content:center;
    @media screen and (max-width:525px){
        justify-content:space-evenly;
        padding:15px;
        min-height:20vh;
        margin-top:150px;
    } 
  }


  .mainContent {
    transition: filter ease-in-out 0.8s;
    &.blurred {
        filter:blur(8px);
        pointer-events:none;
    }
  }

`

export default GlobalStyles