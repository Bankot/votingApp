import * as React from "react"
import { useState } from "react"
import jwt_decode from "jwt-decode"

export const UserContext = React.createContext()

export const UserContextProvider = ({ children }) => {
	const [user, setUser] = useState({ id: null, login: null })
	// component revieves a token and decoding it to login and id.
	const setToken = (token) => {
		if (token) {
			const { id, login } = jwt_decode(token)
			setUser({ id: id, login: login })
		}
	}
	return (
		<UserContext.Provider value={{ user, setToken }}>
			{children}
		</UserContext.Provider>
	)
}
