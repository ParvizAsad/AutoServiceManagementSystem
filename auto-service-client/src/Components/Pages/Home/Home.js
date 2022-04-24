import React from 'react'
import {
    CardGroup,
    Card,
    CardBody,
    CardTitle,
    Button,
  } from "reactstrap";
  import "./Home.scss";
  import { useHistory, Link } from "react-router-dom";
  import { FaPeopleArrows } from 'react-icons/fa';
  import { GrUserAdmin } from 'react-icons/gr';
  import { GiDirectorChair } from 'react-icons/gi';
  import { GrMoney } from 'react-icons/gr';
  import { FaSitemap } from 'react-icons/fa';
  import { MdAppRegistration } from 'react-icons/md';

  function Home() {

  const { push } = useHistory();
  // const handleChangeDirector = React.useCallback(() => {
  //   push("/director");
  // }, [push]);

  return (
<>
<div className ='ForHeading'>
    <h1>Auto Service System Modules</h1>
</div>
<CardGroup id='moduleCards'>
         <Link to="director">
         <Card className='moduleCard'>
      <CardBody className='moduleCardBody'>
        <CardTitle tag="h5" className='moduleCardTitle'>
          Director
        </CardTitle>
        <div className="Icon">
            <GiDirectorChair/>
            </div>
        <Button>
          Enter
        </Button>
      </CardBody>
    </Card>
         </Link>
          <Link to="admin">
          <Card className='moduleCard'>
                <CardBody className='moduleCardBody'>
                  <CardTitle tag="h5"  className='moduleCardTitle'>
                    Admin
                  </CardTitle>
                  <div className="Icon">
                  <GrUserAdmin/>
                  </div>
                  <Button>
                    Enter
                  </Button>
                </CardBody>
              </Card>
          </Link>
          <Link to="hr">
          <Card className='moduleCard'>
                <CardBody className='moduleCardBody'>
                  <CardTitle tag="h5"  className='moduleCardTitle'>
                    HR
                  </CardTitle>
                  <div className="Icon">
                  <FaPeopleArrows/>
                  </div>
                  <Button>
                    Enter
                  </Button>
                </CardBody>
              </Card>
          </Link>
          <Link to="finance">
          <Card className='moduleCard'>
                <CardBody className='moduleCardBody'>
                  <CardTitle tag="h5"  className='moduleCardTitle'>
                    Finance
                  </CardTitle>
                  <div className="Icon">
                  <GrMoney/>
                  </div>
                  <Button>
                    Enter
                  </Button>
                </CardBody>
              </Card>
          </Link>
          <Link to="stock">
          <Card className='moduleCard'>
                <CardBody className='moduleCardBody'>
                  <CardTitle tag="h5"  className='moduleCardTitle'>
                    Stock
                  </CardTitle>
                  <div className="Icon">
                  <FaSitemap/>
                  </div>
                  <Button>
                    Enter
                  </Button>
                </CardBody>
              </Card>
          </Link>
          <Link to="registration">
          <Card className='moduleCard'>
                <CardBody className='moduleCardBody'>
                  <CardTitle tag="h5"  className='moduleCardTitle'>
                    Reception
                  </CardTitle>
                  <div className="Icon">
                  <MdAppRegistration/>
                  </div>
                  <Button>
                    Enter
                  </Button>
                </CardBody>
              </Card>
          </Link>
  </CardGroup>
</>
  )
}

export default Home