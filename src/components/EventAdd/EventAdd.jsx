import React from "react";
import Form from "../Form/Form";

const EventAdd = (props) => {
	return (
		<div className="container">
			<div className="row justify-content-center">
				<div className="col-12 col-sm-8 col-md-6 col-lg-4">
					<h2 className="mb-4">Добавление события</h2>

					<Form {...props} />
				</div>
			</div>
		</div>
	);
};

export default EventAdd;
