import React from "react";
import {Table} from "react-bootstrap";
import {BASE_URL} from "./Constants";

class Activities extends React.Component {
    state = {"activities": []};

    componentDidMount(){
        console.log(BASE_URL)
        fetch(`${BASE_URL}/activities`).then(res => res.json()).then(res => {
            this.setState({"activities": res});
        })
    }

    render(){
        const {activities} = this.state;
        return (
            <>
            <div>All activities: </div>
                <Table striped bordered hover>
                <thead>
                    <tr>
                    <th scope="col">Name</th>
                    </tr>
                </thead>
                <tbody>
                    {activities && activities.map((activity, i) => {     
                    return (
                            <tr key={activity.id}>
                                <td><a href={`/activities/${activity.id}`}>{activity.name}</a></td>
                            </tr>
                    )
                    })
                    }
            </tbody>
        </Table>
          </>
        );
    }
}

export default Activities;