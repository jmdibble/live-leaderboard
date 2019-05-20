import React, { Component } from 'react';

import { withAuthorization } from '../Session';
import { userInfo } from 'os';

const INITIAL_STATE = {
  points: '',
}

// ADD POINTS UNDER UID

class AddPoints extends Component {
  constructor(props) {
    super(props)
    this.state = { ...INITIAL_STATE }
  }

  onSubmit = async event => {
    const { points } = this.state;
    // console.log(this.state)

    var userId = await this.props.firebase.auth.currentUser.uid
    console.log(userId)

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

    event.preventDefault();
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  // EXTRACT LIST OF USERNAMES AND POINTS



  render() {
    const { points } = this.state
    return (
      <div>

        <h1>Leaderboard</h1>
        <form onSubmit={this.onSubmit}>
          {/* <input value={name} type="text" name="name" onChange={this.onChange} placeholder="Name" /> */}
          <input value={points} type="number" name="points" onChange={this.onChange} placeholder="Add Points" />
          <button type="submit">Add</button>
        </form>

        <div>

          <p>put points and usernames here</p>
        </div>

      </div>
    )
  }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AddPoints);