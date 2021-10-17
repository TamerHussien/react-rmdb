import React from "react";
import { Wrapper } from "./ShowMoreButton.styles";



const ShowMoreButton = ({text, callback}) => (
    <Wrapper type="button" onClick={callback}>
        {text}
    </Wrapper>
)

export default ShowMoreButton;