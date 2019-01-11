import React from 'react';

const AuthUserContext = React.createContext(null);

const withUser = Component => props => (
  <AuthUserContext.Consumer>
    {authUser => <Component {...props} authUser={authUser} />}
  </AuthUserContext.Consumer>
);

export { withUser };
export default AuthUserContext;
