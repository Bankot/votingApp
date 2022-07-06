import { BrowserRouter, Routes, Route } from "react-router-dom"
import {
	Navbar,
	Dashboard,
	Form,
	CreatePool,
	Pool,
	PoolPage,
	UserPage,
} from "./Components/index"
import { UserContextProvider } from "./UserContext"

function App() {
	return (
		<BrowserRouter>
			<UserContextProvider>
				<Navbar />
				<Routes>
					<Route path='/user/:id' element={<UserPage />} />
					<Route path='/' element={<Dashboard />} />
					<Route path='/login' element={<Form />} />
					<Route path='/createPool' element={<CreatePool />} />
					<Route path='/register' element={<Form register={true} />} />
					<Route path='/pool/:id' element={<PoolPage />}></Route>
				</Routes>
			</UserContextProvider>
		</BrowserRouter>
	)
}

export default App
