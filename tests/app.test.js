
import App from "../client/src/app";
import { render, waitFor, fireEvent } from "@testing-library/react";

// first test (i dont want to talk to a server)

test("app reders a div", ()=> {

    fetch.mockResolvedValue({
        async json(){
            return {
                first: "Luise",
                last: "Brandenburger",
                url: "www.luise.com",
                id: 1,
            };
        }
    });

    const {container} = render(<App />);
    console.log("container.innerHtml: ", container.innerHTML);

    expect(container.innerHTML).toContain("...Loading");

    await waitFor(()=> {


        // expect(container.querySelector(".app-container")).toBeTruthy();
    })

});