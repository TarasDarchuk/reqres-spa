import React, { Component } from "react";
import { StyleSheet, css } from "aphrodite";
import { getData } from "../../actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class List extends Component {
  getData = page => {
    this.props.getData(page);
  };

  componentWillMount() {
    if (this.props.users.length === 0) {
      this.props.getData();
    }
  }

  render() {
    const { users } = this.props;
    return (
      <div className={css(styles.list)}>
        <h1>List of users</h1>
        <ul className={css(styles.ul)}>
          {users.map((user, index) => (
            <li>
              <Link
                to={{
                  pathname: `/${user.id}`,
                  state: {
                    ...user,
                    index: index
                  }
                }}
                key={index}
                className={css(styles.li)}
              >
                {user.first_name} {user.last_name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    color: "black",
    textAlign: "center"
  },
  ul: {
    listStyleType: "none",
    fontSize: 30
  },
  li: {
    color: "black",
    textDecoration: "none",
    ":hover": {
      color: "orange",
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
