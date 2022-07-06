import { Pool } from "./index"
import { useParams } from "react-router-dom"

const PoolPage = (props) => {
	const { id } = useParams()

	return (
		<div className='container'>
			<Pool id={id}></Pool>
		</div>
	)
}

export default PoolPage
