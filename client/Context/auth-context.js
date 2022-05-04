import React, {useCallback, useEffect, useState} from "react";
import Cookies from "cookie-cutter";

const AuthContext = React.createContext({
    token: '',
    user: {},
    isLoggedIn: false,
    fetchUser: (user) => {
    },
    login: (token) => {
    },
    logout: () => {
    },
});

const retrieveStoredToken = () => {
    const storeToken = Cookies.get('accessToken');
    const storeUser = Cookies.get('user');
    if (storeToken && storeUser) {
        return {
            token: storeToken,
            user: JSON.parse(storeUser),
        }
    }
}

export const AuthContextProvider = (props) => {
    const [token, setToken] = useState("");
    const [user, setUser] = useState({});

    useEffect(() => {
        const storedToken = retrieveStoredToken();
        if (storedToken) {
            setToken(storedToken.token);
            setUser(storedToken.user);
        }
    }, []);

    const userIsLoggedIn = !!token;

    const fetchUser = async (user) => {
        Cookies.set('user', JSON.stringify(user));
        await setUser(user);
    }

    const loginHandler = (token, user) => {
        setToken(token)
        setUser(user)
        Cookies.set('accessToken', token);
        Cookies.set('user', JSON.stringify(user));
    }

    const logoutHandler = useCallback(() => {
        setToken(null);
        setUser(null);
        Cookies.set('accessToken', "");
        Cookies.set('user', "");
    }, []);

    const contextValue = {
        token: token,
        user: user,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        fetchUser: fetchUser,
        logout: logoutHandler
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext