import { useState, useEffect, useContext } from "react"
import jwt_decode from "jwt-decode"
import { Link } from "react-router-dom"
import { UserContext } from "../UserContext"

const Navbar = (props) => {
	const { user, setToken } = useContext(UserContext)
	// I decided to put this logic here, because thats the only component which is mounted all the time
	// Couldnt put it in App.js, because Context is accesible only in component below the one where you initiated it
	useEffect(() => {
		const token = window.localStorage.getItem("authorization")
		if (token) {
			setToken(token)
		}
	}, [])
	const handleLogOut = () => {
		window.localStorage.setItem("authorization", "")
		window.location.href = "/"
	}
	return (
		<ul className='w-full border-b border-black pb-4'>
			<Link className='nav-link' to='/'>
				Home
			</Link>
			{window.localStorage.getItem("authorization") ? (
				<>
					<Link className='nav-link' to={`/user/${user.id}`}>
						{user.login}
					</Link>
					<Link className='nav-link' to={`/createPool`}>
						Create Pool
					</Link>
					<a className='nav-link' onClick={handleLogOut}>
						Log Out
					</a>
				</>
			) : (
				<>
					<Link className='nav-link' to='/login'>
						SignIn
					</Link>
					<Link className='nav-link' to='/register'>
						SignUp
					</Link>
				</>
			)}
		</ul>
	)
}

export default Navbar
