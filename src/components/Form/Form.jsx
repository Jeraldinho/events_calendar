import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useData } from "../../DataContext";

const Form = (props) => {
	const history = useHistory();

	const { events, setEvents, fields, setFormData, formInputs } = useData();

	const { date, name, type, budget, address, time, note } = fields;

	/* 
		Объявление переменной исходного состояния ошибки
		Объявление двух состояний. Dirty - состояние инпута после клика и потери фокуса
	*/
	const nameErrorInit = !!name ? '' : "Введите название события";
	const [nameDirty, setNameDirty] = useState(false);
	const [nameError, setNameError] = useState(nameErrorInit);
	
	const budgetErrorInit = !!budget ? '' : "Введите бюджет";
	const [budgetDirty, setBudgetDirty] = useState(false);
	const [budgetError, setBudgetError] = useState(budgetErrorInit);

	const addressErrorInit = !!address ? '' : "Введите адрес/место";
	const [addressDirty, setAddressDirty] = useState(false);
	const [addressError, setAddressError] = useState(addressErrorInit);

	const timeErrorInit = !!time ? '' : "Введите время";
	const [timeDirty, setTimeDirty] = useState(false);
	const [timeError, setTimeError] = useState(timeErrorInit);

	const noteErrorInit = !!note ? '' : "Введите текст";
	const [noteDirty, setNoteDirty] = useState(false);
	const [noteError, setNoteError] = useState(noteErrorInit);

	// Переменная состояния валидности формы
	const [isFormValid, setFormValid] = useState(false);

	// При изменении состояний ошибок проверяем форму на валидность 
	useEffect(() => {
		switch (type) {
			case "1":
				if (nameError || budgetError) {
					setFormValid(false);
				} else {
					setFormValid(true);
				}
				break;
			case "2":
				if (nameError || addressError || timeError) {
					setFormValid(false);
				} else {
					setFormValid(true);
				}
				break;
			case "3":
				if (nameError || noteError) {
					setFormValid(false);
				} else {
					setFormValid(true);
				}
				break;

			default:
				break;
		}
	}, [nameError, budgetError, addressError, timeError, noteError, type]);

	// При изменении типа события управляем состоянием ошибок и Dirty
	useEffect(() => {
		switch (type) {
			case "1":
				setFormData({
					...fields,
					address: "",
					time: "",
					note: "",
				});
				
				setAddressDirty(false);
				setTimeDirty(false);
				setNoteDirty(false);
				setBudgetError(budgetErrorInit);
				break;
			case "2":
				setFormData({
					...fields,
					budget: "",
					note: "",
				});
				setBudgetDirty(false);
				setNoteDirty(false);
				setAddressError(addressErrorInit);
				setTimeError(timeErrorInit);
				break;
			case "3":
				setFormData({
					...fields,
					address: "",
					budget: "",
					time: "",
				});

				setBudgetDirty(false);
				setAddressDirty(false);
				setTimeDirty(false);
				setNoteError(timeErrorInit);
				break;

			default:
				break;
		}
	}, [type]);

	// Обработчик события blur инпутов
	const blurHandler = (e) => {
		switch (e.target.name) {
			case "event_name":
				setNameDirty(true);
				break;
			case "event_budget":
				setBudgetDirty(true);
				break;
			case "event_address":
				setAddressDirty(true);
				break;
			case "event_time":
				setTimeDirty(true);
				break;
			case "event_note":
				setNoteDirty(true);
				break;
			default:
				break;
		}
	};

	const onChangeEventName = (e) => {
		if (!e.target.value) {
			setNameError("Введите название события");
		} else {
			setNameError("");
		}

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
		if (!e.target.value) {
			setAddressError("Введите адрес/место");
		} else {
			setAddressError("");
		}

		setFormData({
			...fields,
			address: e.target.value,
		});
	};

	const onChangeEventTime = (e) => {
		if (!e.target.value) {
			setTimeError("Введите время");
		} else {
			setTimeError("");
		}

		setFormData({
			...fields,
			time: e.target.value,
		});
	};

	const onChangeEventBudget = (e) => {
		if (!e.target.value) {
			setBudgetError("Введите бюджет");
		} else if (e.target.value < 0) {
			setBudgetError("Отрицательный бюджет");
		} else {
			setBudgetError("");
		}

		setFormData({
			...fields,
			budget: e.target.value,
		});
	};

	const onChangeEventNote = (e) => {
		if (!e.target.value) {
			setNoteError("Введите текст");
		} else {
			setNoteError("");
		}

		setFormData({
			...fields,
			note: e.target.value,
		});
	};

	// Добавление события в state events
	const addEvent = () => {
		// Назначение поля id добавляемому событию
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

		history.push("/");
	};

	// Обновление события
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
		<form className="event__form">
			<div className="form-group">
				<label>Название события</label>

				{nameDirty && nameError && (
					<div className="error-message">{nameError}</div>
				)}
				<input
					type="text"
					name="event_name"
					className={`form-control ${
						nameDirty && nameError && "error"
					}`}
					value={name}
					autoFocus={true}
					onChange={onChangeEventName}
					onBlur={(e) => {
						blurHandler(e);
					}}
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

					{budgetDirty && budgetError && (
						<div className="error-message">{budgetError}</div>
					)}
					<input
						type="number"
						name="event_budget"
						className={`form-control ${
							budgetDirty && budgetError && "error"
						}`}
						value={budget}
						onChange={onChangeEventBudget}
						onBlur={(e) => {
							blurHandler(e);
						}}
					/>
				</div>
			)}

			{type === "2" && (
				<>
					<div className="form-group">
						<label>Куда идти?</label>

						{addressDirty && addressError && (
							<div className="error-message">{addressError}</div>
						)}
						<input
							type="text"
							name="event_address"
							className={`form-control ${
								addressDirty && addressError && "error"
							}`}
							value={address}
							onChange={onChangeEventAddress}
							onBlur={(e) => {
								blurHandler(e);
							}}
						/>
					</div>

					<div className="form-group">
						<label>Во сколько?</label>

						{timeDirty && timeError && (
							<div className="error-message">{timeError}</div>
						)}
						<input
							type="text"
							name="event_time"
							className={`form-control ${
								timeDirty && timeError && "error"
							}`}
							value={time}
							onChange={onChangeEventTime}
							onBlur={(e) => {
								blurHandler(e);
							}}
						/>
					</div>
				</>
			)}

			{type === "3" && (
				<div className="form-group">
					<label>Текст</label>

					{noteDirty && noteError && (
						<div className="error-message">{noteError}</div>
					)}
					<textarea
						className={`form-control ${
							noteDirty && noteError && "error"
						}`}
						name="event_note"
						rows="2"
						value={note}
						onChange={onChangeEventNote}
						onBlur={(e) => {
							blurHandler(e);
						}}
					/>
				</div>
			)}

			<div className="actions-btns d-flex justify-content-between">
				<button
					className="btn btn-secondary add-event-btn"
					onClick={() => {
						history.push("/");
					}}
				>
					Отмена
				</button>

				{props.location.pathname === "/add" ? (
					<button
						type="button"
						className="btn btn-primary add-event-btn"
						onClick={addEvent}
						disabled={!isFormValid}
					>
						Добавить
					</button>
				) : (
					<button className="btn btn-success" onClick={onUpdateEvent} disabled={!isFormValid}>
						Обновить
					</button>
				)}
			</div>
		</form>
	);
};

export default Form;
