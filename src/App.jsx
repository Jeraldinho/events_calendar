import "./App.css";
import "./css/materialdesignicons.min.css";
import Events from "./components/Events/Events";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import ru from "date-fns/locale/ru";
import "react-datepicker/dist/react-datepicker.css";

function App() {
	const [events, setEvents] = useState([]);

	const [filteredEvents, setFilteredEvents] = useState([]);

	const [editMode, setEditMode] = useState(false);

	let dateFormat = (date) => {
		return date.setHours(0, 0, 0, 0);
	};

	const formInputs = {
		id: 1,
		date: dateFormat(new Date()),
		name: "",
		type: "1",
		address: "",
		time: "",
		budget: "",
		note: "",
	};

	const [fields, setFormData] = useState(formInputs);

	const { date, name, type, budget, address, time, note } = fields;

	useEffect(() => {
		let newData = events.filter((event) => event.date === date);

		setFilteredEvents(newData);
	}, [events]);

	const onChangeEventDate = (date) => {
		let newDate = dateFormat(date);

		setFormData({
			...fields,
			date: newDate,
		});

		let newData = events.filter((event) => event.date === newDate);

		setFilteredEvents(newData);
	};

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

	const addEvent = () => {
		if (events.length !== 0) {
			fields.id = events[events.length - 1].id + 1;
		} else {
			fields.id = 1;
		}

		setEvents([...events, fields]);

		setFormData({
			...fields,
			...formInputs,
			date: date,
		});
	};

	const removeEvent = (eventId) => {
		let newData = events.filter((item) => {
			return item.id !== eventId;
		});
		setEvents(newData);
	};

	const onEditEvent = (event) => {
		setFormData({
			...fields,
			...event,
		});
	};

	const onUpdateEvent = () => {
		let newData = events.map((event) =>
			event.id === fields.id ? { ...event, ...fields } : event
		);

		setEvents(newData);
	};

	//console.log(events);

	return (
		<div className="App">
			<header className="header">
				<h1>Events calendar</h1>
			</header>

			<main className="content container">
				<div className="row">
					<div className="sidebar choose-date col-4">
						<div className="choose-date__title">
							Выберите дату события:
						</div>

						<DatePicker
							dateFromat="YYYY-MM-dd"
							selected={date}
							minDate={new Date()}
							onChange={(date) => onChangeEventDate(date)}
							calendarStartDay={1}
							value={date}
							locale={ru}
							inline
						/>

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

						<div className="actions">
							{!editMode ? (
								<button
									className="btn btn-primary add-event-btn"
									onClick={addEvent}
								>
									Добавить
								</button>
							) : (
								<button
									className="btn btn-success"
									onClick={onUpdateEvent}
								>
									Обновить
								</button>
							)}
						</div>
					</div>

					<div className="content col-8">
						<h3 className="mb-3">Список событий</h3>
						<Events
							filteredEvents={filteredEvents}
							removeEvent={removeEvent}
							editEvent={onEditEvent}
						/>
					</div>
				</div>
			</main>
		</div>
	);
}

export default App;
