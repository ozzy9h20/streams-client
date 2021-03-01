import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: 
          '165021803785-k7eh2ssjo03peeu5j31viogs16blrlog.apps.googleusercontent.com',
        scope: 'email'
      }).then(() => {
        this.auth = window.gapi.auth2.getAuthInstance();
        this.onAuthChange(this.auth.isSignedIn.get());
        this.auth.isSignedIn.listen(this.onAuthChange);
      });
    });
  }

  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      this.props.signIn();
    }
    else {
      this.props.signOut();
    }
  }

  onSignInClick = () => {
    this.auth.signIn();
  }

  onSignOutClick = () => {
    this.auth.signOut();
  }

  renderAuthButton = () => {
    if (this.props.isSignedIn === null) {
      return (
        <button className="ui loading button">
          Loading..
        </button>  
      );
    }
    else if (this.props.isSignedIn) {
      return (
        <button 
          className="ui red google button"
          onClick={this.onSignOutClick}
        >
          <i className="google icon" />
          Sign Out
        </button>  
      );
    }
    else {
      return (
        <button 
          className="ui blue google button"
          onClick={this.onSignInClick}
          >
          <i className="google icon" />
          Sign In
        </button>  
      );
    }
  }

  render() {
    return <div className="item">{this.renderAuthButton()}</div>
  }
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
  }
}

export default connect(
  mapStateToProps, 
  { signIn, signOut }
)(GoogleAuth);