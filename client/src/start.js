import ReactDOM from "react-dom";
import Welcome from "./welcome";
import App from "./app";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import * as immutableState from "redux-immutable-state-invariant";
import reducer from "./redux/reducer.js";
import thunk from "redux-thunk";

import { init } from "./socket";

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(immutableState.default(), thunk)),
    // applyMiddleware(thunk)
);


fetch("/user/id.json")
    .then((response) => response.json())
    .then((data) => {
        if (!data.userId) {
            ReactDOM.render(<Welcome />, document.querySelector("main"));
        } else {
            // hier können wir init socket schreiben. d.h. hier wird eine socket connection established wenn der user eingelogged ist. Connection Client to Server. Init erwartet ein Store Argument.
            init(store);
            
            ReactDOM.render(
                // damit redux funktioniert müssen wir die App in einen Provider Wrappen
                <Provider store={store}>
                    <App userId={data.userId} />
                </Provider>,
                document.querySelector("main")
            );
        }
    });
