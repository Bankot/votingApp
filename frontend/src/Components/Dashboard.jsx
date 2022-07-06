import Pool from "./Pool"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../UserContext"
import axios from "axios"
const Dashboard = () => {
	const { user } = useContext(UserContext)
	const [arrOfPools, setArrOfPools] = useState([])
	useEffect(() => {
		if (user.id) {
			axios({
				method: "get",
				url: `http://localhost:5000/api/pools`,
			}).then((res) => {
				res.data.map((n) => {
					setArrOfPools((arrOfPools) => [
						...arrOfPools,
						<Pool id={n._id} key={`${n._id}-key`} />,
					])
				})
			})
		}
	}, [user])
	return (
		<div className='container text-center'>
			{user.id ? (
				<div>{arrOfPools}</div>
			) : (
				<h1>Please Sign In to acces Pools.</h1>
			)}
		</div>
	)
}

export default Dashboard
