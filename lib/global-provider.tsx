import { createContext, useContext } from "react";
import { useAppwrite } from "./useAppWrite";
import { getCurrentUser } from "./appwrite";

interface User {
    $id: number;
    name: string;
    email: string;
    avatar: string;
}

interface GlobalContextType {
    isLoggedIn: boolean;
    user: User | null;
    loading: boolean;
    refetch: () => void;
}


const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {

    const {
        data: user,
        loading,
        refetch,
    } = useAppwrite({
        fn: getCurrentUser,
    });

    const isLoggedIn = !!user;

    return (
        <GlobalContext.Provider value={{ isLoggedIn, user, loading, refetch }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = (): GlobalContextType => {

    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error("useGlobalContext must be used within a GlobalProvider");
    }

    return context;

}

export default GlobalProvider;