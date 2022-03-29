import React, { Component } from 'react'
import { Card, Container, ListGroup, ListGroupItem } from 'react-bootstrap'
import Layout from './components/layout'
import { connect } from 'react-redux'
import profileAction from '../redux/action/profileAction'
import axios from 'axios'
class ProfileList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: true,
      data: {},
    }
  }

  async componentDidMount() {
    await this.props.getAllUser();
    console.log(this.props.profile)
    if(!this.props.profile.isLoading){
      this.setState({
        data: this.props.profile.data
      })
    }
  }
  
  // componentDidUpdate(){
  //   console.log(this.props.profile)
  //   if(!this.props.profile.isLoading){
  //     this.setState({
  //       data: this.props.profile.data
  //     })
  //   }
  // }



  Loader() {
    return <h3>Loading...</h3>
  }

  render() {
    const { data } = this.state
    return (
      <Layout>
        <div>
          <div className="row text-center justify-content-center mt-5">
          {/* {console.log(this.props.profile)} */}
            {data != null ? 
              Object.keys(data).map(function (name, index) {
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
              })
            : <div> Loading</div>}
          </div>
        </div>
      </Layout>
    )
  }
}
export default connect((state) => state, profileAction)(ProfileList)


