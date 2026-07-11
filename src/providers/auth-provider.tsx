import {
	createContext,
	useContext,
	useMemo,
	useState,
	type ReactNode,
} from "react";

type AuthContextValue = {
	auth: boolean;
	setAuth: (value: boolean) => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

type AuthProviderProps = {
	children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
	const [auth, setAuth] = useState(true);

	const value = useMemo(() => ({ auth, setAuth }), [auth]);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}

	return context;
}
