import React, { Component } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { Link, hashHistory } from "react-router";

class SongCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
    };
  }

  onSubmit(event) {
    event.preventDefault();
    this.props
      .mutate({
        variables: {
          title: this.state.title,
        },
      })
      .then(() => hashHistory.push("/"))
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <div>
        <Link to="/">
          <i className="material-icons">arrow_back</i>
        </Link>

        <h3>Create a New Song</h3>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label>Song Title:</label>
          <input
            onChange={(event) => this.setState({ title: event.target.value })}
            value={this.state.title}
          />
        </form>
      </div>
    );
  }
}

const mutation = gql`
  mutation AddSong($title: String) {
    addSong(title: $title) {
      title
    }
  }
`;

export default graphql(mutation)(SongCreate);
