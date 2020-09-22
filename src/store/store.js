import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducer";
import { saveState } from "../utils/localStorage";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancer(applyMiddleware(thunk)));

store.subscribe(() => {
  const { error, favs, cardSize } = store.getState();

  saveState({ error, favs, cardSize });
});

export default store;
