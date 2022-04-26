import React from 'react'
import {
Table,
Button
} from "reactstrap";
import Service from '../Service/Service';
import "./Registration.scss";
import { useHistory } from "react-router-dom";
import { customerService } from '../../../Api/services/Customers';


function Registration() {

  const [customer, setCustomer] = React.useState([]);
  const history = useHistory();

  React.useEffect(() => {
    customerService.getAllCustomers().then(({ data }) => {
      setCustomer(data);
    });
  }, []);

  return (
    <>
<div className ='ForHeading'>
    <h1>Registration</h1>
</div>
<div className='AddingAndSearching'>
  <div className='Adding'>
<Button>Create Customer</Button>
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
          Customer Name
        </th>
        <th>
          Service 
        </th>
        <th>
          Actions
        </th>
      </tr>
    </thead>
    <tbody>
    {customer?.map((item, idx) => (
              <tr key={idx}>
                <th scope="row">{idx}</th>
                <td>{item.fullName}</td>
                <td>{item.Service}</td>
                <td className="Actions">
                  <Button className="Edit">Edit</Button>
                  <Button className="Delete">Delete</Button>
                  <Button className="Detail">Detail</Button>
                </td>
              </tr>
            ))}
    </tbody>
    </Table>
</div>
</>

  )
}

export default Registration