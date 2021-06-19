import './Event.css'

const Event = (props) => {
	return (
		<div className="events__list-item">
			<div className="event__name">{props.name ? props.name : "Название события"}</div>

			{props.type === "1" && (
				<div className="event__budget">
					<span>Бюджет:</span> {props.budget} $
				</div>
			)}

			{props.type === "2" && (
				<div className="event__address-and-time">
					<span>Адрес:</span> {props.address} <br />
					<span>Время:</span> {props.time}
				</div>
			)}

			{props.type === "3" && (
				<div className="event__note">{props.note}</div>
			)}

			<div className="event__actions-btns">
				<span className="event__action-btn event__edit-btn" onClick={props.onEdit}>
					<i className="mdi mdi-pencil"></i>
				</span>

				<span className="event__action-btn event__delete-btn" onClick={props.onRemove}>
					<i className="mdi mdi-delete"></i>
				</span>
			</div>
		</div>
	);
};

export default Event;
