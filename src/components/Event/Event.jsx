const Event = (props) => {
	return (
		<div className="events__list-item">
			<div className="event-name">{props.name}</div>

			{props.type === "1" && (
				<div className="budget">
					<span>Бюджет:</span> {props.budget} $
				</div>
			)}

			{props.type === "2" && (
				<div className="address_and_time">
					<span>Адрес:</span> {props.address} <br />
					<span>Время:</span> {props.time}
				</div>
			)}

			{props.type === "3" && (
				<div className="event-note">{props.note}</div>
			)}

			<div className="actions-btns">
				<span className="actions-btn event-edit" onClick={props.onEdit}>
					<i className="mdi mdi-pencil"></i>
				</span>

				<span className="actions-btn event-delete" onClick={props.onRemove}>
					<i className="mdi mdi-delete"></i>
				</span>
			</div>
		</div>
	);
};

export default Event;
