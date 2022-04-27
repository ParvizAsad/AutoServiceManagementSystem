import React from 'react'
import {
  Table,
  Button
  } from "reactstrap";
import { financeService } from '../../../../Api/services/Finances';
import { useHistory } from "react-router-dom";

function Accounting() {

  const [finance, setFinance] = React.useState([]);
  const history = useHistory();

  React.useEffect(() => {
    financeService.getAllFinances().then(({ data }) => {
      setFinance(data);
    });
  }, []);

  return (
    <>
    <div className ='ForHeading'>
    <h1>Accounting</h1>
    </div>
    <div className='AddingAndSearching'>
      <div className='Adding'>
      <Button onClick={() => history.push("/createaccounting")} >Create a new Financial Line</Button>
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
              Communal Cost
            </th>
            <th>
              Additional Cost
            </th>
            <th>
              Date
            </th>
            <th>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
        {finance?.map((item, idx) => (
              <tr key={idx}>
                <th scope="row">{idx}</th>
                <td>{item.CommunalCost}</td>
                <td>{item.AdditionalCost}</td>
                <td>{item.Date}</td>
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

export default Accounting