import React from 'react';

import { withAuthorization } from '../Session';

const LeaderboardPage = () => (
  <div>
    <h1>Leaderboard</h1>
    <p>Accessible by every signed in user</p>
    <p>Show leaderboard here - pull data from Firebase</p>
  </div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(LeaderboardPage);