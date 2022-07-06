import { useState, useContext, useRef } from "react"
import { UserContext } from "../UserContext"
import axios from "axios"

const CreatePool = () => {
	const answer1 = useRef()
	const answer2 = useRef()
	const { user } = useContext(UserContext)
	const [question, setQuestion] = useState()
	const [message, setMessage] = useState()

	const handleSubmit = (e) => {
		e.preventDefault()
		if (question && answer1.current.value && answer2.current.value) {
			if (
				answer1.current.value.length > 100 ||
				answer2.current.value.length > 100 ||
				answer1.current.value === answer2.current.value
			) {
				setMessage(
					"Answers can have maximum 100 characters and cant be the same."
				)
				return
			}
			if (question.length > 150 || question.length < 19) {
				setMessage("Question length must be between 20 and  150 characters!")
				return
			}
			axios({
				method: "post",
				url: `http://localhost:5000/api/poolCreate`,
				data: {
					question: question,
					options: [answer1.current.value, answer2.current.value],
				},
				headers: {
					authorization: window.localStorage.getItem("authorization"),
				},
			})
				.then((res) => (window.location = `/pool/${res.data.insertedId}`))
				.catch((err) => setMessage(err.response.data))
		} else setMessage("Please fill all required fields!")
	}

	return (
		<div className=' w-3/4 md:w-2/4 lg:w-2/4 xl:w-2/5 m-auto text-slate-800 mt-10  p-5'>
			<form onSubmit={handleSubmit} className='m-auto flex flex-col'>
				<label className='text-center text-xl'>Question:</label>
				<span
					role='textbox'
					className='block p-6 min-h-14  text-center  outline-none border-b border-slate-600  w-3/4 m-auto mt-4'
					onInput={(e) => setQuestion(e.target.innerHTML)}
					contentEditable></span>
				<p className='text-center text-sm p-2'>{`${
					question ? `${question.length}` : "0"
				}/150`}</p>

				<div className='w-1/2 flex flex-col m-auto'>
					<input
						className='p-2 text-center   border-b border-slate-800 '
						ref={answer1}
						placeholder='Answer #1'></input>
					<label>Answer #1 </label>

					<input
						className='p-2 text-center  border-b border-slate-800'
						ref={answer2}
						placeholder='Answer #2'></input>
					<label>Answer #2 </label>
				</div>
				<button
					type='submit'
					className='p-1  border border-slate-800  w-2/4 md:w-1/4 m-auto mt-5 rounded-sm text-slate-900'>{`Add Question`}</button>
			</form>
			<p className='p-2  text-center text-rose-600'>{message}</p>
		</div>
	)
}

export default CreatePool
