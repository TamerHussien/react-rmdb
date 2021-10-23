import React from "react";

// styles

import { Wrapper, Image } from "./Actor.styles";

const Actor= ({actorName, character, imageUrl}) => (
    <Wrapper>
        <Image src={imageUrl} alt="actor-thumb"/>
        <h3>{actorName}</h3>
        <p>{character}</p>
    </Wrapper>
)

export default Actor;