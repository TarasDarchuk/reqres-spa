import React, { Component } from "react";

import { connect } from "react-redux";
import { deleteUser, editUser } from "../../actions";
import { StyleSheet, css } from "aphrodite";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      firstName: "",
      lastName: "",
      deleted: false,
      deleting: false
    };
  }

  deleteUser(id) {
    this.props.deleteUser(id);
    this.setState({ deleted: true });
  }

  editUser(obj) {
    this.props.editUser(obj);
    this.setState({ edit: false });
  }

  edit() {
    this.setState({
      edit: true
    });
  }

  handleChange(e, key) {
    this.setState({
      [key]: e.target.value
    });
  }

  componentWillMount() {
    if (!this.state.firstName) {
      this.setState({
        firstName: this.props.location.state.firstName,
        lastName: this.props.location.state.lastName
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({
        firstName: this.props.location.state.firstName,
        lastName: this.props.location.state.lastName
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({
        edit: false,
        deleted: false,
        deleting: false,
        firstName: this.props.location.state.firstName,
        lastName: this.props.location.state.lastName
      });
    }
  }

  render() {
    const { location } = this.props;
    return (
      <div className={css(styles.wrap)}>
        <h1>User info:</h1>
        {this.state.deleted ? (
          "User is deleted"
        ) : (
          <div className={css(styles.user)}>
            <div>
              <img src={location.state.avatar} alt="" />
            </div>
            <div className={css(styles.info)}>
              <span>
                First name:{" "}
                {this.state.edit ? (
                  <input
                    type="text"
                    onChange={e => this.handleChange(e, "firstName")}
                    defaultValue={this.state.firstName}
                  />
                ) : (
                  this.state.firstName
                )}
              </span>
              <br />
              <span>
                Last name:{" "}
                {this.state.edit ? (
                  <input
                    type="text"
                    onChange={e => this.handleChange(e, "lastName")}
                    defaultValue={this.state.lastName}
                  />
                ) : (
                  this.state.lastName
                )}
              </span>
              <br />
              {this.state.edit ? (
                <div>
                  <button
                    className={css(styles.edit)}
                    onClick={() => {
                      this.editUser({
                        index: location.state.index,
                        firstName: this.state.firstName,
                        lastName: this.state.lastName,
                        id: location.state.id,
                        avatar: location.state.avatar
                      });
                    }}
                  >
                    Save Changes
                  </button>
                </div>
              ) : (
                <div>
                  <button
                    className={css(styles.edit)}
                    onClick={() => this.edit()}
                  >
                    Edit User Info
                  </button>
                </div>
              )}
              {this.state.deleting ? (
                <div>
                  <span>Are you sure?</span>
                  <br />
                  <button
                    className={css(styles.delete)}
                    onClick={() => this.deleteUser(location.state.id)}
                  >
                    Yes
                  </button>
                  <button
                    className={css(styles.edit)}
                    onClick={() => this.setState({ deleting: false })}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  className={css(styles.delete)}
                  onClick={() => this.setState({ deleting: true })}
                >
                  Delete User
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.list
  };
};

const styles = StyleSheet.create({
  wrap: {
    marginTop: 20,
    borderLeft: "1px solid grey",
    paddingLeft: 20,
    fontSize: 20
  },
  user: {
    float: "right",
    width: 500,
    display: "flex",
    textAlign: "left"
  },
  info: {
    paddingLeft: 10
  },
  edit: {
    backgroundColor: "pink",
    width: "fit-content",
    padding: 5,
    border: "2px solid black",
    borderRadius: 3,
    ":hover": {
      cursor: "pointer"
    }
  },
  delete: {
    color: "white",
    padding: 5,
    backgroundColor: "red",
    borderRadius: 3,
    borderColor: "black",
    ":hover": {
      cursor: "pointer"
    }
  }
});

export default connect(
  mapStateToProps,
  { deleteUser, editUser }
)(User);
