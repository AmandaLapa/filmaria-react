import {BrowserRouter, Route, Switch} from "react-router-dom";

import Header from "./components/Header";
import Home from "./Pages/Homes";
import Filme from "./Pages/Filme";
import Favoritos from "./Pages/Favoritos";
import Erro from "./Pages/Erro"

const Routes = () => {
	return (
		<BrowserRouter>
			<Header />
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/filme/:id" component={Filme} />
				<Route exact path="/favoritos" component={Favoritos} />
				<Route path="*" component={Erro} />
			</Switch>
		</BrowserRouter>
	);
};

export default Routes;
