import React from 'react';
import { Link } from 'react-router-dom';

import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../Session';

const Navigation = ({ authUser }) => (
  <div>    <AuthUserContext.Consumer>
    {authUser =>
      authUser ? <NavigationAuth /> : <NavigationNonAuth />
    }
  </AuthUserContext.Consumer></div>
);

const NavigationAuth = () => (

  <div>

    <Link to={ROUTES.HOME}> Home |</Link>

    <Link to={ROUTES.LANDING}> Landing |</Link>

    <Link to={ROUTES.ACCOUNT}> Account |</Link>

    <Link to={ROUTES.ADMIN}> Admin |</Link>


    <SignOutButton />

  </div>
);

const NavigationNonAuth = () => (
  <div>

    <Link to={ROUTES.LANDING}> Landing |</Link>

    <Link to={ROUTES.SIGN_IN}> Sign In |</Link>

    <Link to={ROUTES.SIGN_UP}> Sign Up |</Link>

  </div>
);

export default Navigation;