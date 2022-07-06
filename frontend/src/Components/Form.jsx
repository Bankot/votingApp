import { useState, useRef, useId, useContext } from "react"
import { UserContext } from "../UserContext"
const axios = require("axios")

const Form = (props) => {
	const [message, setMessage] = useState(null)
	const [showPassword, setShowPassword] = useState(false)
	const login = useRef(null)
	const password = useRef(null)
	const rpassword = useRef(null)
	const id = useId()
	const { setToken } = useContext(UserContext)

	const submitHandler = (e) => {
		setMessage(null)
		e.preventDefault()
		if (login.current.value && password.current.value) {
			if (login.current.value.length < 5) {
				setMessage("Login must be longer than 5 characters.")
				return
			} else if (password.current.value.length < 5) {
				setMessage("Password must be longer than 5 characters")
				return
			}
			localStorage.setItem("authorization", "")
			setMessage(null)
			e.preventDefault()
			if (props.register) {
				if (password.current.value !== rpassword.current.value) {
					setMessage("Passwords aren't the same!")
					return
				}
			}
			const type = props.register ? "Register" : "Login"
			axios
				.post(`http://localhost:5000/api/user${type}`, {
					login: login.current.value,
					password: password.current.value,
				})
				.then((response) => {
					console.log(response)
					localStorage.setItem("authorization", "Bearer " + response.data.token)
					axios.defaults.headers.common["authorization"] =
						"Bearer " + response.data.token
					setToken(`Bearer   ${response.data.token}`)
					window.location.href = "/"
				})
				.catch((err) => setMessage(err.response.data))
		} else setMessage("Please provide all needed information.")
	}

	return (
		<form
			className='opacity-70 flex-col flex w-3/4 md:w-2/4 lg:w-1/4 xl:w-1/5 m-auto  mt-10'
			onSubmit={submitHandler}>
			<input
				ref={login}
				className='text-black p-1 border-b border-slate-800 mt-2'
				id={`${id}-login`}
				placeholder='Login'></input>
			<label htmlFor={`${id}-login`}>Login</label>

			<input
				type={showPassword ? "text" : "password"}
				ref={password}
				className='text-black p-1 border-b border-slate-800 mt-2'
				id={`${id}-password`}
				placeholder='Password'></input>
			<label htmlFor={`${id}-password`}>Password</label>
			{props.register ? (
				<>
					<input
						type={showPassword ? "text" : "password"}
						ref={rpassword}
						className='text-black p-1 border-b border-slate-800 mt-2'
						id={`${id}-rpassword`}
						placeholder='Repeat password'></input>
					<label htmlFor={`${id}-rpassword`}>Repeat Password</label>
				</>
			) : null}
			<div className='flex flex-row p-3'>
				<input
					onChange={() => setShowPassword(!showPassword)}
					type='checkbox'></input>
				<label className='ml-2'>Show password</label>
			</div>

			<button
				type='submit'
				className='p-1 border border-slate-800  w-1/3 m-auto mb-2'>
				{props.register ? "Register" : "Log in"}
			</button>
			<p className='text-center m-auto'>{message}</p>
		</form>
	)
}

export default Form
