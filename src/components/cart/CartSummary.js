import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, NavItem, NavLink, Badge } from "reactstrap";
import * as cartActions from "../../redux/actions/cartActions";
import { Link } from "react-router-dom";
import alertify from "alertifyjs";

class CartSummary extends Component {
  removeFromCart(product) {
    this.props.action.removeFromCart(product);
    alertify.error(product.productName + "Removed From Cart");
  }

  renderEmpty() {
    return (
      <NavItem>
        <NavLink>Cart is Empty</NavLink>
      </NavItem>
    );
  }

  renderSummary() {
    return (
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret>
          Cart
        </DropdownToggle>
        <DropdownMenu end>
          {this.props.cart.map(cartItem => (
            <DropdownItem toggle={false} key={cartItem.product.id}>
              <Badge pill color="danger" onClick={() => this.removeFromCart(cartItem.product)}>
                X
              </Badge>
              {cartItem.product.productName}
              <Badge pill color="success">
                {cartItem.quantity}
              </Badge>
            </DropdownItem>
          ))}
          <DropdownItem divider />
          <DropdownItem>
            <Link to={"/cart"}>See Your Cart</Link>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  }

  render() {
    return <div>{this.props.cart.length > 0 ? this.renderSummary() : this.renderEmpty()}</div>;
  }
}

function mapDispatchToProps(dispatch) {
  return {
    action: {
      removeFromCart: bindActionCreators(cartActions.removeFromCart, dispatch)
    }
  };
}

function mapStateToProps(state) {
  return {
    cart: state.cartReducer
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CartSummary);
