import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createStream } from './../../actions/index';

class StreamCreate extends React.Component {
  renderError({ error, touched}) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  renderInput = ({ input, label, meta }) => {
    const renderClass = `field ${meta.error && meta.touched && 'error'}`;
    return (
      <div className={renderClass}>
        <label>{label}</label>
        <input { ...input } autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  }

  onSubmit = (formValues) => {
    // No need event.preventDefault()
    this.props.createStream(formValues);
  }

  render() {
    return ( 
      <form 
        onSubmit={this.props.handleSubmit(this.onSubmit)} 
        className="ui form error"
      >
        <Field 
          name="title" 
          component={this.renderInput} 
          label="Enter Title:" 
        />
        <Field 
          name="description" 
          component={this.renderInput} 
          label="Enter Desc:"
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

const validate = (formValues) => {
  const errors = {};
  if (!formValues.title) {
    errors.title = 'You must enter a title.';
  }

  if (!formValues.description) {
    errors.description = 'You must enter a description.';
  }

  return errors;
}
 
const formWrapped = reduxForm({
  form: 'streamCreate', // Name based on its purpose
  validate
})(StreamCreate);

export default connect(
  null,
  { createStream }
)(formWrapped);