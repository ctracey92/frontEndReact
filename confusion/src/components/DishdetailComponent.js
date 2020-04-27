import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
} from "reactstrap";

class Dishdetail extends Component {

  render() {
    const renderDish = (dish) => {
      if (dish !== null) {
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

    const renderComments = (dish) => {
      if (dish !== null) {
        const items = dish.comments.map((i) => {
          return (
            <li key={i.id}>
              {i.comment}
              <br />
              <br />
              --{i.author} {i.date}
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
    
    return (
      <div className="row">
        <div className="col-12 col-md-5 m-1">{renderDish(this.props.dish)}</div>
        <div className="col-12 col-md-5 m-1">
          {renderComments(this.props.dish)}
        </div>
      </div>
    );
  }
}

export default Dishdetail;
