import './Events.css'
import { useData } from "../../DataContext";
import Event from "./../Event/Event";
import { useHistory } from "react-router-dom";

const Events = () => {
	const history = useHistory();

	const {events, setEvents, fields, setFormData, filteredEvents} = useData();

	// Обработчик кнопки удаления события
	const removeEvent = (eventId) => {
		let newData = events.filter((item) => {
			return item.id !== eventId;
		});
		setEvents(newData);
	};

	// Обработчик кнопки редактирования события
	const onEditEvent = (event) => {
		setFormData({
			...fields,
			...event,
		});

		history.push("/edit");
	};

	return (
		<div className="events">
			<div className="events__list">
				{!!filteredEvents.length ? 
					filteredEvents.map((event, index) => {
						return (
							<Event
								{...event}
								key={`event_${event.id}`}
								id={index}
								onRemove={() => {removeEvent(event.id)}}
								onEdit={() => {onEditEvent(event)}}
							/>
						);
					}) : "Событий не запланировано"
					
				}
			</div>
		</div>
	);
};

export default Events;
