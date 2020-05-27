import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Container,
  Breadcrumb,
  BreadcrumbItem,
  Modal,
  Button,
  ModalBody,
  Row,
  Label,
  Col,
} from "reactstrap";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from "react-redux-form";

const maxLength = (length) => (val) => !val || val.length <= length;
const minLength = (length) => (val) => val && val.length >= length;

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggle = this.toggle.bind(this);

  }

  handleSubmit(values) {
    console.log("Current State is: " + JSON.stringify(values));
    alert("Current State is: " + JSON.stringify(values));
  }

  toggle = () => this.setState({open: !this.state.open});

  render() {
    return (
      <>
      <Button onClick={this.toggle}>Comment</Button>
      <Modal isOpen={this.state.open} toggle={this.toggle}>
        <div>
          <p>this has stuff in it</p>
          <Button onClick={this.toggle} className="btn-danger">Close</Button>
        </div>
        {/* <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
          <Row className="form-group">
            <Label htmlFor="rating" md={2}>Rating</Label>
            <Col md={10}>
              <Control.select>

              </Control.select>
            </Col>
          </Row>
        </LocalForm> */}
      </Modal>
      </>
    );
  }
}

const RenderDish = ({ dish }) => {
  if (dish !== undefined) {
    console.log(dish);
    return (
      <Card>
        <CardImg width="100%" src={dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    );
  } else {
    return (
      <div className="row">
        <div></div>
      </div>
    );
  }
};

const RenderComments = ({ comments }) => {
  if (comments !== undefined) {
    const items = comments.map((i) => {
      return (
        <li key={i.id}>
          {i.comment}
          <br />
          <br />
          --{i.author}, <Moment format="MMM DD, YYYY">{i.date}</Moment>
          <br />
          <br />
        </li>
      );
    });
    return (
      <div>
        <h4>Comments</h4>
        <ul className="list-unstyled">{items}</ul>
      </div>
    );
  } else {
    return <div></div>;
  }
};

const DishDetail = (props) => {
  if (props.dish != null) {
    return (
      <Container>
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/home">Home</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link to="/menu">Menu</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
          <h3>{props.dish.name}</h3>
          <hr />
        </div>
        <div className="row">
          <div className="col-12 col-md-5 m-1">
            <RenderDish dish={props.dish} />
          </div>
          <div className="col-12 col-md-5 m-1">
            <RenderComments comments={props.comments} />
          </div>
          <CommentForm />
        </div>
      </Container>
    );
  } else {
    return <div></div>;
  }
};

export default DishDetail;
