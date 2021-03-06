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
  ModalHeader,
  Row,
  Label,
} from "reactstrap";
import { FadeTransform, Fade, Stagger } from "react-animation-components";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from "react-redux-form";

import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";

const maxLength = (length) => (val) => !val || val.length <= length;
const minLength = (length) => (val) => val && val.length >= length;

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggle = this.toggle.bind(this);
  }
  toggle = () => this.setState({ open: !this.state.open });
  handleSubmit(values) {
    this.toggle();
    this.props.postComment(
      this.props.dishId,
      values.rating,
      values.author,
      values.comment
    );
  }

  render() {
    return (
      <>
        <Button onClick={this.toggle}>
          <i className="fa fa-pencil" aria-hidden="true"></i> Submit Comment
        </Button>
        <Modal isOpen={this.state.open} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <Container>
                <Row className="form-group">
                  <Label for="rating">Rating</Label>
                  <Control.select
                    model=".rating"
                    name="rating"
                    id="rating"
                    className="form-control"
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Control.select>
                </Row>
              </Container>
              <Row className="form-group">
                <Container>
                  <Label for="author">Your Name</Label>
                  <Control.text
                    model=".author"
                    name="select"
                    id="author"
                    placeholder="Your Name"
                    className="form-control"
                    validators={{
                      minLength: minLength(3),
                      maxLength: maxLength(15),
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".author"
                    show="touched"
                    messages={{
                      minLength: "Must be greater than 2 characters",
                      maxLength: "Must be 15 characters or less",
                    }}
                  />
                </Container>
              </Row>
              <Row className="form-group">
                <Container>
                  <Label for="comment">Comment</Label>
                  <Control.textarea
                    model=".comment"
                    name="comment"
                    id="comment"
                    className="form-control"
                    rows="6"
                  />
                </Container>
              </Row>
              <Button type="submit" className="btn-danger">
                Submit
              </Button>
            </LocalForm>
          </ModalBody>
        </Modal>
      </>
    );
  }
}

const RenderDish = ({ dish }) => {
  if (dish !== undefined) {
    console.log(dish);
    return (
      <FadeTransform
        in
        transformProps={{
          exitTransform: "scale(0.5) translateY(-50%)",
        }}
      >
        <Card>
          <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      </FadeTransform>
    );
  } else {
    return (
      <div className="row">
        <div></div>
      </div>
    );
  }
};

const RenderComments = ({ comments, postComment, dishId }) => {
  if (comments !== undefined) {
    const items = comments.map((i) => {
      return (
        <Fade in>
          <li key={i.id}>
            {i.comment}
            <br />
            <br />
            --{i.author}, <Moment format="MMM DD, YYYY">{i.date}</Moment>
            <br />
            <br />
          </li>
        </Fade>
      );
    });
    return (
      <div>
        <h4>Comments</h4>
        <ul className="list-unstyled">
          <Stagger in>{items}</Stagger>
        </ul>
        <CommentForm dishId={dishId} postComment={postComment} />
      </div>
    );
  } else {
    return <div></div>;
  }
};

const DishDetail = (props) => {
  if (props.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if (props.errMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{props.errMess}</h4>
        </div>
      </div>
    );
  } else if (props.dish != null) {
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
            <RenderComments
              comments={props.comments}
              postComment={props.postComment}
              dishId={props.dish.id}
            />
          </div>
        </div>
      </Container>
    );
  } else {
    return <div></div>;
  }
};

export default DishDetail;
