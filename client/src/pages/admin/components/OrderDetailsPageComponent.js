import { useEffect, useState } from "react";
import { 
    Container,
    Row,
    Col,
    Form,
    Alert,
    ListGroup,
    Button,
} from "react-bootstrap";
import { useParams } from "react-router-dom"
import axios from "axios";
import CartItemComponent from "../../../components/CartItemComponent";

const OrderDetailsPageComponent = ({ getOrder,markAsDelivered }) => {
    const { id } = useParams();

    const [userInfo, setUserInfo] = useState({})
    const [paymentMethod, setPaymentMethod] = useState("")
    const [isPaid, setIsPaid] = useState(false)
    const [isDelivered, setIsDelivered] = useState(false)
    const [cartSubtotal, setCartSubtotal] = useState(0)
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [orderButtonMessage, setOrderButtonMessage] = useState('배달 상태 표시')
    const [cartItems, setCartItems] = useState([])

    useEffect(() => {
        const getOrder = async (id) => {
            const { data } = await axios.get("/api/orders/user/" + id)
            return data
        }
        getOrder(id)
            .then((order) => {
                setUserInfo(order.user)
                setPaymentMethod(order.paymentMethod)
                order.isPaid ? setIsPaid(order.paidAt) : setIsPaid(false)
                order.isDelivered ? setIsDelivered(order.deliveredAt) : setIsDelivered(false)
                setCartSubtotal(order.orderTotal.cartSubtotal)
                if (order.isDelivered) {
                    setOrderButtonMessage("주문이 완료되었습니다.")
                    setButtonDisabled(true)
                }
                setCartItems(order.cartItems)
            })
            .catch(err => console.log((err.response.data.message) ? err.response.data.message : err.response.data))
    }, [isDelivered,id])

    return (
        <Container fluid>
            <Row className="mt-4">
                <h1>Order Details</h1>
                <Col md={8}>
                    <br />
                    <Row>
                        <Col md={6}>
                            <h2>Shipping</h2>
                            <b>Name</b>: {userInfo.name}<br />
                            <b>Address</b>: {userInfo.address}{userInfo.city}{userInfo.country}{userInfo.zipCode} <br />
                            <b>Phone</b>: {userInfo.phoneNumber}
                        </Col>
                        <Col md={6}>
                            <h2>Payment method</h2>
                            <Form.Select value={paymentMethod} disabled={true}>
                                <option value="pp">PayPal</option>
                                <option value="cod">
                                    Cash On Delivery (delivery may be delayed)
                                </option>
                            </Form.Select>
                        </Col>
                        <Row>
                            <Col md={6}>
                                <Alert className="mt-3" variant={isDelivered ? "success" : "danger"}>
                                    {isDelivered ? (<>Delivered at {isDelivered}</>) : (<>Not Deivered </>)}
                                </Alert>
                            </Col>
                            <Col md={6}>
                                <Alert className="mt-3" variant={isPaid ? "success": "danger"}>
                                    {isPaid ? <>Paid on {isPaid}</> : <>Not paid yet</>}        
                                </Alert>
                            </Col>
                        </Row>
                    </Row>
                    <br />
                    <h2>Order items</h2>
                    <ListGroup variant="flush">
                        {cartItems.map((item, idx) => (
                            <CartItemComponent key={idx} item={item} orderCreated={true} />
                        ))}
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <ListGroup>
                        <ListGroup.Item>
                            <h3>Order summary</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Items price (after tax): <span className="fw-bold">${cartSubtotal}</span>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Shipping: <span className="fw-bold">included</span>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Tax: <span className="fw-bold">included</span>
                        </ListGroup.Item>
                        <ListGroup.Item className="text-danger">
                            Total price: <span className="fw-bold">${cartSubtotal}</span>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <div className="d-grid gap-2">
                                <Button 
                                    size="lg" 
                                    onClick={
                                        ()=> markAsDelivered(id)
                                        .then((res)=>{
                                            setIsDelivered(true)
                                        })
                                        .catch(err => console.log(err.response.data.message ? err.response.data.message : err.response.data))
                                    }
                                    disabled={buttonDisabled} 
                                    variant="danger" 
                                    type="button"
                                >
                                    {orderButtonMessage}
                                </Button>
                            </div>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
};

export default OrderDetailsPageComponent;

