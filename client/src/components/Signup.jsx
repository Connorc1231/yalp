import React from 'react';
import { Link } from 'react-router-dom';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animal: ''
    }
    this.formData = {
      name: '',
      email: '',
      username: '',
      password: ''
    };
  }

  getFormData(e) {
    e.preventDefault();
    this.formData = {
      name: this.refs.name.value,
      email: this.refs.email.value,
      username: this.refs.username.value,
      password: this.refs.password.value
    }
    this.props.createUser(this.formData)
  }

  render() {
    return(
      <div>
        <Link to="/">
          <button type="Home">
            Go Back
          </button>
        </Link>
        <form onSubmit={ this.getFormData.bind(this) } >
          <input ref="name" className="name" type="text" placeholder="Name" />
          <input ref="email" className="email" type="text" placeholder="E-mail" />
          <input ref="username" className="username" type="text" placeholder="Username" />
          <input ref="password" className="password" type="password" placeholder="Password" />
          <input className='submitCreateForm' type="submit" value="Create Account" />
        </form>
      </div>
    )
  }
}


export default Signup;
