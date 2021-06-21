import React from "react";
import Form from "../Form/Form";

const EventEdit = (props) => {
	return (
		<div className="container">
			<div className="row justify-content-center">
				<div className="col-5">
					<h2 className="mb-4">Редактирование события</h2>

					<Form {...props} />
				</div>
			</div>
		</div>
	);
};

export default EventEdit;
