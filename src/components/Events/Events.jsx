import Event from "./../Event/Event";

const Events = (props) => {
	return (
		<div className="events">
			<div className="events__list">
				{!!props.filteredEvents.length ? 
					props.filteredEvents.map((event, index) => {
						return (
							<Event
								{...event}
								key={`event_${event.id}`}
								id={index}
								onRemove={() => {props.removeEvent(event.id)}}
								onEdit={() => {props.editEvent(event)}}
							/>
						);
					}) : "Событий не запланировано"
					
				}
			</div>
		</div>
	);
};

export default Events;
