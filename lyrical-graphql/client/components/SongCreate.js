import React, { Component } from "react";

class SongCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
    };
  }

  onSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div>
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

export default SongCreate;
