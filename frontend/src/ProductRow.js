import React, { Component } from 'react'

class ProductRow extends Component {
    destroy = (productId) => {
        this.props.onDestroy(this.props.product.id);
    }

    handleClick() {
        this.props.updateParent(this.props.product);
    }

    render () {
        return (
            <tr>
                <td>{this.props.product.name}</td>
                <td>{this.props.product.category}</td>
                <td>${this.props.product.price}</td>
                <td>{this.props.product.instock}</td>
                <td ><button onClick={this.handleClick.bind(this)} className="btn btn-info">Update</button></td>
                <td><button onClick={() => this.destroy(this.props.product.id)} className="btn btn-info">Delete</button></td>
            </tr>
        )
    }
}

export default ProductRow