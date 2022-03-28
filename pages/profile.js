import React, { Component } from 'react'
import { Card, Col, Row, Container, Form, Button, Modal } from 'react-bootstrap'
import Layout from './components/layout'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import Image from 'next/image'
import axios from 'axios'
import userAction from '../redux/action/userAction'
import privateAuth from '../Auth/privateAuth'

import { connect } from 'react-redux'
import profileAction from '../redux/action/profileAction'

class Profile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      show: false,
      data: {},
      isLoading: true,
      fileInput: '',
      previewSource: '',
    }
  }

  set = (name) => (event) => {
    // console.log(event.target.value)
    this.setState({ [name]: event.target.value })
  }

  handleInputChange = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      // setPreviewSource(reader.result)
      // this.state.previewSource(reader.result)
      this.setState({
        previewSource: reader.result,
      })
    }
  }

  // previewFile = (file) => {
  //   const reader = new FileReader()
  //   reader.readAsDataURL(file)
  //   reader.onloadend = () => {
  //     // setPreviewSource(reader.result)
  //     this.state.previewSource(reader.result)
  //   }
  // }

  componentDidMount() {
    this.props.getProfile()
  }

  componentDidUpdate() {
    // console.log(this.props.profile)
    const result = this.props.profile
    console.log('result', result)
    if (!result.isLoading && this.state.isLoading) {
      this.setState({
        data: result.data,
        username: result.data.username,
        description: result.data.description,
        point: result.data.point,
        image: result.data.imageLink,
        details: result.data.Details,
        imageId: result.data.imageID,
        isLoading: false,
      })
    }
  }

  handleSubmit = async (event) => {
    const { username, description, previewSource, imageId } = this.state
    event.preventDefault()

    if (description.length > 200) {
      return alert('Your description has surpassed the maximum amount!')
    }

    if (!this.state.previewSource) {
      return
    }

    try {
      await this.props.updateUser({
        username,
        description,
        imageLink: previewSource,
        imageID: imageId,
      })

      alert('Your information has been updated!')
    } catch (err) {
      console.log(err)
    }
  }

  showDetails = () => {
    const { details } = this.state
    if (details != undefined) {
      {
        Object.keys(details).map(function (name, index) {
          // console.log(details[name].point)
          return (
            <Card style={{ width: '18rem' }} key={index} className="m-3">
              <Card.Img
                variant="top"
                style={{ width: '100%', height: '15vw', objectFit: 'contain' }}
                src={details[name].Game.imageLink}
                alt="game"
                className="rounded-3 img-thumbnail"
              />
              <Card.Title>{details[name].Game.name}</Card.Title>
              <Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroupItem>Description: {details[name].Game.description}</ListGroupItem>
                  <ListGroupItem>Point: {details[name].point}</ListGroupItem>
                </ListGroup>
              </Card.Body>
            </Card>
          )
        })
      }
    }
  }
  handleClose = () => {
    this.setState({
      show: false,
    })
  }

  handleShow = () => {
    this.setState({
      show: true,
    })
  }

  render() {
    const { details } = this.state
    // console.log(this.props.auth)
    // console.log(details)
    return (
      <Layout title="Profile">
        <div>
          <Container className="mt-5 justify-content-center">
            <h1>Your Profile</h1>
            <form onSubmit={this.handleSubmit}>
              <Row>
                <Col sm={4}>
                  <button type="button" className="border-0" onClick={this.handleShow}>
                    <Card.Img
                      style={{ width: '18rem', height: '15vw', objectFit: 'contain' }}
                      variant="top"
                      className="img-thumbnail"
                      src={this.state.image}
                    />
                  </button>
                  <br />
                  <Card style={{ width: '18rem' }}>
                    <Card.Body>
                      <Card.Title>
                        <input value={this.state.username || ''} className="border-0 form-control" onChange={this.set('username')} />
                      </Card.Title>
                      <Card.Text className="form-control border-0">point: {this.state.point}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>

                <Modal show={this.state.show} onHide={this.handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Enter image link to update your profile!</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <input type="file" className="form-control" onChange={this.handleInputChange} value={this.state.fileInput} />

                    {this.state.previewSource && (
                      <div>
                        <h6 style={{ margin: '5px 0' }}>Image Sementara</h6>
                        <img src={this.state.previewSource} width={400} height={300} />
                      </div>
                    )}
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                      Simpan Sementara
                    </Button>
                  </Modal.Footer>
                </Modal>

                <Col sm={4}>
                  <Card>
                    <Card.Body>
                      <h5>Description</h5>
                      <Card.Text>
                        <input value={this.state.description || ''} className="border-0 form-control" onChange={this.set('description')} />
                      </Card.Text>
                    </Card.Body>
                  </Card>
                  {this.props.auth.isLoading == true ? (
                    <input type="submit" value="Loading..." className=" btn btn-success" />
                  ) : (
                    <input type="submit" value="Submit" className=" btn btn-success" />
                  )}
                </Col>
              </Row>
            </form>
            <Row>
              <h3>Games Played:</h3>
              {/* {details != undefined ? this.showDetails() : <div>Loading...</div>} */}
              {details != undefined ? (
                Object.keys(details).map(function (name, index) {
                  // console.log(details[name].point)
                  let imagePath_ = '/../public/assets/game-card-img/'
                  if (!details[name].Game.imageLink) {
                    details[name].Game.imageLink = 'dummy.png'
                  }
                  // console.log(imagePath_ + details[name].Game.imageLink)
                  return (
                    <Card style={{ width: '18rem' }} key={index} className="m-3 bg-dark p-1">
                      <Image
                        width={300}
                        height={150}
                        alt="game"
                        objectFit="fit"
                        quality={100}
                        src={details[name].Game.imageLink}
                        className="img-thumbnail"
                      />
                      <span className="text-white text-center fs-3 ">{details[name].Game.name}</span>
                      <span className="text-white text-center fs-6 fw-light ">Point: {details[name].point}</span>
                    </Card>
                  )
                })
              ) : (
                <div>Loading...</div>
              )}
            </Row>
          </Container>
        </div>
      </Layout>
    )
  }
}

// export default connect((state) => state, userAction)(privateAuth(Profile))

export default connect((state) => state, profileAction)(Profile)
