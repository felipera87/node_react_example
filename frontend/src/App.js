import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Container, Row, Col, Nav, Tab } from "react-bootstrap";

import RequestComponent from "./requestComponent";
import config from "./config";

function App() {
  const requestOptions = [
    {
      type: "showUsers",
      label: "Show All Users",
      url: `${config.backendUrl}/users`,
      method: "get",
    },
    {
      type: "storeUser",
      label: "Store User",
      url: `${config.backendUrl}/users`,
      method: "post",
    },
    {
      type: "updateUser",
      label: "Update User",
      url: `${config.backendUrl}/users`,
      method: "put",
    },
    {
      type: "indexUser",
      label: "Show One user",
      url: `${config.backendUrl}/users`,
      method: "get",
    },
    {
      type: "deleteUser",
      label: "Delete User",
      url: `${config.backendUrl}/users`,
      method: "delete",
    },
  ];
  return (
    <Container fluid>
      <Row>
        <Col className="p-3">
          <Tab.Container defaultActiveKey={requestOptions[0].type}>
            <Row>
              <Col md={3} sm={12}>
                <Nav variant="pills" className="flex-column">
                  {requestOptions.map((option, index) => {
                    return (
                      <Nav.Item key={`mainPanelOptions_${index}`}>
                        <Nav.Link eventKey={option.type}>
                          {option.label}
                        </Nav.Link>
                      </Nav.Item>
                    );
                  })}
                </Nav>
              </Col>
              <Col md={9} sm={12}>
                <Tab.Content>
                  {requestOptions.map((option, index) => {
                    return (
                      <Tab.Pane
                        eventKey={option.type}
                        key={`mainPanelContent_${index}`}
                      >
                        <RequestComponent
                          requestOption={option}
                        ></RequestComponent>
                      </Tab.Pane>
                    );
                  })}
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
