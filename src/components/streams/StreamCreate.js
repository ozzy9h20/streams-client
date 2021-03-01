import React from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamCreate extends React.Component {
  renderInput({ input, label }) {
    return (
      <div className="field">
        <label>{label}</label>
        <input { ...input } />
      </div>
    );
  }

  onSubmit(formValues) {
    // No need event.preventDefault()
    console.log(formValues);
  }

  render() {
    console.log(this.props);
    return ( 
      <form 
        onSubmit={this.props.handleSubmit(this.onSubmit)} 
        className="ui form"
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
 
export default reduxForm({
  form: 'streamCreate' // Name based on its purpose
})(StreamCreate);