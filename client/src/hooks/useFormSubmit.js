import {useState} from 'react';

export default function useFormSubmit (url, userInput){
    const [error, setError] = useState(false); 

    // const handleChange = (e) => setUserInput({
    //     ...userInput
    //    [e.target.name]: e.target.value

    // });

    // const handleImgChange = (e) => setUserImgInput({
    //     ...userInput
    //    [e.target.name]: e.target.file[0]

    // });


    handleSubmit(e) {
        e.preventDefault();

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userInput),
        })
            .then((data) => {
                return data.json();
            })
            .then((data) => {

                if (data.success) {
                    location.replace("/");
                } else {
                    this.setState({
                        error: true,
                    });
                }
            })
            .catch((err) => {
                console.log("error in fetch register.json", err);
                this.setState({
                    error: true,
                });
            });
    }


    return [handleSubmit, error];

}
