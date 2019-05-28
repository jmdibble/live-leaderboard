import React, { Component } from 'react';

import { withAuthorization } from '../Session';


const INITIAL_STATE = {
  points: '',
  loading: false,
  users: [],
}

// ADD POINTS UNDER UID

class AddPoints extends Component {
  constructor(props) {
    super(props)
    this.state = { ...INITIAL_STATE }
  }

  componentDidMount() {
  this.props.firebase.users().on('value', snapshot => {
    console.log(snapshot.val())
    const usersObject = snapshot.val()
    const usersList = Object.keys(usersObject).map(key => ({
      ...usersObject[key],
      uid: key,
    }));

    this.setState({
      users: usersList,
    });
    console.log(usersList)
    })
  }

  onSubmit = async event => {

    event.preventDefault();

    const { points } = this.state;

    var userId = await this.props.firebase.auth.currentUser.uid

    // THIS CODE IS JUST AS VIABLE, BUT USED TRANSACTIONS INSTEAD
    // await this.props.firebase.user(authUser.user.uid)
    // .update({
    // points: points,
    // })

    await this.props.firebase.points(userId).transaction((currentPoints) => {
      if (currentPoints == null)
        currentPoints = 0;
      return parseInt(points) + currentPoints
    })
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });   
    };

    render() {
      const { points, users } = this.state
      return (
        <div>

          <h1>Leaderboard</h1>
          <form onSubmit={this.onSubmit}>
            {/* <input value={name} type="text" name="name" onChange={this.onChange} placeholder="Name" /> */}
            <input value={points} type="number" name="points" onChange={this.onChange} placeholder="Add Points" />
            <button type="submit">Add</button>
          </form>

          <div>
            <p>Render list of users and points here</p>
            <UserList users={users} />
          </div>

        </div>
      )
    }
  }

  const UserList = ({ users }) => (
    <ul>
      {users.map(user => (
        <li key={user.uid}>
          <span>
            <strong>Username:</strong> {user.username}
          </span>
          <span>
            <strong>Points:</strong> {user.points}
          </span>
        </li>
      ))}
    </ul>
  );

  const condition = authUser => !!authUser;

  export default withAuthorization(condition)(AddPoints);