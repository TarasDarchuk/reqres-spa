import React, { Component } from "react";
import Input from "./Input";
import Button from "./Button";
import { connect } from "react-redux";
import { deleteUser, editUser } from "../../actions";
import { StyleSheet, css } from "aphrodite";
import { Link } from "react-router-dom";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      deleted: false,
      deleting: false,
      saved: false
    };
  }

  deleteUser(id) {
    this.props.deleteUser(id);
    this.setState({ deleted: true });
  }
  componentWillUpdate(prevProps) {
    if (prevProps.location.state !== this.props.location.state) {
      this.setState({
        edit: false,
        deleted: false,
        deleting: false
      });
    }
  }

  editUser() {
    const { location } = this.props;
    const { firstName } = this.refs;
    const lastName = this.refs.lastName.state.value
      ? this.refs.lastName.state.value
      : location.state.last_name;
    const data = {
      ...location.state,
      firstName: firstName.state.value
        ? firstName.state.value
        : location.state.first_name,
      lastName: lastName
    };
    this.props.editUser(data);
  }

  render() {
    const { location } = this.props;
    return (
      <div className={css(styles.wrap)}>
        <Link to="/" className={css(styles.back)}>
          ◄ Back to list
        </Link>
        <h1>User info:</h1>
        {this.state.deleted ? (
          "User is deleted"
        ) : (
          <div className={css(styles.user)}>
            <img
              src={location.state.avatar}
              style={{ maxHeight: 128 }}
              alt=""
            />
            <div className={css(styles.info)}>
              <span>
                First name: {/* {this.state.edit ? ( */}
                <Input
                  editMode={this.state.edit}
                  ref="firstName"
                  defaultValue={location.state.first_name}
                />
              </span>
              <br />
              <span>
                Last name:{" "}
                <Input
                  editMode={this.state.edit}
                  ref="lastName"
                  defaultValue={location.state.last_name}
                />
              </span>
              <br />
              <Button
                style={css(styles.edit)}
                action={() => {
                  this.state.edit
                    ? this.editUser()
                    : this.setState({ edit: true });
                }}
                value={this.state.edit ? "Save Changes" : "Edit User Info"}
              />

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

const styles = StyleSheet.create({
  wrap: {
    marginTop: 50,
    textAlign: "center"
  },
  user: {
    display: "flex",
    fontSize: 20,
    textAlign: "left",
    width: "fit-content",
    marginLeft: "auto",
    marginRight: "auto"
  },
  info: {
    paddingLeft: 10
  },
  edit: {
    backgroundColor: "orange",
    width: "100px",
    padding: 5,
    borderRadius: 10,
    border: "none",
    ":hover": {
      cursor: "pointer"
    },
    ":active": {
      color: "red"
    }
  },
  delete: {
    color: "white",
    width: "100px",
    padding: 5,
    backgroundColor: "red",
    borderRadius: 10,
    border: "none",
    ":hover": {
      cursor: "pointer"
    },
    ":active": {
      color: "orange"
    }
  },
  back: {
    textDecoration: "none",
    color: "black",
    fontWeight: "bold",
    ":hover": {
      color: "orange"
    }
  }
});

const mapStateToProps = state => {
  return {
    users: state.users
  };
};

export default connect(
  mapStateToProps,
  { deleteUser, editUser }
)(User);
