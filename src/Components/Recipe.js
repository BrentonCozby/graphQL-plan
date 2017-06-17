import React, { Component } from "react";
import { Link } from "react-router-dom";

class Recipe extends Component {
	render() {
		return (
			<Link
				className="bg-white ma3 box post flex flex-column no-underline br2"
				to={`/recipe/${this.props.recipe.id}`}>
				<div
					className="image"
					style={{
						backgroundImage: `url(${this.props.recipe.image})`,
						backgroundSize: "cover",
						backgroundPosition: "center",
						paddingBottom: "100%"
					}}
				/>
				<div className="flex items-center black-80 fw3 description">
					{this.props.recipe.description}
				</div>
			</Link>
		);
	}
}

export default Recipe;
