import React from 'react';
import ReactDOM from 'react-dom';
import history from '../history';

const Modal = ({ title, content, actions }) => {
  return ReactDOM.createPortal(
    <div 
      onClick={() => history.push('/')} 
      className="ui dimmer modals visible active"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="ui standard modal visible active"
      >
        <div className="header">{title}</div>
        <div className="content">{content}</div>
        <div className="actions">{actions}</div>
      </div>
    </div>,
    document.getElementById('modal')
  );
};
 
export default Modal;