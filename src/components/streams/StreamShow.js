import React, { useEffect, useRef } from 'react';
import flv from 'flv.js';
import { connect } from 'react-redux';
import { fetchStream } from './../../actions/index';

const StreamShow = ({ fetchStream, match, stream}) => {
  const videoRef = useRef();

  useEffect(() => {
    fetchStream(match.params.id);
  }, []);

  if (!stream) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <video ref={videoRef} style={{ width: '100%' }} controls />
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