import React, { Component } from "react";
import Recipe from "./Recipe";
import { gql, graphql } from "react-apollo";
import { Link } from "react-router-dom";

class ListPage extends Component {
	// componentWillReceiveProps(newProps) {
	//   if (!newProps.data.loading) {
	//     if (this.subscription) {
	//       if (newProps.data.allRecipe !== this.props.data.allRecipe) {
	//         // if the feed has changed, we need to unsubscribe before resubscribing
	//         this.subscription()
	//       } else {
	//         // we already have an active subscription with the right params
	//         return
	//       }
	//     }
	//     this.subscription = newProps.data.subscribeToMore({
	//       document: gql`
	//         subscription {
	//           Recipe(filter: {
	//             mutation_in: [CREATED]
	//           }) {
	//             node {
	//               id
	//               image
	//               description
	//             }
	//           }
	//         }
	//       `,
	//       variables: null,
	//
	//       // this is where the magic happens
	//       updateQuery: (previousState, {subscriptionData}) => {
	//         const newRecipe = subscriptionData.data.Recipe.node
	//
	//         return {
	//           allRecipes: [
	//             {
	//               ...newRecipe
	//             },
	//             ...previousState.allRecipes
	//           ]
	//         }
	//       },
	//       onError: (err) => console.error(err),
	//     })
	//   }
	// }
	render() {
		if (this.props.data.loading) {
			return (
				<div className="flex w-100 h-100 items-center justify-center pt7">
					<div>
						Loading
					</div>
				</div>
			);
		}
		return (
			<div className="w-100 flex justify-center pa6">
				<div className="w-100 flex flex-wrap" style={{ maxWidth: 1150 }}>
					<Link
						to="/add"
						className="ma3 box new-post br2 flex flex-column items-center justify-center ttu fw6 f20 black-30 no-underline">
						<img
							src={require("../assets/plus.svg")}
							alt=""
							className="plus mb3"
						/>
						<div>New Post</div>
					</Link>
					{this.props.data.allRecipes.map(recipe =>
						<Recipe
							key={recipe.id}
							recipe={recipe}
							refresh={() => this.props.data.refetch()}
						/>
					)}
				</div>
				{this.props.children}
			</div>
		);
	}
}

const FeedQuery = gql`query allRecipes {
  allRecipes(orderBy: createdAt_DESC) {
    id
    image
    description
  }
}`;

const ListPageWithData = graphql(FeedQuery, {
	options: {
		fetchPolicy: "cache-and-network"
	}
})(ListPage);

export default ListPageWithData;
