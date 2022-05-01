import { v4 as uuidv4 } from 'uuid'
import { useState } from 'react'
import Card from './shared/Card'
import Button from './shared/Button'
import RatingSelect from './RatingSelect'
import { useContext, useEffect } from 'react'
import FeedbackContext from '../context/FeedbackContext'
function FeedbackForm() {
	const [text, setText] = useState('')
	const [rating, setRating] = useState(10)
	const [btnDisabled, setBtnDisabled] = useState(true)
	const [message, setMessage] = useState('')
	const { addFeedback, feedbackEdit, updateFeedback, defaultFeedbackEdit } =
		useContext(FeedbackContext)

	useEffect(() => {
		if (feedbackEdit.edit === true) {
			setText(feedbackEdit.item.text)
			setRating(feedbackEdit.item.rating)
			setBtnDisabled(false)
		}
	}, [feedbackEdit])

	const handleTextChange = (e) => {
		setText(e.target.value)
		if (text === '') {
			setBtnDisabled(true)
			setMessage(null)
		} else if (text !== '' && text.trim().length <= 10) {
			setBtnDisabled(true)
			setMessage('Text must be at least 10 characters long.')
		} else {
			setBtnDisabled(false)
			setMessage(null)
		}
	}

	const handleSelect = (selectedRating) => {
		setRating(selectedRating)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		const id = uuidv4()
		if (text.trim().length > 10) {
			const newFeedback = {
				id,
				rating,
				text,
			}
			if (feedbackEdit.edit === true) {
				updateFeedback(feedbackEdit.item.id, newFeedback)
			} else {
				addFeedback(newFeedback)
			}
		}
		setText('')
		defaultFeedbackEdit()
	}

	return (
		<Card>
			<form onSubmit={handleSubmit}>
				<h2>How would you rate your service with us?</h2>
				<RatingSelect onSelect={handleSelect} />
				<div className="input-group">
					<input
						onChange={handleTextChange}
						type="text"
						placeholder="Write a review"
						value={text}
					/>
					<Button type="submit" isDisabled={btnDisabled}>
						Send
					</Button>
				</div>
				{message && <div className="message">{message}</div>}
			</form>
		</Card>
	)
}

export default FeedbackForm
