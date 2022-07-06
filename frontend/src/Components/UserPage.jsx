import { useEffect, useContext, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import Pool from "./Pool"
import { UserContext } from "../UserContext"

const UserPage = (props) => {
	const [userPage, setUserPage] = useState()
	const [userPools, setUserPools] = useState([])
	const { id } = useParams()
	const { user } = useContext(UserContext)
	useEffect(() => {
		if (id) {
			axios({
				method: "get",
				url: `http://localhost:5000/api/user/${id}`,
			})
				.then((res) => {
					setUserPage(res.data)
				})
				.catch((err) => alert(err.response.data))
		}
	}, [])
	let usersPools = []
	const loadPools = () => {
		if (user.id) {
			console.log("authorized")
			userPage.pools.map((n) => {
				setUserPools((usersPools) => [
					...usersPools,
					<Pool key={`${n}-key`} id={n} />,
				])
			})
			console.log(userPools)
		}
	}
	return (
		userPage && (
			<div className='container text-center mt-10'>
				<p className='text-2xl'>{userPage.login}</p>
				<p>Created at: {userPage.createdAt}</p>
				<p>Created pools: {userPage.pools.length}</p>
				<button
					disabled={usersPools > 1 ? true : false}
					className='p-3 border-slate-600 border m-3'
					onClick={loadPools}>
					Fetch {userPage.login}'s pools!
				</button>
				{userPools ? <div>{userPools}</div> : null}
			</div>
		)
	)
}

export default UserPage
