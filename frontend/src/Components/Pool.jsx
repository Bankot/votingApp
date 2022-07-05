import { Link } from "react-router-dom"

const Pool = () => {
	return (
		<div className='opacity-70 p-8 m-8 border-black border-b flex flex-col'>
			<p className='text-lg text-center mb-3'>
				What is your favorite snack made from potato?
			</p>
			<p>
				Asked By{" "}
				<Link className='text-slate-700' to='/user/whoasked'>
					Username
				</Link>
			</p>

			<p className='text-right text-slate-500'>12.02.2020</p>
			<p>Voting logic</p>
			<button className='p-2 w-1/4 mt-5 mb-5 m-auto border border-black'>
				Vote!
			</button>
		</div>
	)
}

export default Pool
