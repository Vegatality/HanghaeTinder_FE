import React, { useState } from "react";

// import makeAnimated from 'react-select/animated';
import makeAnimated from "react-select/animated";
// import { colourOptions } from '../data';
import Select from "react-select";
import { styled } from "styled-components";

const animatedComponents = makeAnimated();
const interestOptions = [
    { value: "workout", label: "Workout", color: "#00B8D9", isFixed: true },
    // { value: "game", label: "Game", color: "#0052CC", isDisabled: true },
    { value: "game", label: "Game", color: "#0052CC" },
    { value: "coding", label: "Coding", color: "#5243AA" },
    { value: "traveling", label: "Traveling", color: "#FF5630", isFixed: true },
    { value: "music", label: "Music", color: "#FF8B00" },
    { value: "movie", label: "Movie", color: "#FFC400" },
    { value: "cooking", label: "Cooking", color: "#36B37E" },
    { value: "pet", label: "Pet", color: "#00875A" },
    { value: "book", label: "Book", color: "#253858" },
    { value: "art", label: "Art", color: "#666666" },
];

export default function Selector() {
    const [isSelected, setIsSelected] = useState(false);
    return (
        <StyledSelect
            closeMenuOnSelect={false}
            components={animatedComponents}
            // defaultValue={[interestOptions[4], interestOptions[5]]}
            isMulti
            options={interestOptions}
            className="basic-multi-select"
            classNamePrefix="select"
            styles={customStyles}
        />
    );
}

const customStyles = {
    control: (provided) => ({
        ...provided,
        // borderColor: "red",
        border: "3px solid red",
        borderRadius: "10px",
    }),
    menu: (provided, theme) => ({
        ...provided,
        border: `3px solid ${theme["borderColor"]}`,
        borderRadius: "10px",
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? "white" : "white",
        color: state.isSelected ? "white" : "black",
        "&:hover": {
            backgroundColor: state.isSelected ? "blue" : "#F7F7F7",
        },
    }),
    multiValue: (provided) => ({
        ...provided,
        backgroundColor: "lightgray",
    }),
    singleValue: (provided) => ({
        ...provided,
        color: "red",
    }),
};

const StyledSelect = styled(Select)`
    /* border: 3px solid ${({ theme }) => theme["borderColor"]};
    border-radius: 10px; */

    /* .react-select__control {
        background: linear-gradient(to right, #fe3a72, #ff625f);
        border: 3px solid ${({ theme }) => theme["borderColor"]};
        box-shadow: none;
    } */
`;
