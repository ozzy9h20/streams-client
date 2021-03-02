import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchStream } from './../../actions/index';

const StreamShow = ({ fetchStream, match, stream}) => {
  useEffect(() => {
    fetchStream(match.params.id);
  }, []);

  if (!stream) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>{stream?.title}</h1>
      <h3>{stream?.description}</h3>
    </div>
   );
}

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id]
  }
}

export default connect(
  mapStateToProps,
  { fetchStream }
)(StreamShow);