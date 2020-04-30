import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Container,
} from "reactstrap";
import Moment from "react-moment";

const RenderDish = ({ dish }) => {
  if (dish !== undefined) {
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
  if (comments !== null) {
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
        <div className="row">
          <div className="col-12 col-md-5 m-1">
            <RenderDish dish={props.dish} />
          </div>
          <div className="col-12 col-md-5 m-1">
            <RenderComments comments={props.dish.comments} />
          </div>
        </div>
      </Container>
    );
  } else {
    return <div></div>
  }
};

export default DishDetail;
