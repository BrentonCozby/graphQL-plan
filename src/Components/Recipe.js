import React, { Component } from "react";
import { Link } from "react-router-dom";

class Recipe extends Component {
	render() {
		return (
			<Link
				className="box post"
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
				<div className="description">
					{this.props.recipe.description}
				</div>
			</Link>
		);
	}
}

export default Recipe;
