import { useState } from "react";

export default function useForm(youCanAlsoUseAnAnitionStatehere) {
    const [userInput, setUserInput] = useState({});
    // const [userInput, setUserInput] = useState({});


    const handleChange = (e) =>
        setUserInput({
            ...userInput,
            [e.target.name]: e.target.value,
        });

    const handleImgChange = (e) =>
        setUserImgInput({
            ...userInput,
            [e.target.name]: e.target.file[0],
        });

    return [userInput, handleChange, handleImgChange];
}

// costum hooks return state values (not jsx);

/**
 * 
 * in dem Component:
 * 
 import useForm from "./hooks/useForm"
 const [userInput, handleChange, handleImgChange] = useForm({
 fist: 'Luise,
 last: 'Branndenburger'
 })


 */
