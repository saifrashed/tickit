import React, {createContext, useEffect, useState} from 'react';

const AuthContext = createContext();

const AuthProvider = (props) => {
    // user null = loading
    const [isLogged, setIsLogged] = useState(false);
    const [user, setUser] = useState({});


    let login = (user) => {
        setIsLogged(true);
        setUser(user)
    };

    let logout = () => {
        setIsLogged(false);
        setUser({})
    };

    return (
        <AuthContext.Provider
            value={{
                isLogged: isLogged,
                user: user,
                login: login,
                logout: logout
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export {AuthContext, AuthProvider};
