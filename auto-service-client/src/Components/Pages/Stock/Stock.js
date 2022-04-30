import React from 'react'
import {
Table,
Button
} from "reactstrap";
import "./Stock.scss";
import { useHistory } from "react-router-dom";
import { productService } from '../../../Api/services/Products';
function Stock() {

  const [product, setProduct] = React.useState([]);
  const history = useHistory();

  React.useEffect(() => {
    productService.getAllProducts().then(({ data }) => {
      setProduct(data);
    });
  }, []);

  return (
    <>
    <div className ='ForHeading'>
    <h1>Stock</h1>
    </div>
<div className='AddingAndSearching'>
  <div className='Adding'>
<Button onClick={() => history.push("/createproduct")}>Add Product</Button>
<Button onClick={() => history.push("/createcategory")}>Add Category</Button>
<Button onClick={() => history.push("/createbrand")}>Add Brand</Button>
<Button onClick={() => history.push("/brand")}>Brands</Button>
<Button onClick={() => history.push("/category")}>Categories</Button>

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
          Product
        </th>
        <th>
          Amount
        </th>
        <th>
          Status
        </th>
        <th>
          Actions
        </th>
      </tr>
    </thead>
    <tbody>
    {product?.map((item, idx) => (
              <tr key={idx}>
                <th scope="row">{idx}</th>
                <td>{item.Name}</td>
                <td>{item.Amount}</td>
                <td>{item.Status}</td>
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

export default Stock