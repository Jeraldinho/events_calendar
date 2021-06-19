import React from "react";
import "../../css/materialdesignicons.min.css";
import Events from "../Events/Events";
import DatePicker from "react-datepicker";
import { subDays } from "date-fns";
import ru from "date-fns/locale/ru";
import "react-datepicker/dist/react-datepicker.css";
import { useHistory } from "react-router-dom";
import { useData } from "../../DataContext";

const Main = (props) => {
	const {
		events,
		fields,
		setFormData,
		formInputs,
		setFilteredEvents,
	} = useData();

	const { date } = fields;

	const history = useHistory();

	let dateFormat = (date) => {
		return date.setHours(0, 0, 0, 0);
	};

	const onChangeEventDate = (date) => {
		let newDate = dateFormat(date);

		setFormData({
			...fields,
			date: newDate,
		});

		let newData = events.filter((event) => event.date === newDate);

		setFilteredEvents(newData);
	};

	const toAddEvent = () => {
		setFormData({
			...fields,
			...formInputs,
			date: date,
		});

		history.push("/add");
	};

	const highliteDates = () => {
		return events.map((event) => {
			return (subDays(new Date(event.date), 0))
		})
	}

	return (
		<main className="content container">
			<div className="row">
				<div className="sidebar choose-date col-4">
					<div className="choose-date__title">
						Выберите дату события:
					</div>

					<DatePicker
						dateFromat="YYYY-MM-dd"
						selected={date}
						//minDate={new Date()}
						onChange={(date) => onChangeEventDate(date)}
						highlightDates={highliteDates()}
						calendarStartDay={1}
						value={date}
						locale={ru}
						inline
					/>

					<div className="actions">
						<button
							className="btn btn-primary add-event-btn"
							onClick={toAddEvent}
						>
							Добавить
						</button>
					</div>
				</div>

				<div className="content col-8">
					<h3 className="mb-3">Список событий</h3>
					<Events />
				</div>
			</div>
		</main>
	);
};
export default Main;
