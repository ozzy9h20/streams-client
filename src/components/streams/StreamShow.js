import React, { useEffect, useRef } from 'react';
import flv from 'flv.js';
import { connect } from 'react-redux';
import { fetchStream } from './../../actions/index';

const StreamShow = ({ fetchStream, match, stream}) => {
  const videoRef = useRef();

  useEffect(() => {
    fetchStream(match.params.id);

    return () => {
      player?.destroy();
    }
  }, []);

  useEffect(() => {
    buildPlayer();
  });

  let player = null;
  const buildPlayer = () => {
    if (player || !stream) {
      return;
    }
    
    player = flv.createPlayer({
      type: 'flv',
      url: `http://localhost:8000/live/${match.params.id}.flv`
    });

    player.attachMediaElement(videoRef.current);
    player.load();
  }

  return (
    <div>
      <video ref={videoRef} style={{ width: '100%' }} controls />
      <h1>{stream ? stream?.title : 'Loading...'}</h1>
      <h3>{stream ? stream?.description : 'Description'}</h3>
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