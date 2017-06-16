import React, { Component } from "react";
import { gql, graphql } from "react-apollo";
import "./RecipePage.css";

class RecipePage extends Component {
	static propTypes = {
		data: React.PropTypes.shape({
			loading: React.PropTypes.bool,
			allRecipes: React.PropTypes.object
		}).isRequired
	};
	render() {
		return <div />;
	}
}

const recipeQuery = gql`
  query recipeQuery {
    allRecipes {
      title
    }
  }
`;

const RecipeWithData = graphql(recipeQuery)(RecipePage);

export default RecipeWithData;
