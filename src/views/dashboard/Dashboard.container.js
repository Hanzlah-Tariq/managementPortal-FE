import { connect } from 'react-redux';

import Dashboard from './Dashboard.view';

const mapStateToProps = (state) => ({
  user: state.getIn(['dashboard', 'auths', 'user']),
  isAuthenticated: state.getIn(['dashboard', 'auths', 'isAuthenticated']),
  authStatus: state.getIn(['dashboard', 'auths', 'authStatus']),
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
