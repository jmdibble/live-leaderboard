import React, { Component } from 'react';

import { withAuthorization } from '../Session';
import { userInfo } from 'os';

const INITIAL_STATE = {
  points: '',
}

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

    // await this.props.firebase.user(authUser.user.uid)
    // .update({
    // points: points,
    // })

    await this.props.firebase.points(userId).transaction((currentPoints) => {
      if(currentPoints == null)
        currentPoints = 0;

      return parseInt(points) + currentPoints
    }) 
    
    event.preventDefault();
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { points } = this.state
    return (
      <div>
        <h1>Host a Run</h1>
        <form onSubmit={this.onSubmit}>
          {/* <input value={name} type="text" name="name" onChange={this.onChange} placeholder="Name" /> */}
          <input value={points} type="number" name="points" onChange={this.onChange} placeholder="Points" />
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AddPoints);