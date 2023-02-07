import React from "react";
import styled from "styled-components";

const HeaderStyles = styled.header`
    padding:15px;
    h1 {
        margin:0;
    }
    .subtitle {
        font-size:2.5rem;
        font-style:italic;
        margin:0;
        padding:0;
        font-family:var(--subFont);
    }
`

export default function Header(){
    return (
        <HeaderStyles>
            <div className="wrapper">
                <h1>Will it Emo Night?</h1>
                <p className="subtitle">The ultimate Emo-gatekeeping tool!</p>
                {/* <p>Search for a song to see if it's sad enough, or is energetic enough to mosh to at your local "Emo Night"</p> */}
            </div>
        </HeaderStyles>
    )
}