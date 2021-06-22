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
	// Получаем данные из контекста через кастомный хук
	const {
		events,
		fields,
		setFormData,
		formInputs,
		setFilteredEvents,
	} = useData();

	// Используем хук для роутинга
	const history = useHistory();

	// Достаем дату и сохраняем в переменную
	const { date } = fields;

	// Функция, меняющая формат даты
	let dateFormat = (date) => {
		return date.setHours(0, 0, 0, 0);
	};

	// Действия при изменении даты в календаре
	const onChangeEventDate = (date) => {
		// Меняем формат даты из строки в число
		let newDate = dateFormat(date);

		// Меняем полученную дату в state
		setFormData({
			...fields,
			date: newDate,
		});

		// Фильтруем события по полученной дате
		let newData = events.filter((event) => event.date === newDate);

		// Обновляем state фильтрованных по дате событий
		setFilteredEvents(newData);
	};

	// Переход на страницу добавления события
	const toAddEvent = () => {
		/* 
			Обнуляем поля формы если до этого что-то вводили, но нажали Отмена или пытались редактировать событие, 
			но потом нажали Отмена и теперь снова пробуем добавить событие
		*/
		setFormData({
			...fields,
			...formInputs,
			date: date,
		});

		history.push("/add");
	};

	// Подсвечиваем даты, на которые назначены события
	const highliteDates = () => {
		return events.map((event) => {
			return (subDays(new Date(event.date), 0))
		})
	}

	return (
		<main className="content container">
			<div className="row">
				<div className="sidebar choose-date col-12 col-sm-12 col-md-4">
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

				<div className="content col-12 col-sm-12 col-md-8 mt-4 mt-md-0">
					<h3 className="mb-3">Список событий</h3>
					<Events />
				</div>
			</div>
		</main>
	);
};
export default Main;
