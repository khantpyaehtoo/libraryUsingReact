import { createContext } from "react";

let AuthContext = createContext();

function AuthContextsProvider({ children }) {
    return (
        <AuthContext.Provider value={{ user: "eric" }}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthContextsProvider };
