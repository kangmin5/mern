import {
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Badge,
  Form,
  Dropdown,
  DropdownButton,
  Button,
  InputGroup,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";

const HeaderComponent = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand href="/">CORESTONE ONLINE SHOP</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <InputGroup>
              <DropdownButton id="dropdown-basic-button" title="All">
                <Dropdown.Item>Computers</Dropdown.Item>
                <Dropdown.Item>Books</Dropdown.Item>
                <Dropdown.Item>Cars</Dropdown.Item>
                <Dropdown.Item>Lands</Dropdown.Item>
              </DropdownButton>
              <Form.Control type="text" placeholder="모델,상품명,종류..." />
              <Button variant="warning">
                <i className="bi bi-search"></i>
              </Button>
            </InputGroup>
          </Nav>
          <Nav>
            <LinkContainer to="/admin/orders">
              <Nav.Link>
                Admin
                <span
                  className=" position-absolute top-1 start-10 translate-middle p-2
                 bg-danger border border-light rounded-circle "
                ></span>
              </Nav.Link>
            </LinkContainer>

            <NavDropdown title="홍 길동" id="collasible-nav-dropdown">
              <NavDropdown.Item
                as={Link}
                eventKey="/user/my-orders"
                to="/user/my-orders"
              >
                구입내역
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} eventKey="/user" to="/user">
                프로필
              </NavDropdown.Item>
              <NavDropdown.Item>로그아웃</NavDropdown.Item>
            </NavDropdown>
            <LinkContainer to="/login">
              <Nav.Link>로그인</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/register">
              <Nav.Link>회원가입</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/cart">
              <Nav.Link>
                <Badge pill bg="danger">
                  2
                </Badge>
                <i className="bi bi-cart-dash"></i>
                <span className="ms-1">CART</span>
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default HeaderComponent;
