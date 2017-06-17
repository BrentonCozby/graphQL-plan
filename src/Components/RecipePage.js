import React, { Component } from "react";
import { gql, graphql } from "react-apollo";
import { withRouter } from "react-router-dom";

class RecipePage extends Component {
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

		const { Recipe } = this.props.data;

		return (
			<div>
				<div
					className="close"
					onClick={this.props.history.goBack}>
					<img src={require("../assets/close.svg")} alt="" />
				</div>
				<div
					className="delete"
					onClick={this.handleDelete}>
					Delete
				</div>
				<div className="detail">
					<div
						className="image"
						style={{
							backgroundImage: `url(${Recipe.image})`,
							backgroundSize: "cover",
							backgroundPosition: "center"
						}}
					/>
					<div className="description">
						{Recipe.title}
					</div>
					<div className="description">
						{Recipe.description}
					</div>
					<ul className="description">
						{Recipe.ingredients.map((ingredient, index) =>
							<li key={index}>{ingredient}</li>
						)}
					</ul>
					<ul className="description">
						{Recipe.instructions.map((instruction, index) =>
							<li key={index}>{instruction}</li>
						)}
					</ul>
				</div>
			</div>
		);
	}

	handleDelete = async () => {
		await this.props.mutate({ variables: { id: this.props.data.Recipe.id } });

		// recipe is gone, so remove it from history stack
		this.props.history.replace("/");
	};
}

const deleteMutation = gql`
  mutation deleterecipe($id: ID!) {
    deleteRecipe(id: $id) {
      id
    }
  }
`;

const recipeQuery = gql`
	query post ($id: ID!) {
		Recipe (id: $id) {
			id
			title
			image
			description
			ingredients
			instructions
		}
	}
`;

// update w/ react-router v4 url params api
//
// see documentation on computing query variables from props in wrapper
// http://dev.apollodata.com/react/queries.html#options-from-props
const RecipePageWithData = graphql(recipeQuery, {
	options: ({ match }) => ({
		variables: {
			id: match.params.id
		}
	})
})(RecipePage);

const RecipePageWithDelete = graphql(deleteMutation)(RecipePageWithData);

export default withRouter(RecipePageWithDelete);
