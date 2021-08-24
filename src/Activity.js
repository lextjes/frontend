import React from "react";
import {Table, Card, Button} from "react-bootstrap";
import {BASE_URL} from "./Constants";
import { saveAs } from 'file-saver'

class Activity extends React.Component {
    state = {"name": "", "id": "", "dates": []};

    componentDidMount(){
        const activityId = this.props.match.params.id;
        fetch(`${BASE_URL}/activities/${activityId}`)
        .then(res => res.json()).then(res => {
            if(res.status === 404){
                return this.props.history.push("/404")
            };
            return this.setState(res);
        });
    }

    render(){
        const {id, name, dates} = this.state;
        console.log(dates);
        return (
            <>
            <Table striped bordered hover>
              <thead>
                  <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Name</th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <td>{id}</td>
                      <td>{name}</td>
                  </tr>
              </tbody>
          </Table>
          {dates.map(activityDate => {
              const imageUrl = `${BASE_URL}/activities/${id}/register/${activityDate}`;
              return (
              <Card key={activityDate} style={{ width: '18rem' }}>
              <Card.Img variant="top" src={imageUrl} />
              <Card.Body>
                
                <Card.Text>
                  Date: {activityDate}
                </Card.Text>
               
               <Button href={`/activities/${id}/${activityDate}/register`}>Register here</Button>
              <Button onClick={() => saveAs(imageUrl, `register-for-${name}-${activityDate}.jpg`)}>Download</Button>
              </Card.Body>
            </Card>)
          })}
            </>
        );
    }
}

export default Activity;