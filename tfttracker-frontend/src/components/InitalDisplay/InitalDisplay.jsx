import { React, useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { BarLoader } from "react-spinners";
import "./InitialDisplay.css";
const axios = require("axios").default;

const InitalDisplay = ({ changePage }) => {
  const [username, setUsername] = useState("");
  const [resolution, setResolution] = useState("");
  const [local_url, setLocal_url] = useState("http://localhost:3000/");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setUsername(username.replace(/\s/g, ""));
    setIsLoading(true);
    axios
      .get(local_url + "users/save/", {
        params: JSON.stringify({
          username: username,
          resolution: resolution,
        }),
      })
      .then(function (response) {
        console.log(response);
        setIsLoading(false);
        changePage(1, username);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  return (
    <div className="app-container">
      <div className="init-subtitle1">TFGRINDER</div>
      {isLoading ? (
        <BarLoader />
      ) : (
        <Form className="init-form" onSubmit={(e) => handleSubmit(e)}>
          <Row>
            <Col>
              <Form.Control
                as="textarea"
                size="lg"
                rows={1}
                maxlength="16"
                placeholder="Enter Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Col>
            <Col>
              <Form.Control
                size="lg"
                as="select"
                value={resolution}
                onChange={(e) => setResolution(e.target.value)}
              >
                <option>Screen Resolution</option>
                <option>1920x1080</option>
                <option>2560x1440</option>
              </Form.Control>
            </Col>
          </Row>
          <Button
            variant="light"
            size="lg"
            type="submit"
            className="init-submit"
          >
            Submit
          </Button>
        </Form>
      )}
    </div>
  );
};

export default InitalDisplay;
