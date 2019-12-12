import React from "react";
import { withRouter } from "react-router-dom";
import { Link } from 'react-router-dom';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      errors: {},
      clickEmail: false,
      clickPw: false,
      errorFlag: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    // this.renderErrors = this.renderErrors.bind(this);
    this.handleDemoUser = this.handleDemoUser.bind(this);
    this.clickEmail = this.clickEmail.bind(this);
    this.clickPw = this.clickPw.bind(this);
    this.parseInputEmail = this.parseInputEmail.bind(this);
    this.parseInputPassword = this.parseInputPassword.bind(this);
    this.checkErrors = this.checkErrors.bind(this);
  }

  // Once the user has been authenticated, redirect to the movies page
  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser === true) {
      this.props.history.push("/movies");
    }

    // Set or clear errors
    this.setState({ errors: nextProps.errors });
  }

  // Handle field updates (called in the render method)
  update(field) {
    return e =>
      this.setState({
        [field]: e.currentTarget.value
      });
  }

  handleDemoUser(e) {
    e.preventDefault();
    let user = {
      email: "demo@demo.demo",
      password: "password"
    };
    this.props.login(user);
  }


  // Handle form submission
  handleSubmit(e) {
    e.preventDefault();

    let user = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.login(user);
  }

  parseInputEmail(e) {
    if (this.state.clickEmail) {
      return <div className="input-text-clicked">Email:</div>;
    } else if (this.state.email.length > 0) {
      return <div className="input-text-clicked">Email:</div>;
    } else {
      return <div className="input-text">Email:</div>;
    }
  }

  clickEmail(e) {
    if (this.state.clickEmail) {
      this.setState({ clickEmail: false });
    } else {
      this.setState({ clickEmail: true });
    }
  }

  parseInputPassword(e) {
    if (this.state.clickPw) {
      return <div className="input-text-clicked">Password:</div>;
    } else if (this.state.password.length > 0) {
      return <div className="input-text-clicked">Password:</div>;
    } else {
      return <div className="input-text">Password:</div>;
    }
  }

  clickPw() {
    if (this.state.clickPw) {
      this.setState({ clickPw: false });
    } else {
      this.setState({ clickPw: true });
    }
  }

  // Render the session errors if there are any
  // renderErrors() {
  //   if (Object.keys(this.state.errors).length > 0) {
  //     this.setState({ errorFlag: true })
  //   } else if (Object.keys(this.state.errors).length < 1) {
  //     this.setState({ errorFlag: false })
  //   }

    // return (
    //   <ul className="errors-list">
    //     {Object.keys(this.state.errors).map((error, i) => (
    //       <li className="errors-item" key={`error-${i}`}>
    //         {this.state.errors[error]}
    //       </li>
    //     ))}
    //   </ul>
    // );
  // }

  checkErrors() {
    if (Object.keys(this.state.errors).length > 0) {
      return "input-box2 error-box"
    } else {
      return "input-box2"
    }
  }

  render() {
    let error;

    return (
      <div className="to-flex-row-center login-bg">
        <div className="login-form-container login-fix">
          <h1 className="logo-signin">Log In</h1>
          <div className="linebreak pad-bot"></div>
          <form onSubmit={this.handleSubmit}>
            <div className="login-form-form">
              <div className={this.checkErrors()}>
                <label htmlFor="input-email">{this.parseInputEmail()}</label>
                <input
                  id="input-email"
                  type="text"
                  value={this.state.email}
                  onChange={this.update("email")}
                  placeholder=""
                  onClick={this.clickEmail}
                  onBlur={this.clickEmail}
                />
              </div>
              <div className={this.checkErrors()}>
                <label htmlFor="input-password">
                  {this.parseInputPassword()}
                </label>
                <input
                  id="input-password"
                  type="password"
                  onClick={this.clickPw}
                  onBlur={this.clickPw}
                  value={this.state.password}
                  onChange={this.update("password")}
                  placeholder=""
                />
              </div>

              {/* <div className="input-box2 floating-label-wrap">
                <input
                  type="text"
                  className="floating-label-field floating-label-field--s3"
                  id="field-1"
                  placeholder="Test"
                />
                <label for="field-1" className="floating-label">
                  Test
                </label>
              </div> */}

              {/* {this.renderErrors()} */}
              <button className="demo-input">
                <div className="pointer">Log In</div>
              </button>

              <div className="linebreak"></div>
              <button className="demo-input" onClick={this.handleDemoUser}>
                <div>Login as Demo User</div>
              </button>
              <div className="linebreak"></div>
              <Link to={`/signup`}>
              <div className="demo-input">
                <div className="to-flex-button">
                    <div>Sign Up</div><div><i className="fas fa-caret-square-right"></i></div>
                  </div>
              </div>
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(LoginForm);
