import React from 'react'
import {
  Table,
  Button
  } from "reactstrap";
import { discountService} from '../../../../Api/services/Discount';
import { useHistory } from "react-router-dom";

function Marketing() {

  const [disocunt, setDiscount] = React.useState([]);
  const history = useHistory();

  React.useEffect(() => {
    discountService.getAllDiscounts().then(({ data }) => {
      setDiscount(data);
    });
  }, []);

  return (
    <>
    <div className ='ForHeading'>
    <h1>Marketing</h1>
    </div>
    <div className='AddingAndSearching'>
      <div className='Adding'>
      <Button onClick={() => history.push("/creatediscount")} >Create a new Discount</Button>
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
              Percentage
            </th>
            <th>
              Expire Date
            </th>
            <th>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
        {disocunt?.map((item, idx) => (
              <tr key={idx}>
                <th scope="row">{idx}</th>
                <td>{item.Name}</td>
                <td>{item.Percetnage}</td>
                <td>{item.ExpireDate}</td>
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

export default Marketing