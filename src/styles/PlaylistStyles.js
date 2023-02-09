import styled from "styled-components";


const PlaylistStyles = styled.div`
    .container {
      opacity:1;
      visibility:visible;
      &.hidden {
        opacity:0;
        visibility:hidden;
      }
    }
    .sectionToggle {
      display:block;
      max-width:125px;
      height:auto;
      text-align:center;
      position:fixed;
      top:30px;
      right:35px;
      transition: all ease-in-out 0.3s;
      z-index:3;
      button {
        background:white;
        border:dashed 1.5px var(--black);
        border-radius:5px;
        padding:5px;
        cursor:pointer;
      }
      p {
        margin: 0;
        font-weight:400;
        transition: all ease-in-out 0.3s;
      }
      svg {
        margin:0 auto;
        display:block;
        transition: all ease-in-out 0.3s;
      }
      .playlistCount {
        background:var(--red);
        position:absolute;
        top:-5px;
        left:-5px;
        min-width:25px;
        border-radius:50%;
        padding:3px;
        z-index:10;
        box-shadow:1px 2px 8px var(--darkRed);
      }
      &.menuOpen {
        max-width:75px;
        height:auto;
        p {
          font-weight:700;
        }

        svg {
          transform:rotate(20deg);
        }
      }
    }
    .playlist {
      padding:5px 0;
      .playlistHeading {
        background:#ffffff90;
        margin:0 10px;
      }
      .playlistName {
        border:none;
        label,
        input {
          font-size:clamp(1.6rem, 2.3vw, 2.4rem);
        }
        label{
          font-family:var(--bodyFont);
          text-transform:uppercase;
          padding:5px;
          display:block;
        }
        input[type="text"] {
          margin:0;
          width:100%;
          padding:15px;
          font-family:var(--subFont);
          text-transform:uppercase;
          font-weight:600;
        }
    }
      z-index: 2;
      position:fixed;
      background:var(--white);
      height:100vh;
      max-width:500px;
      overflow:scroll;
      padding-top:100px;
      padding-bottom:50px;
      top:0;
      left:0;
      transform:translateX(-100%);
      transition:all ease-in-out 0.8s;
      &.open {
        transform:translateX(0);
        background:#00000080;
      }
      /* @media screen and (max-width:400px){
        width:100%;
      } */
    }
    .exportCTA {
      margin-right:0;
    }

    .playlistButtonFlex {
      display:flex;
      flex-wrap:wrap;
      justify-content: center;
      gap:0.5rem;
      button {
        padding:15px;
      }
    }
    .songDetails {
      display:flex;
      justify-content:flex-start;
      align-items:center;
      position:relative;
      background:#ffffff99;
      border-bottom: dashed 1px var(--charcoal);
      img {
       display:block;
       max-height:80px;
      }
      p {
        font-size:clamp(1.4rem, 2.3vw, 2rem);
        font-weight:600;
        padding:0 15px;
        &:first-child {
          align-self:center;
          justify-self:center;
          width:20px;
          padding-right:25px;
        }
        .artist {
          font-size:clamp(1.3rem, 2.3vw, 1.8rem);
        }
      }
      button.deleteSong {
        background:none;
        border:none;
        right:5px;
        top:5px;
        position:absolute;
      }
    }
`

export default PlaylistStyles