import React, { Component } from "react";
import { Card, CardImg, CardBody,CardText, Button, Modal, ModalHeader, ModalBody,
    Label, Row, Col, CardTitle, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

function RenderDish({dish}) {

        return (
            <div className='col-12 col-md-5 m-1'>
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
}

    function RenderComments({comments}) {
        if (comments !== null){
            return (
              <div className='col-12 col-md-5 m-1'>
              <h4> Comments </h4>
              <ul className="list-unstyled">
                {comments.map ((comment) => {
                  return (
                    <li key={comment.id}>
                      <p>{comment.comment}</p>
                      <p>-- {comment.author},
                      {new Intl.DateTimeFormat('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: '2-digit'
                          }).format(new Date(comment.date))}
                      </p>
                  </li>

                  );
                })}
              </ul>
              <CommentForm>

                   </CommentForm>
            </div>
          );
        }
        else {
          return (
            <div></div>
          );
      }
    }

    const  Dishdetail = (props) => {
        const dish = props.dish
        if (dish == null) {
            return (<div></div>);
        }
        else {
          return (
              <div class= "container">
                <div className="row">
                      <Breadcrumb>
                          <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                          <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                      </Breadcrumb>
                      <div className="col-12">
                          <h3>{props.dish.name}</h3>
                          <hr />
                      </div>
                  </div>
                <div className='row'>
                    <RenderDish dish={props.dish} />
                    <RenderComments comments={props.comments} />
                </div>
              </div>
          );
    }
  }
  const required = (val) => val && val.length;
  const maxLength = (len) => (val) => !(val) || (val.length < len);
  const minLength = (len) => (val) => val && (val.length >= len);

  class CommentForm extends Component {
      constructor(props) {
          super(props);

          this.state = {
              isModelOpen: false
          }

          this.toggleModal = this.toggleModal.bind(this);
          this.handleSubmit = this.hadnleSubmit.bind(this);
      }

      toggleModal() {
          this.setState({
              isModelOpen: !this.state.isModelOpen
          });
      }

      hadnleSubmit(values) {

          this.toggleModal();

          console.log('Current state is: ' + JSON.stringify(values));
          alert('Current state is: ' + JSON.stringify(values));
      }

      render() {
          return(
              <div>
                  <Button outline onClick={this.toggleModal}>
                      <span className="fa fa-edit fa-lg"></span> Submit Comment
                  </Button>

                  <Modal isOpen={this.state.isModelOpen} toggle={this.toggleModal}>
                      <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                      <ModalBody>
                          <LocalForm onSubmit={(values) => this.hadnleSubmit(values)}>
                              <Row className="form-group">
                                  <Label for="rating" md={12}>rating</Label>
                                  <Col md={12}>
                                      <Control.select model=".rating" name="rating" className="form-control">
                                          <option>1</option>
                                          <option>2</option>
                                          <option>3</option>
                                          <option>4</option>
                                          <option>5</option>
                                      </Control.select>
                                  </Col>
                              </Row>
                              <Row className="form-group">
                                  <Label htmlFor="author" md={12}>Your Name</Label>
                                  <Col md={12}>
                                  <Control.text model=".author" id="author" name="author"
                                      placeholder="Author"
                                      className="form-control"
                                      validators={{
                                          required,
                                          minLength: minLength(2),
                                          maxLength: maxLength(15)
                                      }}
                                  />
                                  <Errors className="text-danger" model=".author" show="touched"
                                      messages={{
                                          required: 'Required',
                                          minLength: 'Should have more than 3 Characters',
                                          maxLength: 'Should have 15 or less Characters'
                                      }}
                                  />
                                  </Col>
                              </Row>
                              <Row className="form-group">
                                  <Label htmlFor="feedback" md={12}>Your feedback</Label>
                                  <Col md={12}>
                                  <Control.textarea model=".comment" id="comment" name="comment"
                                      resize="none"
                                      rows="12"
                                      className="form-control"
                                      validators={{
                                          required,
                                      }}
                                  />
                                  <Errors className="text-danger" model=".comment" show="touched"
                                      messages={{
                                          required: 'Required'
                                      }}
                                  />
                                  </Col>
                              </Row>
                              <Button type="submit" value="submit" color="primary">Submit</Button>
                          </LocalForm>
                      </ModalBody>
                  </Modal>
              </div>

          )
      }
  }

export default Dishdetail;
