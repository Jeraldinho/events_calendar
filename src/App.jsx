import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import EventAdd from "./components/EventAdd/EventAdd";
import EventEdit from "./components/EventEdit/EventEdit";

function App(props) {
	return (
		<div className="App">
			<Header />

			<Router>
				<Switch>
					<Route exact path="/" component={Main} />
					<Route  path="/add" component={EventAdd} />
					<Route  path="/edit" component={EventEdit} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
