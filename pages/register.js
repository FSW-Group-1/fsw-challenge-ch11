import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { Form, FormGroup, Label, Input, Container, Col} from 'reactstrap';
import { connect } from "react-redux";

import Layout from './components/layout'
import userAction from "../redux/action/userAction";
import Router from 'next/router';
import LoadingAnimation from './components/loadingAnimation_1'


class Register extends Component{
  
  constructor(props){
      super(props);

      this.state ={};
  }

  set = name => event => {
      this.setState({[name]: event.target.value});
  }

  handleSubmit = async(event) => {
    const { email, password, passwordConfirm, agreeStatement, username}  = this.state;
    const dataUser = {
      email,
      password,
      username
    }
    event.preventDefault();
     if(!email || !password || !username) return alert('Please insert missing credentials!')
     if(password !== passwordConfirm) return alert('Password did not match!')
     if(!agreeStatement) return alert('Please agree with the terms to continue!')
    await this.props.registerUser(dataUser)
    Router.push('/login')

}
    render(){
      if(this.props.auth.loggedIn == true){
        Router.push('/')
      }
      return (
        <>
        <Layout title="Register">
          <Col xs={8} sm={12} md={12} className="text-center pt-sm-5 pt-xl-5">
              <h1>SIGN UP</h1>                       
          </Col>
          <Container>
          <Form inline onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label
              for="exampleName"
              hidden
            >
              Your Name
            </Label>
            <Input
              id="exampleName"
              name="name"
              placeholder="Your Name"
              type="text"
              onChange={this.set('username')}
            />
          </FormGroup>
          {' '}
            <FormGroup>
              <Label
                for="exampleEmail"
                hidden
              >
                Your Email
              </Label>
              <Input
                id="exampleEmail"
                name="email"
                placeholder="Your Email"
                type="email"
                onChange={this.set('email')}
              />
            </FormGroup>
            {' '}
            <FormGroup>
              <Label
                for="examplePassword"
                hidden
              >
                Your Password
              </Label>
              <Input
                name="password"
                placeholder="Your Password"
                onChange={this.set('password')}
                type="password"
              />
              </FormGroup>
              {' '}
            <FormGroup>
              <Label
                for="examplePassword"
                hidden
              >
                Retype Your Password
              </Label>
              <Input
                name="retype-password"
                placeholder="Retype Your Password"
                type="password"
                onChange={this.set('passwordConfirm')}
              />
            </FormGroup>
            {' '}
            <FormGroup check>
              <Input
                id="exampleCheck"
                name="check"
                type="checkbox"
                value={true}
                onChange={this.set('agreeStatement')}

              />
              <Label
                check
                for="exampleCheck"
              >
                I Agree all statements in <a href="#!">Terms of service</a>
              </Label>
            </FormGroup>
            {' '}
            <Button className='btn-success'>
            { this.props.auth.isLoading == true ? <LoadingAnimation /> :  <span>Register!</span>}
            </Button>
          </Form>
          </Container>
          </Layout>
        </>
  );
}
}


export default connect(
  state => state,
  userAction
)(Register); 