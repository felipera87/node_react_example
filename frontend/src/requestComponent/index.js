import React, { Component } from "react";
import axios from "axios";
import { Button, Form, Alert } from "react-bootstrap";
import "./requestComponent.css";

import RequestFormComponent from "../requestFormComponent";

class RequestComponent extends Component {
  constructor(props) {
    super(props);

    this.inputId = new React.createRef();

    this.state = {
      response: undefined,
      id: "",
      url: props.requestOption.url,
      responseError: "",
      body: undefined,
    };
  }

  makeRequest = async () => {
    try {
      const response = await axios({
        method: this.props.requestOption.method,
        url: this.state.url,
        data: this.state.body,
      });

      if (response.status === 200) {
        const { data } = response;
        this.setState({ response: data, responseError: "" });
      }
    } catch (e) {
      this.setState({
        response: undefined,
        responseError: `Request error: ${e.response.data.error}`,
      });
    }
  };

  handleIdChange = async () => {
    const { url } = this.props.requestOption;
    const id = this.inputId.current.value;
    await this.setState({ id, url: `${url}/${id}` });
  };

  handleForm = (formReference) => {
    const numberOfInputs = formReference.current.length;
    let body = numberOfInputs > 0 ? {} : undefined;

    for (let i = 0; i < numberOfInputs; i++) {
      const field = formReference.current[i];
      body[field.name] = field.value;
    }

    this.setState({ body });
  };

  requestRequiresId = () => {
    const typesThatRequireId = ["updateUser", "indexUser", "deleteUser"];
    const { type } = this.props.requestOption;

    return typesThatRequireId.indexOf(type) >= 0;
  };

  requestRequiresBody = () => {
    const typesThatRequireBody = ["storeUser", "updateUser"];
    const { type } = this.props.requestOption;

    return typesThatRequireBody.indexOf(type) >= 0;
  };

  render() {
    const { label, method } = this.props.requestOption;

    return (
      <div>
        <h1>{label}</h1>
        <hr></hr>
        <div hidden={!this.requestRequiresId()}>
          <Form.Control
            ref={this.inputId}
            onChange={this.handleIdChange}
            type="text"
          />
        </div>
        <div className="mb-2"></div>
        <h3>
          Request ({method.toUpperCase()}):{" "}
          <span className="backendUrl">{this.state.url}</span>{" "}
          <Button variant="primary" onClick={this.makeRequest}>
            Send!
          </Button>
        </h3>

        {this.state.responseError ? (
          <Alert variant="danger">{this.state.responseError}</Alert>
        ) : null}

        <div hidden={!this.requestRequiresBody()}>
          <RequestFormComponent
            handleForm={this.handleForm}
          ></RequestFormComponent>
        </div>
        <hr></hr>
        <pre>
          <code>{JSON.stringify(this.state.response, null, 4)}</code>
        </pre>
      </div>
    );
  }
}

export default RequestComponent;
