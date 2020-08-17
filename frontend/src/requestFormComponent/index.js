import React from "react";
import { Form } from "react-bootstrap";

export default (props) => {
  const formReference = new React.createRef();
  const handleForm = props.handleForm;

  return (
    <Form ref={formReference}>
      <Form.Group controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          placeholder="Enter name"
          onChange={() => handleForm(formReference)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          name="email"
          placeholder="Enter email"
          onChange={() => handleForm(formReference)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          placeholder="Password (at least 6 characters)"
          onChange={() => handleForm(formReference)}
        />
      </Form.Group>
    </Form>
  );
};
