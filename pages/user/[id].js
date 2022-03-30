import React, { Component, useEffect, useState } from 'react'
import { Card, Col, Row, Container, Form, Button, Modal, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'react-bootstrap'
import Layout from '../components/layout'
import { useRouter } from 'next/router'
import style from '../../styles/Profile.module.css'
import Image from 'next/image'
import { connect } from 'react-redux'
import profileAction from '../../redux/action/profileAction'

function DetailUser(props) {
  const router = useRouter()
  const { id } = router.query
  const [data, setDataFetch] = useState()
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    props.getOtherUser(id)
  }, [])


useEffect(() => {
    setDataFetch(props.profile.data)
    setLoading(props.profile.isLoading)
}, props.profile.data)

  if (loading || !data) return <div> Loading... </div>

  function showImage() {
    if (!data.imageLink) {
      return <Image alt='image' width={300} height={150} objectFit="fit" quality={100} src={"/_next/static/media/dummy.75d624b0.png"} className="img-thumbnail" />
    } else {
      return (
        <Card.Img
          variant="top"
          style={{ width: '100%', height: '20vw', objectFit: 'contain' }}
          src={data.imageLink}
          alt="game"
          className="rounded-3 img-thumbnail"
        />
      )
    }
  }
 
  return (
    <div>
      <Layout title="Profile">
        <div className={style.container}>
          <div className={`${style.card} text-center`}>
            <div>{showImage()}</div>
            <div className="mt-4">
              <h4 className="mb-0">{data.username}</h4>
              <button className={`btn btn-primary btn-sm mt-2 ${style.follow}`}>{data.email}</button>
              <p className="my-2">{data.description}</p>
              <div className="d-flex justify-content-between align-items-center mt-5 px-4">
                <div className={style.stats}>
                  <h6 className="mb-0">Game Played</h6> {data.Details && <span>{data.Details.length}</span>}
                </div>
                <div className={style.stats}>
                  <h6 className="mb-0">Point</h6>
                  <span>
                    {data.point == null && '0'} {data.point != null && data.point}{' '}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {data != undefined ? (
            <Row style={{ marginTop: '100px', textAlign: 'center' }}>
              <h3>Game History</h3>
              {Object.keys(data.Details).map(function (name, index) {
                return (
                  <Card style={{ width: '18rem' }} key={index} className="m-3 bg-dark p-1">
                    <Image
                      width={300}
                      height={150}
                      objectFit="fit"
                      quality={100}
                      src={data.Details[name].Game.imageLink}
                      className="img-thumbnail"
                      alt='image'
                    />
                    <span className="text-white text-center fs-3 ">{data.Details[name].Game.name}</span>
                    <span className="text-white text-center fs-6 fw-light ">Point: {data.Details[name].point}</span>
                  </Card>
                )
              })}
            </Row>
          ) : (
            <div>halo bro</div>
          )}
        </div>
      </Layout>
    </div>
  )
}

// export default DetailUser
export default connect((state => state), profileAction)(DetailUser)
