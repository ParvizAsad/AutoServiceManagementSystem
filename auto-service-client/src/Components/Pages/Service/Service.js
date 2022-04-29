import React from 'react'
import {
Table,
Button
} from "reactstrap";
import { serviceService } from '../../../Api/services/Services';
import "./Service.scss";
import { useHistory } from "react-router-dom";


function Service() {

  const [service, setService] = React.useState([]);
  const history = useHistory();

  React.useEffect(() => {
    serviceService.getAllServices().then(({ data }) => {
      setService(data);
      
    });
  }, []);
  return (
    <>
    <div className ='ForHeading'>
    <h1>Services</h1>
    </div>
<div className='AddingAndSearching'>
  <div className='Adding'>
<Button>Add Service</Button>
  </div>
  <input type="text" placeholder="Search.."/>
</div>
<div>
    <Table className='TableForItems'>
    <thead>
      <tr>
        <th>
          #
        </th>
        <th>
          Name
        </th>
        <th>
          Detail
        </th>
        <th>
          Price
        </th>
        <th>
          Actions
        </th>
      </tr>
    </thead>
    <tbody>
    {service?.map((item, idx) => (
              <tr key={idx}>
                <th scope="row">{idx}</th>
                <td>{item.Name}</td>
                <td>{item.Price}</td>
                <td>{item.Detail}</td>
                <td className="Actions">
                  <Button className="Edit">Edit</Button>
                  <Button className="Delete">Delete</Button>
                </td>
              </tr>
            ))}
    </tbody>
    </Table>
</div>
</>

  )
}

export default Service