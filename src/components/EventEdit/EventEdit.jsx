import React from "react";
import { useHistory } from "react-router-dom";
import { useData } from "../../DataContext";

const EventEdit = () => {
	const history = useHistory();

	const { events, setEvents, fields, setFormData, formInputs } = useData();

	const { date, name, type, budget, address, time, note } = fields;

	const onChangeEventName = (e) => {
		setFormData({
			...fields,
			name: e.target.value,
		});
	};

	const onChangeEventType = (e) => {
		setFormData({
			...fields,
			type: e.target.value,
		});
	};

	const onChangeEventAddress = (e) => {
		setFormData({
			...fields,
			address: e.target.value,
		});
	};

	const onChangeEventTime = (e) => {
		setFormData({
			...fields,
			time: e.target.value,
		});
	};

	const onChangeEventBudget = (e) => {
		setFormData({
			...fields,
			budget: e.target.value,
		});
	};

	const onChangeEventNote = (e) => {
		setFormData({
			...fields,
			note: e.target.value,
		});
	};

	const onUpdateEvent = () => {
		let newData = events.map((event) =>
			event.id === fields.id ? { ...event, ...fields } : event
		);

		setEvents(newData);

		setFormData({
			...fields,
			...formInputs,
			date: date,
		});

		history.push("/");
	};

	return (
		<div className="container">
			<div className="row justify-content-center">
				<div className="col-5">
					<h2>Редактирование события</h2>
		
					<div className="form-group">
						<label>Название события</label>
						<input
							type="text"
							name="event_name"
							className="form-control"
							value={name}
							onChange={onChangeEventName}
						/>
					</div>
		
					<div className="form-group">
						<label>Тип события</label>
						<select
							className="form-control"
							name="event_type"
							value={type}
							onChange={onChangeEventType}
						>
							<option value="1">Праздничные дни</option>
							<option value="2">Мероприятия</option>
							<option value="3">Пометки / другое</option>
						</select>
					</div>
		
					{type === "1" && (
						<div className="form-group">
							<label>Бюджет</label>
							<input
								type="text"
								name="event_budget"
								className="form-control"
								value={budget}
								onChange={onChangeEventBudget}
							/>
						</div>
					)}
		
					{type === "2" && (
						<>
							<div className="form-group">
								<label>Куда идти?</label>
								<input
									type="text"
									name="event_address"
									className="form-control"
									value={address}
									onChange={onChangeEventAddress}
								/>
							</div>
		
							<div className="form-group">
								<label>Во сколько?</label>
								<input
									type="text"
									name="event_time"
									className="form-control"
									value={time}
									onChange={onChangeEventTime}
								/>
							</div>
						</>
					)}
		
					{type === "3" && (
						<div className="form-group">
							<label>Текст</label>
							<textarea
								className="form-control"
								name="event_text"
								rows="2"
								value={note}
								onChange={onChangeEventNote}
							/>
						</div>
					)}
		
					<button className="btn btn-success" onClick={onUpdateEvent}>
						Обновить
					</button>
				</div>
			</div>
		</div>
	);
};

export default EventEdit;
