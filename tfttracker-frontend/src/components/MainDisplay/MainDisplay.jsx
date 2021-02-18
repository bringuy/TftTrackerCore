//imports
import React from "react";
import { useEffect, useState } from "react";
//child components
import EnemyIcon from "../EnemyIcon/EnemyIcon";
import EnemyList from "../EnemyList/EnemyList";
//npm
import { css } from "@emotion/core";
import { BarLoader } from "react-spinners";
import { useBeforeunload } from "react-beforeunload";
//react-bootstrap css
import { Button, Container, Row, Col } from "react-bootstrap";
import "react-bootstrap/dist/react-bootstrap.min.js";
import "./MainDisplay.css";
//images
import restartLogo from "../../images/Restart-Logo.png";
const axios = require("axios").default;

const MainDisplay = ({ changePage, username }) => {
  const [local_url, setLocal_url] = useState("http://127.0.0.1:8000/");

  //for spinner
  const override = css`
    position: absolute;
    width: 15vw;
    height: 2vh;
    margin-top: 11%;
  `;

  const [isLoading, setIsLoading] = useState(false);
  const [selectButton, setSelectButton] = useState(0); //Load appropriate button
  const [selectButtonText, setSelectButtonText] = useState([
    "Initalize",
    "Find Enemy",
    "Update Enemies",
  ]);

  //Variables to pass between api calls
  const [enemyPlayed, setEnemyPlayed] = useState("");
  const [enemyTracker, setEnemyTracker] = useState([]);
  //this is returned from updateSidebarPlayers, will use to display 1-4 enemies to watchout for
  const [enemiesToWatch, setEnemiesToWatch] = useState([]);

  //Alert when refreshing page
  useBeforeunload((event) => event.preventDefault);

  const selectButtonFunction = () => {
    switch (selectButton) {
      case 0:
        initalizeEnemies();
        setSelectButton(1);
        break;
      case 1:
        findEnemy();
        setSelectButton(2);
        break;
      case 2:
        updateEnemies();
        setSelectButton(1);
        break;
    }
  };

  const initalizeEnemies = () => {
    setIsLoading(true);
    axios
      .get(local_url + "enemies/sidebar/", {
        params: JSON.stringify({
          username: username,
        }),
      })
      .then(function (response) {
        // handle success
        setEnemiesToWatch(response.data.enemies);
        setIsLoading(false);
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  const findEnemy = () => {
    setIsLoading(true);
    axios
      .get(local_url + "enemies/gameboard/", {
        params: JSON.stringify({
          username: username,
        }),
      })
      .then(function (response) {
        console.log(response);
        setEnemyPlayed(response.data.enemyPlayed);
        setIsLoading(false);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  const updateEnemyManual = (enemyName) => {
    setEnemyPlayed(enemyName);
    setSelectButton(1);
    selectButtonFunction();
  };

  const updateEnemies = () => {
    setIsLoading(true);
    axios
      .get(local_url + "enemies/update/", {
        params: JSON.stringify({
          enemyPlayed: enemyPlayed,
          enemyTracker: enemyTracker,
          username: username,
        }),
      })
      .then(function (response) {
        setIsLoading(false);
        console.log(response);
        setEnemyTracker(response.data.playingOrder);
        setEnemiesToWatch(response.data.enemies);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  const restartGame = () => {
    setIsLoading(true);
    axios
      .get(local_url + "enemies/restart/", {
        /* Parameter to send */
      })
      .then(function (response) {
        setIsLoading(false);
        setEnemyTracker([]);
        setEnemiesToWatch([]);
        setSelectButton(0);
        console.log(response.data.message);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="app-container">
      {
        //Top Container
      }
      <Container fluid>
        <Row>
          <Col md={{ span: 4, offset: 4 }} sm={{span:4, offset: 4}} xs={{span:4, offset: 4}}>
            {
              //Up Next!
              <div className="subtitle1">Up Next!</div>
            }
          </Col>
          <Col md={{ span: 2, offset: 2 }} sm={{span:2, offset: 2}} xs={{span:2, offset: 2}}>
            {
              //Restart
              <Container style={{'margin-top':'8%'}}>
                <Row>
                  <Col>
                    <img
                      src={restartLogo}
                      className="restart-logo"
                      onClick={restartGame}
                    />
                  </Col>
                </Row>
              </Container>
            }
          </Col>
        </Row>
      </Container>
      <div className="warning-container">
        {enemiesToWatch &&
          enemiesToWatch.map((enemy) => <EnemyIcon enemy={enemy} />)}
      </div>
      {
        //Bottom Container
      }
      <Container fluid>
        <Row>
          <Col md={{ span: 3 }} sm={{ span: 3 }} xs={{ span:3 }} style={{'margin-left':'1vw'}}>
            {
              //Recently Played List
              <div className="played-container">
                <div className="subtitle2">Recently Played</div>
                {enemyTracker &&
                  enemyTracker.map((enemy) => (
                    <EnemyList enemy={enemy} findEnemy={() => void 0} />
                  ))}
              </div>
            }
          </Col>
          <Col md={{ span: 2, offset: 2 }} sm={{ span: 2, offset: 2 }} xs={{ span: 2, offset: 2 }}>
            {
              //Api Call Button and Loader
            }
            {!isLoading ? (
                <Button
                  variant="light"
                  size="lg"
                  className="button-text"
                  as='div'
                  onClick={() => selectButtonFunction()}
                >
                  {selectButtonText[selectButton]}
                </Button>
            ) : (
              <BarLoader color="white" height={30} width={300} css={override} />
            )}
          </Col>
          <Col md={{ span: 2, offset: 2 }} sm={{ span: 2, offset: 2 }} xs={{ span: 2, offset: 2 }}>
            {
              //Choose Enemy List
              <div className="choose-clone-container">
                <div className="subtitle2">Choose Player</div>
                {enemiesToWatch &&
                  enemiesToWatch.map((enemy) => (
                    <EnemyList
                      enemy={enemy.username}
                      findEnemy={updateEnemyManual}
                    />
                  ))}
              </div>
            }
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MainDisplay;
