

// TODO: fix validate Mail Function and use it. 

module.exports.validateEmail = () => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    console.log("I would like to validate the Email");
};

module.exports.validatePassword = () => {
    console.log("I would like to validate the Password");
};