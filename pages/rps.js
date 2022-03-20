import React, { useState, useEffect } from 'react'
import styles from '../styles/rps.module.css'
import privateAuth from "../Auth/privateAuth";
import { connect } from "react-redux";
import userAction from "../redux/action/userAction";
import { Row, Col } from 'reactstrap'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import Image from 'next/image'
import Router from 'next/router'
import Link from 'next/link'
//icon
import Paper from '../public/images/icon-paper.svg'
import Rock from '../public/images/icon-rock.svg'
import Scissors from '../public/images/icon-scissors.svg'
import Refresh from '../public/images/refresh.png'
import Layout  from './components/layout'

const RPS = (props) => {
  const [userChoice, setUserChoice] = useState(null)
  const [computerChoice, setComputerChoice] = useState(null)
  const [result, setResult] = useState(null)
  const [indexResult, setIndexResult] = useState(null)
  const [stringResult, setStringResult] = useState([])
  const [numofWinUser, setnumofWinUser] = useState(0)
  const [numofWinComp, setnumofWinComp] = useState(0)
  const [finalResult, setFinalResult] = useState(null)

  const [totalWin, setTotalWin] = useState(0)
  const [totalLose, setTotalLose] = useState(0)
  const [totalDraw, setTotalDraw] = useState(0)
  const [totalPlay, setTotalPlay] = useState(0)
  
  const choices = [
    {
      name: 'rock',
      border: 'blue',
      icon: Rock,
    },
    {
      name: 'scissors',
      border: 'red',
      icon: Scissors,
    },
    {
      name: 'paper',
      border: 'yellow',
      icon: Paper,
    },
  ]

  const handleClick = (value) => {
    setUserChoice(value)
    generateComputerChoice()
  }

  const generateComputerChoice = () => {
    const randomChoice = choices[Math.floor(Math.random() * choices.length)].name
    setComputerChoice(randomChoice)
  }

  
  
  useEffect(() => {
    checkResult()
  }, [userChoice, computerChoice])

  const checkResult = () => {

    switch (userChoice + computerChoice) {
      case 'scissorspaper':
      case 'rockscissors':
      case 'paperrock':
        setResult('YOU WIN!')
        setnumofWinUser(numofWinUser + 1)
        setStringResult((old) => [...old, 'win'])
        break
      case 'paperscissors':
      case 'scissorsrock':
      case 'rockpaper':
        setResult('YOU LOSE!')
        setnumofWinComp(numofWinComp + 1)
        setStringResult((old) => [...old, 'lose'])

        break
      case 'rockrock':
      case 'paperpaper':
      case 'scissorsscissors':
        setResult(`IT'S A DRAW!`)
        setStringResult((old) => [...old, 'draw'])
        break
    }
    const indexOfResult = choices.findIndex((i) => i.name == computerChoice)
    setIndexResult(indexOfResult)
  }

  function imageComp() {
    if(indexResult == null || indexResult ==  -1){
      return(<div>Loading...</div>)
    }else{
      return(<Image src={choices[indexResult].icon} alt='halo'/>)
    }
  }
  

  // Modal State
  const [modal, setModal] = useState(false)
  // Toggle for Modal
  const toggle = () => setModal(!modal)

  useEffect(() => {
    if (stringResult.length == 3) {
      checkFinalResult()
    }
  }, [stringResult])

  const checkFinalResult = async() => {
    const counts = {}
    stringResult.forEach(function (x) {
      counts[x] = (counts[x] || 0) + 1
    })

    setTotalPlay(totalPlay + 1)

    if (numofWinUser == numofWinComp) {
      setFinalResult('Draw')
      setTotalDraw(totalDraw + 1)

    } else if (numofWinUser > numofWinComp) {
      setFinalResult('Win')
      setTotalWin(totalWin + 1)
      await props.updateScore({
        gameID: 1,
        point: 1,
      })
    } else if (numofWinUser < numofWinComp) {
      setFinalResult('Lose')
      setTotalLose(totalLose + 1)
    }
    setModal(true)
  }

  const reset = () => {
    setComputerChoice(null)
    setUserChoice(null)
    setResult(null)
    setIndexResult(null)
  }

  const resetRound = () => {
    setStringResult([])
    setnumofWinComp(0)
    setnumofWinUser(0)
    setFinalResult(null)
    toggle()
    reset()
  }

  return (
    <Layout title='Rock-Paper-Scissor'> 
     <div className={`${styles.playgame} mt-5`}>
      <div className="pt-3">
        <div className={`${styles.cardinfo} d-flex justify-content-between`}>
          <h3>Rock Paper Scissors</h3>
          <div className={`text-center ${styles.cardscore} d-flex justify-content-center align-items-center`}>
            <h5 style={{ marginRight: '10px' }}>Win</h5>
            <h3 className="font-weight-bold" style={{ fontSize: '40px' }}>
              {totalWin}
            </h3>
          </div>
          <div className={`text-center ${styles.cardscore} d-flex justify-content-center align-items-center`}>
            <h5 style={{ marginRight: '10px' }}>Lose</h5>
            <h3 className="font-weight-bold" style={{ fontSize: '40px' }}>
              {totalLose}
            </h3>
          </div>
          <div className={`text-center ${styles.cardscore} d-flex justify-content-center align-items-center`}>
            <h5 style={{ marginRight: '10px' }}>Draw</h5>
            <h3 className="font-weight-bold" style={{ fontSize: '40px' }}>
              {totalDraw}
            </h3>
          </div>
          <div className={`text-center ${styles.cardscore} d-flex justify-content-center align-items-center`}>
            <h5 style={{ marginRight: '10px' }}>Play</h5>
            <h3 className="font-weight-bold" style={{ fontSize: '40px' }}>
              {totalPlay}
            </h3>
          </div>
        </div>

        <div className={`${styles.gameplay}`}>
          <Row cols="12">
            <Col cols="4">
              {choices.map((choice) => (
                <div className="mt-4" key={choice.name}>
                  <div
                    className={`${styles.btngame} d-flex justify-content-center align-items-center`}
                    style={{ border: `10px solid ${choice.border}` }}
                    onClick={() => {
                      handleClick(choice.name)
                    }}
                  >
                    <Image src={choice.icon} alt="halo" />
                  </div>
                </div>
              ))}
            </Col>
            <Col cols="4" className="d-flex justify-content-center align-items-center">
              <div className="text-center mt-5">
                {computerChoice && (
                  <div className="bg-success py-2 px-3" style={{ borderRadius: '10px' }}>
                    <h2 style={{ color: 'white' }}>{result}</h2>
                  </div>
                )}
                <div style={{ marginTop: '50px' }} className="reset" onClick={reset}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="white" className="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z" />
                    <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
                  </svg>
                </div>
              </div>
            </Col>
            <Col cols="4" className="d-flex justify-content-end align-items-center">
              <div className="mt-4">
                <div className={`${styles.btngame} d-flex justify-content-center align-items-center ${styles.btngamecomputer}`} style={{ border: `10px solid green` }}>
                  {/* {computerChoice ? <Image src={choices[indexResult].icon} alt="halo" /> : <div>Loading...</div>} */}
                  {imageComp()}
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Hasil Permainan</ModalHeader>
        <ModalBody>Hasil : {finalResult}</ModalBody>
        <ModalFooter>
            <Link href='/'  className='link-light'>
              <a className='btn btn=secondary'>
                Selesai
              </a>
            </Link> 
          <Button color="primary" onClick={resetRound}>
            Lanjut Lagi
          </Button>
        </ModalFooter>
      </Modal>
    </div>
    </Layout>

    
  )
}

export default connect(
  state => state,
  userAction
)(privateAuth(RPS))
