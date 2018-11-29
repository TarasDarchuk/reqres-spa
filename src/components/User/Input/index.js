import React, { Component } from "react";
import { StyleSheet, css } from "aphrodite";

class Input extends Component {
  state = {
    value: ""
  };

  handleChange(e) {
    this.setState({
      value: e.target.value
    });
  }
  render() {
    const { defaultValue } = this.props;
    return this.props.editMode ? (
      <input
        type="text"
        onChange={e => this.handleChange(e)}
        defaultValue={defaultValue}
        className={css(styles.input)}
      />
    ) : (
      <div className={css(styles.input)}>{defaultValue}</div>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    display: "inline-block"
  }
});

export default Input;
