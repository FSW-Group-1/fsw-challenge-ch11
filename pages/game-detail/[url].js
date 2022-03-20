import React, { Component, useEffect, useState } from "react"
import { useRouter } from "next/router";
import Layout  from '../components/layout';
import LoadingAnimation from '../components/loadingAnimation_1'

import { Container, Row, Col} from 'react-bootstrap'
import Image from 'next/image'
import Link from 'next/link'

import styles from '../../styles/GameDetail.module.css'

import axios from 'axios'

const GameDetail = () => {
    const router = useRouter()
    const { url } = router.query
    let gameUrl = 'https://fsw-challenge-ch10-api-dev.herokuapp.com/api/gamedetail/'
    gameUrl = gameUrl + url

    const [data, setData] = useState()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if(isLoading) {
            try {
                const config = {
                  headers: {
                      authorization: `${localStorage.getItem('accessToken')}`,
                  },
                }
                axios.get(gameUrl, config)
                  .then(res => {
                    setData(res.data.data)
                    setIsLoading(false)
                })
          
              } catch (error) {
                console.log(error)
                setIsLoading({
                  isLoading: false
                })
            }
        }
    })

    const loadingContent = () => {
        return (
            <LoadingAnimation />
        )
    }

    const content = () => {
        let imagePath_ = "/../public/assets/game-card-img/"
        if(!data.imageLink) {
            data.imageLink = "dummy.png"
        }    
        imagePath_ = imagePath_ + data.imageLink
        
        let gameLink = data.gameLink
        let buttonLabel = ''
        let buttonClass = ''
        if(data.gameLink) {
            buttonLabel = 'PLAY NOW'
            buttonClass = "btn main-button btn-warning mt-3"
        } else {
            gameLink = '#'
            buttonLabel = 'Coming Soon ...'
            buttonClass = "btn main-button btn-secondary"
        }
        return (
            <>
                <h1 className="">{data.name}</h1>
                <Row className="justify-content-center">
                    <Col md={5}>
                        <Image
                            alt="Game thumbnail"
                            src={data.imageLink}
                            width={500}
                            height={250}
                            objectFit="fit"
                            quality={100}
                        />
                    </Col>   
                    <Col md={5}>
                        <Row>
                            <Col>
                                <p>{data.description}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <a href={ gameLink } className={buttonClass} id='text-main-button'  style={
                                    {
                                        whiteSpace: 'nowrap',
                                        fontWeight: 'bold'
                                    }
                                }>
                                   { buttonLabel }  
                                </a>
                            </Col>
                        </Row>
                    </Col>   
                </Row>    
            </>
        )
    }

    return(
        <>
            <Layout>
                    <Container className={styles.header} fluid>
                        <div className='pt-3 pb-3'>
                            <Container>
                                { isLoading ?  loadingContent() : content()}
                                {/* <h1>{data.name}</h1> */}
                            </Container>
                        </div>
                    </Container>
            </Layout>
        </>
    )
}

export default GameDetail