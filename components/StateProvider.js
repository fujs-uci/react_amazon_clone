import React, { createContext, useContext, useReducer } from 'react'

// data layer

// prepares data layer
export const StateContext = createContext();

// wrap the app and provide data layer to every component
export const StateProvider = ({ reducer, initialState, children }) => (
    <StateContext.Provider value={ useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
);

// pull information from the data layer
export const useStateValue = () => useContext(StateContext);
