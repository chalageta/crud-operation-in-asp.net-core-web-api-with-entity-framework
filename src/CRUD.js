import React, { Fragment, useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CRUD = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [fname, setFName] = useState("");
  const [mname, setMName] = useState("");
  const [lname, setLName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [fnameError, setFnameError] = useState("");
  const [mnameError, setMnameError] = useState("");
  const [lnameError, setLnameError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const handlefNameChange = (e) => {
    setFName(e.target.value);
  };
  const handlemNameChange = (e) => {
    setMName(e.target.value);
  };

  const [editid, setEditId] = useState("");
  const [editfname, setEditFName] = useState("");
  const [editmname, setEditMName] = useState("");
  const [editlname, setEeditLName] = useState("");
  const [editgender, setEditGender] = useState("");
  const [editemail, setEeditEmail] = useState("");
  const [editphone, setEditPhone] = useState("");

  const [btnDisabled, setBtnDisabled] = useState(true);
  const [message, setMessage] = useState("");

  const [data, setData] = useState([]);

  useEffect(() => {
    const ValidateForm = () => {
      let isValid = true;
      if (fname.length <= 3) {
        setFnameError("First name is required");
        isValid = false;
      } else {
        setFnameError(""); // Clear the error message if valid
      }
      if (mname.length <= 3) {
        setMnameError("middle name is required");
        isValid = false;
      } else {
        setMnameError("");
      }
      setBtnDisabled(!isValid);
    };
    ValidateForm();
    getData();
  }, [fname, mname]);

  const getData = () => {
    axios
      .get("https://localhost:7078/api/Student")
      .then((result) => {
        setData(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSave = () => {
    const url = "https://localhost:7078/api/Student";
    const data = {
      first_name: fname,
      middle_name: mname,
      last_name: lname,
      gender: gender,
      email: email,
      phone: phone,
    };
    axios
      .post(url, data)
      .then((result) => {
        getData();
        clear();
        toast.success("Student has been added");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const clear = () => {
    setFName("");
    setMName("");
    setLName("");
    setGender("");
    setEmail("");
    setPhone("");

    setEditFName("");
    setEditMName("");
    setEeditLName("");
    setGender("");
    setEeditEmail("");
    setEditPhone("");
    setEditId("");
  };

  const handleEdit = (id) => {
    handleShow();
    axios
      .get(`https://localhost:7078/api/Student/${id}`)
      .then((result) => {
        setEditFName(result.data.first_name);
        setEditMName(result.data.middle_name);
        setEeditLName(result.data.last_name);
        setEditGender(result.data.gender);
        setEeditEmail(result.data.email);
        setEditPhone(result.data.phone);
        setEditId(id);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      axios
        .delete(`https://localhost:7078/api/Student/${id}`)
        .then((result) => {
          if (result.status === 200) {
            toast.success("Student has been deleted");
            getData(); // Refresh the list after successful deletion
          }
        })
        .catch((error) => {
          console.error("Error during deletion:", error); // Detailed logging
          toast.error("Failed to delete student: ");
        });
    }
  };

  const handleUpdate = (id) => {
    const url = `https://localhost:7078/api/Student/${editid}`;
    const data = {
      id: editid,
      first_name: editfname,
      middle_name: editmname,
      last_name: editlname,
      gender: editgender,
      email: editemail,
      phone: editphone,
    };
    axios
      .put(url, data)
      .then((result) => {
        handleClose();
        getData();
        clear();

        toast.success("Student has been updated");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  return (
    <Fragment>
      <ToastContainer />
      <h1 className="center">Student Information</h1>
      <Container>
        <Row>
          <Col>
            <label className="label">First Name</label>
            <input
              type="text"
              name="First_Name"
              className="form-control"
              onChange={handlefNameChange}
              placeholder="enter First Name"
              value={fname}
            />
            {fnameError && <p style={{ color: "red" }}>{fnameError}</p>}
          </Col>
          <Col>
            {" "}
            <Form.Label>Middle Name</Form.Label>
            <input
              type="text"
              name="Middle_Name"
              id=""
              className="form-control"
              onChange={handlemNameChange}
              value={mname}
              placeholder="enter Middle Name"
            />
            {mnameError && <p style={{ color: "red" }}>{mnameError}</p>}
          </Col>
          <Col>
            <Form.Label>Last Name</Form.Label>
            <input
              type="text"
              name="Last_Name"
              id=""
              className="form-control"
              onChange={(e) => setLName(e.target.value)}
              value={lname}
              placeholder="enter Last Name"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Label>Gender</Form.Label>
            <select
              className="form-select"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </Col>
          <Col>
            <Form.Label>Email</Form.Label>
            <input
              type="email"
              name="Email"
              id=""
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="enter email"
            />
            {fnameError && <div className="message">{fnameError}</div>}
          </Col>
          <Col>
            <Form.Label>Phone</Form.Label>
            <input
              type="text"
              name="Phone"
              id=""
              className="form-control"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              placeholder="enter Phone"
            />
          </Col>
        </Row>
        <br></br>
        <Row>
          {" "}
          <Col>
            <button
              className="btn btn-primary"
              onClick={() => handleSave()}
              disabled={btnDisabled}
            >
              Add
            </button>{" "}
            &nbsp;
            <button className="btn btn-secondary" onClick={() => clear()}>
              Clear
            </button>
          </Col>
        </Row>
      </Container>
      <br></br>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Middle Name</th>
            <th>Last Name</th>
            <th>Gender</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((item, index) => {
              return (
                <tr key={item.Id}>
                  <td>{index + 1}</td>
                  <td>{item.first_name}</td>
                  <td>{item.middle_name}</td>
                  <td>{item.last_name}</td>
                  <td>{item.gender}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td colSpan={2}>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleEdit(item.id)}
                    >
                      Update
                    </button>{" "}
                    &nbsp;
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(item.id)}
                    >
                      Dellete
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="8">Loading...</td>
            </tr>
          )}
        </tbody>
      </Table>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modify / Update Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <label className="label">First Name</label>
              <input
                type="text"
                name="First_Name"
                className="form-control"
                onChange={(e) => setEditFName(e.target.value)}
                placeholder="enter First Name"
                value={editfname}
              />
            </Col>
            <Col>
              {" "}
              <Form.Label>Middle Name</Form.Label>
              <input
                type="text"
                name="Middle_Name"
                id=""
                className="form-control"
                onChange={(e) => setEditMName(e.target.value)}
                value={editmname}
                placeholder="enter Middle Name"
              />
            </Col>
            <Col>
              <Form.Label>Last Name</Form.Label>
              <input
                type="text"
                name="Last_Name"
                id=""
                className="form-control"
                onChange={(e) => setEeditLName(e.target.value)}
                value={editlname}
                placeholder="enter Last Name"
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Gender</Form.Label>
              <input
                type="text"
                name="Gender"
                id=""
                className="form-control"
                onChange={(e) => setEditGender(e.target.value)}
                value={editgender}
                placeholder="enter Gender"
              />
            </Col>
            <Col>
              <Form.Label>Email</Form.Label>
              <input
                type="email"
                name="Email"
                id=""
                className="form-control"
                onChange={(e) => setEeditEmail(e.target.value)}
                value={editemail}
                placeholder="enter email"
              />
            </Col>
            <Col>
              <Form.Label>Phone</Form.Label>
              <input
                type="text"
                name="Phone"
                id=""
                className="form-control"
                onChange={(e) => setEditPhone(e.target.value)}
                value={editphone}
                placeholder="enter Phone"
              />
            </Col>
          </Row>
          <br></br>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default CRUD;
