import React, { Component } from "react";
import { StyleSheet, css } from "aphrodite";
import axios from "axios";
import { getData } from "../../actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  getData(page) {
    this.props.getData(page);
  }

  componentWillMount() {
    this.getData(1);
    this.getData(2);
    this.getData(3);
    this.getData(4);
  }

  render() {
    return (
      <div className={css(styles.list)}>
        <h1>List of users:</h1>
        <ul className={css(styles.ul)}>
          {this.props.users.map((user, index) => (
            <Link
              to={{
                pathname: `/${user.first_name}_${user.last_name}`,
                state: {
                  avatar: user.avatar,
                  firstName: user.first_name,
                  lastName: user.last_name,
                  id: user.id,
                  index: index
                }
              }}
              key={index}
            >
              <li className={css(styles.li)}>
                {user.first_name} {user.last_name}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    color: "red",
    textAlign: "left",
    width: 500
  },
  ul: {
    listStyleType: "none",
    fontSize: 30,
    textAlign: "left",
    width: "fit-content"
  },
  li: {
    color: "red",
    textDecoration: "none",
    ":hover": {
      fontSize: 50,
      cursor: "pointer"
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
  { getData }
)(List);
