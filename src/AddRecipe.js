import React, { Component } from "react";
import { gql, graphql } from "react-apollo";

class CreateRecipe extends Component {
	constructor() {
		super();
		this.state = {
			showForm: false,
			showSuccess: false,
			title: "",
			description: "",
			image: "",
			ingredients: [],
			instructions: []
		};
	}

	render() {
		return (
			<div>
				<div className="dt w-100">
					<div>
						<form
							style={{
								fontFamily:
									'Circular,"Helvetica Neue",Helvetica,Arial,sans-serif'
							}}
							className="pa3 measure center">
							<div>
								<div className="w-100 tc pb4">
									<input
										type="text"
										className="inputField w-75 pa2 input-reset tc"
										value={this.state.title}
										placeholder="Title"
										onChange={e => this.setState({ title: e.target.value })}
									/>
									<input
										type="text"
										className="inputField w-75 pa2 input-reset tc"
										value={this.state.description}
										placeholder="description"
										onChange={e =>
											this.setState({ description: e.target.value })}
									/>
									<input
										type="text"
										className="inputField w-75 pa2 pt4 input-reset tc"
										value={this.state.image}
										placeholder="image URL"
										onChange={e => this.setState({ image: e.target.value })}
									/>
									<input
										type="text"
										className="inputField w-75 pa2 pt4 input-reset tc"
										value={this.state.ingredients}
										placeholder="Ingredients"
										onChange={e =>
											this.setState({ ingredients: e.target.value })}
									/>
									<input
										type="text"
										className="inputField w-75 pa2 pt4 input-reset tc"
										value={this.state.instructions}
										placeholder="instructions"
										onChange={e =>
											this.setState({ instructions: e.target.value })}
									/>
								</div>
								{this.state.title &&
									this.state.description &&
									this.state.image &&
									this.state.ingredients &&
									this.state.instructions &&
									<a
										onClick={this.handlePost}
										className="f6 link dim ba bw1 ph3 pv2 mb2 dib black"
										href="#0">
										Join
									</a>}
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}

	handlePost = async () => {
		const { title, description, image, ingredients, instructions } = this.state;
		await this.props.addPost({
			variables: { title, description, image, ingredients, instructions }
		});

		this.setState({ showForm: !this.state.showForm });
		this.setState({ showSuccess: !this.state.showSuccess });
	};
}

const addMutation = gql`
  mutation addPost($title: String!, $description: String!, $image: String!, $ingredients: [String!]!, $instructions: [String!]!) {
    createRecipe(title: $title, description: $description, image: $image, ingredients: $ingredients, instructions: $instructions) {
      id
			title
			description
			image
			ingredients
			instructions
    }
  }
`;

const PageWithMutation = graphql(addMutation, { name: "addPost" })(
	CreateRecipe
);

export default PageWithMutation;
