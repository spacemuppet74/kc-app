import React, { Component } from "react";

class Time extends Component {
  state = {
    time: new Date()
  };

  componentDMount() {
    setInterval(() => {
      this.setState({ time: new Date() });
    }, 1000);
  }
  render() {
    return <div>{this.props.render(this.state)}</div>;
  }
}

export default Time;
