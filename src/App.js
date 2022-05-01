import Header from './components/Header'
import AboutPage from './pages/AboutPage'
import Post from './components/Post'
import { FeedbackProvider } from './context/FeedbackContext'
import AboutIconLink from './components/AboutIconLink'
import FeedbackList from './components/FeedbackList'
import FeedbackStats from './components/FeedbackStats'
import FeedbackForm from './components/FeedbackForm'
import './index.css'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'

function App() {
	return (
		<FeedbackProvider>
			<Router>
				<div className="container">
					<Routes>
						<Route
							exact
							path="/"
							element={
								<>
									<Link to={{ pathname: '/' }}>
										<Header />
									</Link>
									<div className="container">
										<FeedbackForm />
										<FeedbackStats />
										<FeedbackList />
									</div>
								</>
							}
						></Route>
						<Route path="/about" element={<AboutPage />} />
						<Route path="/post" element={<Post />} />
					</Routes>

					<AboutIconLink />
				</div>
			</Router>
		</FeedbackProvider>
	)
}

export default App
