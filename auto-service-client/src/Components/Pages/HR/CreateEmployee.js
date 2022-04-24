import React from 'react'
import {
    FormGroup,
    Form,
  Label,
  Input,
  Button,
  FormText
} from "reactstrap";
import "./CreateEmployee.scss";

function CreateEmployee() {

  return (
    <>
      <div className ='ForHeading'>
          <h1>Create a new Employee</h1>
      </div>
      <div className='CreatePage'>
      <Form>
    <FormGroup>
    <Label for="fullName">
      FullName
    </Label>
    <Input
      id="fullName"
      name="fullname"
      placeholder="Fullname"
      type="text"
    />
  </FormGroup>
  <FormGroup>
    <Label for="exampleNumber">
      Phone Number
    </Label>
    <Input
      id="exampleNumber"
      name="number"
      placeholder="number placeholder"
      type="number"
    />
  </FormGroup>
  <FormGroup>
    <Label for="exampleDate">
      BirthDate
    </Label>
    <Input
      id="exampleDate"
      name="date"
      placeholder="date placeholder"
      type="date"
    />
  </FormGroup>
  <FormGroup>
    <Label for="baseSalary">
      Base Salary
    </Label>
    <Input
      id="baseSalary"
      name="number"
      placeholder="Base Salary"
      type="number"
    />
  </FormGroup>
  <FormGroup>
    <Label for="exampleSelect">
      Select Position
    </Label>
    <Input
      id="exampleSelect"
      name="select"
      type="select"
    >
      <option>
        1
      </option>
    </Input>
  </FormGroup>
  <FormGroup>
    <Label for="location">
      Location
    </Label>
    <Input
      id="location"
      name="location"
      placeholder="Location"
      type="text"
    />
  </FormGroup>
  <FormGroup>
    <Label for="education">
      Education Level
    </Label>
    <Input
      id="education"
      name="education"
      placeholder="Education"
      type="text"
    />
  </FormGroup>
  <FormGroup>
    <Label for="exampleText">
      Personal Detail
    </Label>
    <Input
      id="exampleText"
      name="text"
      type="textarea"
    />
  </FormGroup>
  <FormGroup>
    <Label for="exampleFile">
      Photo
    </Label>
    <Input
      id="exampleFile"
      name="file"
      type="file"
    />
    <FormText>
      This is some placeholder block-level help text for the above input. It's a bit lighter and easily wraps to a new line.
    </FormText>
  </FormGroup>
  <Button>
    Submit
  </Button>
</Form>
      </div>
    </>

  )
}

export default CreateEmployee