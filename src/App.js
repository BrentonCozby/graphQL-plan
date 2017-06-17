import React, { Component } from "react";
import RecipePage from "./Components/RecipePage.js";
import AddRecipe from "./Components/AddRecipe";
import AllRecipes from "./Components/AllRecipes";
import { BrowserRouter as Router, Route } from "react-router-dom";
import {
	ApolloProvider,
	createNetworkInterface,
	ApolloClient
} from "react-apollo";
// import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws'
// import "tachyons";

// const wsClient = new SubscriptionClient(
// 	"wss://subscriptions.graph.cool/v1/cj3z0g8hv2or7015613e1wy36"
// );

const networkInterface = createNetworkInterface({
	uri: "https://api.graph.cool/simple/v1/cj3z0g8hv2or7015613e1wy36"
});

// const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
//   networkInterface,
//   wsClient
// )

const client = new ApolloClient({ networkInterface });

// const client = new ApolloClient({
//   networkInterface: networkInterfaceWithSubscriptions,
//   dataIdFromObject: o => o.id
// })

class App extends Component {
	render() {
		return (
			<ApolloProvider client={client}>
				<Router>
					<div className="App">
						<Route exact path="/" component={AllRecipes} />
						<Route path="/add" component={AddRecipe} />
						<Route path="/recipe/:id" component={RecipePage} />
					</div>
				</Router>
			</ApolloProvider>
		);
	}
}

export default App;
