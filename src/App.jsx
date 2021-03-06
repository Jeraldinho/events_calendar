import "./App.css";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import EventAdd from "./components/EventAdd/EventAdd";
import EventEdit from "./components/EventEdit/EventEdit";

function App() {
	return (
		<div className="App">
			<Header />

			<Router>
				<Switch>
					<Route exact path="/" component={Main} />
					<Route path="/add" component={EventAdd} />
					<Route path="/edit" component={EventEdit} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
