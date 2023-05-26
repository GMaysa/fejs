import React, { useEffect } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/reducers/auth";
import { getProfile } from "../redux/actions/auth";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoggedin, token, user } = useSelector((state) => state.auth);

  useEffect(()=>{
    if(isLoggedin && token) dispatch(getProfile())
  }, [dispatch, isLoggedin, token])

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Auth App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to={"/posts"}>
              Posts
            </Nav.Link>
          </Nav>
          <Nav>
            {!!isLoggedin ? (
              // console.log(isLoggedin)
              <>
                <Nav.Link as={Link} to={"/user/dashboard"}>
                  Dashboard ({user?.name})
                </Nav.Link>
                <Nav.Link onClick={() => dispatch(logout(navigate))}>
                  Logout
                </Nav.Link>
              </>
            ) : (
              // console.log(isLoggedin)
              <>
                <Nav.Link as={Link} to={"/login"}>
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to={"/register"}>
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
