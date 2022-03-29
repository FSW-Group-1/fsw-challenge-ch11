import React, { Component } from 'react'
import { Card, Container, ListGroup, ListGroupItem } from 'react-bootstrap'
import Layout from './components/layout'

import axios from 'axios'
class ProfileList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: true,
      data: {},
    }
  }

  componentDidMount() {
    axios.get(`https://fsw-challenge-ch10-api-dev.herokuapp.com/api/users`).then((res) => {
      console.log(res)
      this.setState({
        data: res.data.data,
      })
    })
  }

  get listOfUsers() {
    const { data } = this.state
    return (
      <div>
        <div className="row text-center">
          {Object.keys(data).map(function (name, index) {
            return (
              <Card style={{ width: '18rem' }} key={index} className="m-3">
                <Card.Img
                  variant="top"
                  style={{ width: '100%', height: '15vw', objectFit: 'contain' }}
                  src={data[name].imageLink}
                  className="rounded-3 img-thumbnail"
                />
                <Card.Title>{data[name].username}</Card.Title>
                <Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroupItem>Description: {data[name].description}</ListGroupItem>
                    <ListGroupItem>Point: {data[name].point}</ListGroupItem>
                  </ListGroup>
                </Card.Body>
              </Card>
            )
          })}
        </div>
      </div>
    )
  }

  Loader() {
    return <h3>Loading...</h3>
  }

  render() {
    const { data } = this.state
    return (
      <Layout>
        <div>
          <div className="row text-center justify-content-center mt-5">
            {Object.keys(data).map(function (name, index) {
              return (
                <Card style={{ width: '18rem' }} key={index} className="m-3">
                  <a href={`user/${data[name].id}`}>
                    <Card.Img
                      variant="top"
                      style={{ width: '100%', height: '15vw', objectFit: 'contain' }}
                      src={data[name].imageLink}
                      className="rounded-3 img-thumbnail"
                    />
                    <Card.Title>{data[name].username}</Card.Title>
                    <Card.Body>
                      <ListGroup className="list-group-flush">
                        <ListGroupItem>Description: {data[name].description}</ListGroupItem>
                        <ListGroupItem>Point: {data[name].point}</ListGroupItem>
                      </ListGroup>
                    </Card.Body>
                  </a>
                </Card>
              )
            })}
          </div>
        </div>
      </Layout>
    )
  }
}

export default ProfileList
