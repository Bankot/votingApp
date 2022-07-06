import { Link } from "react-router-dom"
import { useEffect, useState, useContext } from "react"
import axios from "axios"
import { UserContext } from "../UserContext"

const Pool = (props) => {
	const [poolData, setPoolData] = useState()
	const [optionsKeys, setOptionsKeys] = useState()
	const [percentage, setPercentage] = useState()
	const [votedIn, setVotedin] = useState(null)
	const { user } = useContext(UserContext)
	useEffect(() => {
		// fetching pool information
		if (props.id) {
			axios({
				method: "get",
				url: `http://localhost:5000/api/pools/id/${props.id}`,
			})
				.then((res) => {
					setPoolData(res.data)
					setOptionsKeys(Object.keys(res.data.options))
					// calculating % of votes (for users who have already voted in the past)
					let keys = Object.keys(res.data.options)
					let countAnswers1 = res.data.options[keys[0]].length
					let countAnswers2 = res.data.options[keys[1]].length
					calculatePercents(countAnswers1, countAnswers2)
				})
				.catch((err) => console.log(err))
		}
	}, [votedIn])

	//check if user have voted in the past
	if (poolData && poolData.options && !votedIn) {
		if (poolData.options[optionsKeys[0]]) {
			if (poolData.options[optionsKeys[0]].includes(user.id))
				setVotedin("option1")
		}
		if (poolData.options[optionsKeys[1]]) {
			if (poolData.options[optionsKeys[1]].includes(user.id))
				setVotedin("option2")
		}
	}
	const calculatePercents = (count1, count2) => {
		let total = count1 + count2
		let calculatedPercent = Math.round((count1 * 100) / total)
		setPercentage(calculatedPercent)
	}

	const handleOptionClick = (optionNumber) => {
		if (!user.id) {
			alert("Log in to vote!")
			return
		}
		if (!votedIn) {
			axios({
				method: "post",
				url: `http://localhost:5000/api/pools/vote`,
				data: {
					poolId: poolData._id,
					choosenOption: optionsKeys[optionNumber - 1],
				},
				headers: { authorization: localStorage.getItem("authorization") },
			})
				.then((res) => {
					console.log(res)
					let countAnswers1 = poolData.options[optionsKeys[0]].length
					let countAnswers2 = poolData.options[optionsKeys[1]].length
					calculatePercents(countAnswers1, countAnswers2)
					setVotedin(`option${optionNumber}`)
				})
				.catch((err) => console.log(err.response))
		}
	}

	return (
		poolData && (
			<div className='opacity-70 p-8 m-8 border-black border-b flex flex-col'>
				<p className='text-lg break-words text-center mb-3'>
					Question: {poolData.question}
				</p>
				<p>
					Asked By{" "}
					<Link className='text-slate-700' to={`/user/${poolData.createdBy}`}>
						{poolData.creatorLogin}
					</Link>
				</p>

				<p className='text-right text-sm text-slate-500'>
					{poolData.createdAt}
				</p>
				<p className='text- text-sm text-slate-500'>Answers:</p>
				<p className='text-left'>Answer #1</p>
				<p
					className={`p-3 border-slate-400 border-l break-words cursor-pointer m-6 ${
						votedIn === "option1" ? `active` : ``
					}`}
					onClick={() => handleOptionClick(1)}>
					{optionsKeys[0]}
				</p>
				<p className='text-left'>Answer #2</p>
				<p
					className={`p-3 border-slate-400 border-l  break-words cursor-pointer m-6  ${
						votedIn === "option2" ? `active` : ``
					}`}
					onClick={() => handleOptionClick(2)}>
					{optionsKeys[1]}
				</p>
				{votedIn && (
					<>
						<p className='text-left border border-b-black mb-4'>Results:</p>
						{optionsKeys[0]} - {percentage}%
						<span
							style={{ width: `${percentage}%` }}
							className={`h-3 border-2 border-l-black  m-6 ${
								votedIn === "option1" ? `bg-slate-900` : `bg-slate-400`
							}`}></span>
						{optionsKeys[1]} - {100 - percentage}%
						<span
							style={{ width: `${100 - percentage}%` }}
							className={`h-3 m-6  ${
								votedIn === "option2" ? `bg-slate-900` : `bg-slate-400`
							}`}></span>
					</>
				)}
			</div>
		)
	)
}

export default Pool
