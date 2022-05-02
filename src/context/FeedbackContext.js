import { createContext, useState, useEffect } from 'react'
const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
	const [isLoading, setIsLoading] = useState(true)
	const [feedback, setFeedback] = useState([])

	const [feedbackEdit, setFeedbackEdit] = useState({
		item: {},
		edit: false,
	})

	//Fetch data
	useEffect(() => {
		fetchFeedback()
	}, [])

	//Fetch data
	const fetchFeedback = async () => {
		const res = await fetch(
			'http://localhost:5000/feedback?_sort=id&_order=desc'
		)
		const data = await res.json()

		setFeedback(data)
		setIsLoading(false)
	}

	// Add Feedback
	async function deleteFeedback(id) {
		if (window.confirm('Are you sure you want to delete?')) {
			await fetch(`http://localhost:5000/feedback/${id}`, { method: 'DELETE' })
			setFeedback(feedback.filter((item) => item.id !== id))
		}
	}

	//Delete Feedback
	async function addFeedback(newFeedback) {
		const response = await fetch('http://localhost:5000/feedback', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify(newFeedback),
		})
		const data = await response.json()
		console.log(data)
		setFeedback([data, ...feedback])
	}

	// Set item to be updated
	function editFeedback(item) {
		setFeedbackEdit({
			item,
			edit: true,
		})
	}

	//Update Feedback
	async function updateFeedback(id, updatedFeedback) {
		const response = await fetch(`http://localhost:5000/feedback/${id}`, {
			method: 'PUT',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify(updatedFeedback),
		})

		const data = await response.json()
		setFeedback(
			feedback.map((item) => {
				return item.id === id ? data : item
			})
		)
	}

	//return Feedback edit to default
	function defaultFeedbackEdit() {
		setFeedbackEdit({
			item: {},
			edit: false,
		})
	}

	return (
		<FeedbackContext.Provider
			value={{
				feedback,
				feedbackEdit,
				isLoading,
				deleteFeedback,
				addFeedback,
				editFeedback,
				updateFeedback,
				defaultFeedbackEdit,
			}}
		>
			{children}
		</FeedbackContext.Provider>
	)
}

export default FeedbackContext
