import React, { Component } from 'react'
import ProductRow from './ProductRow'

class ProductTable extends Component {
    handleDestroy =(id) => {
        this.props.onDestroy(id)
    }
    
    updateParent(value) {
        this.props.updateGrandparent(value);
    }

    render () {

        let productsArray = Object.keys(this.props.products).map((pid) => this.props.products[pid])
        let rows = [];
        productsArray.forEach((product) => {
            if (product.name.indexOf(this.props.filterText) === -1) {
                return
            }
            rows.push (
                <ProductRow 
                    product={product} 
                    key={product.id} 
                    updateParent={this.updateParent.bind(this)} 
                    onDestroy={this.handleDestroy}></ProductRow>
            )
        })

        return (
            <div>
                <table className="table table-striped table-sm">
                    <thead className="thead-dark">
                        <tr>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>InStock</th>
                            <th>&nbsp;Update</th>
                            <th>&nbsp;Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ProductTable