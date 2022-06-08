import React from "react";
import { Table, Button } from "reactstrap";
import ".././HR.scss";
import { employeeService } from "../../../../Api/services/Employee";
import { useState, useCallback, useRef } from "react";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { useReactToPrint } from "react-to-print";

function ExportEmployee() {
  const [employee, setEmployee] = React.useState([]);
  const [employeeData, setEmployeeData] = useState();

  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = (apiData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(apiData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  React.useEffect(() => {
    employeeService.getAllEmployee().then(({ data }) => {
      setEmployee(data);
    });
  }, []);

  const tableRef = useRef(null);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <div className="ForHeading">
        <h1>Human Resourses</h1>
      </div>
      <Button onClick={(e) => exportToCSV(employee, "Employee")}>
        {" "}
        Export excel{" "}
      </Button>

      <button onClick={handlePrint}>Print</button>
      {/* <button onClick={handlePrint}>Print</button> */}
      <div ref={componentRef}>
        <Table className="TableForItems" id="table-to-xls">
          <thead>
            <tr>
              <th>#</th>
              <th>FullName</th>
              <th>Position</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {employee?.map((item, idx) => (
              <tr key={idx}>
                <th scope="row">{idx}</th>
                <td>{item.fullName}</td>
                <td>{item.Position}</td>
                <td>{item.Status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default ExportEmployee;
