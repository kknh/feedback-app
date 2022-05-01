import { createContext, useState } from 'react'
const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
	const [feedback, setFeedback] = useState([
		{
			id: 1,
			text: 'This is text from context 1',
			rating: 5,
		},
		{
			id: 2,
			text: 'This is text from context 2',
			rating: 7,
		},
		{
			id: 3,
			text: 'This is text from context 3',
			rating: 9,
		},
	])
	const [feedbackEdit, setFeedbackEdit] = useState({
		item: {},
		edit: false,
	})

	// Add Feedback
	function deleteFeedback(id) {
		if (window.confirm('Are you sure you want to delete?')) {
			setFeedback(feedback.filter((item) => item.id !== id))
		}
	}

	//Delete Feedback
	function addFeedback(newFeedback) {
		setFeedback([newFeedback, ...feedback])
	}

	// Set item to be updated
	function editFeedback(item) {
		setFeedbackEdit({
			item,
			edit: true,
		})
	}

	//Update Feedback
	function updateFeedback(id, updatedFeedback) {
		setFeedback(
			feedback.map((item) => {
				return item.id === id ? { ...item, ...updatedFeedback } : item
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
