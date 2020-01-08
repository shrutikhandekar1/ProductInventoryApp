import React, { Component } from 'react'
import Filters from './Filters'
import ProductTable from './ProductTable'
import ProductForm from './ProductForm'


// let PRODUCTS = {
//     '1': {id: 1, category: 'Music', price: '$459.99', name: 'Clarinet', instock: true},
//     '2': {id: 2, category: 'Music', price: '$5,000', name: 'Cello', instock: true},
//     '3': {id: 3, category: 'Music', price: '$3,500', name: 'Tuba', instock: true},
//     '4': {id: 4, category: 'Furniture', price: '$799', name: 'Chaise Lounge', instock: true},
//     '5': {id: 5, category: 'Furniture', price: '$1,300', name: 'Dining Table', instock: true},
//     '6': {id: 6, category: 'Furniture', price: '$100', name: 'Bean Bag', instock: true}
// };

class Products extends Component {
    constructor(props) {
        super(props)
        this.state = {
            filterText: '',
            products: '',
            productToBeUpdated: ''
        }
        this.handleFilter = this.handleFilter.bind(this)
        this.handleDestroy = this.handleDestroy.bind(this)
        //this.handleUpdate = this.handleUpdate.bind(this)
        this.loadData = this.loadData.bind(this)

    }

    updateGrandparent(value){
        this.setState({productToBeUpdated: value});
    }

    handleDestroy = async (productId) => {
        try {
            const response = await fetch('http://localhost:5000/products/delete/' + productId, {
                method: 'DELETE',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                id: productId
                })
            });
    
            const responseData = await response.json();
            console.log(responseData);

            //Remove row from table
            const index = this.state.products.findIndex(product => {
                return product.id === productId;
            });
            console.log(index);
             let copyProducts = [...this.state.products];
             copyProducts.splice(index,1);
  
             this.setState({products:copyProducts});

            } catch (err) {
            console.log(err);
            }
        }
        
    componentDidMount() {
        this.loadData();
    }


    loadData () {
        fetch('http://localhost:5000/products/get')
            .then((resp) => resp.json())
            .then((data) => {
                  let newProductArray = [];
                data.map(p => {
                    let {product,_id,} = p; //destructure object 
                    product.id = _id;
                    newProductArray.push(product); //make array of product objects
                    this.setState({products: newProductArray});
                    return null;
                })
                })
            .catch((err) => {
            console.log(err)
            })
            .catch(function(err) {
                console.log('Fetch Error :-S', err);
            });
       }

    handleFilter(filterInput) {
        this.setState(filterInput)
    }

    handleSave = async event => {
        //console.log( this.state.product.category, this.state.product.instock);
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/products/create', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                product: {
                            category: this.state.product.category,
                            price: this.state.product.price,
                            name: this.state.product.name,
                            instock: this.state.product.instock
                        }
              })

            });
    
            const responseData = await response.json();
            console.log(responseData);

            fetch('http://localhost:5000/products/get')
            .then((resp) => resp.json())
            .then((data) => {
                  let newProductArray = [];
                data.map(p => {
                    let {product,_id,} = p; //destructure object 
                    product.id = _id;
                    newProductArray.push(product); //make array of product objects
                    return null;
                })
                this.props.updateTable();
                })
            .catch((err) => {
            console.log(err)
            })
            .catch(function(err) {
                console.log('Fetch Error :-S', err);
            });
          } catch (err) {
            console.log(err);
          }
        }
          


    render () {
        return (
            <div>
                <h1>Product Inventory</h1>
                <Filters 
                    onFilter={this.handleFilter}></Filters>
                <ProductTable 
                    products={this.state.products}
                    filterText={this.state.filterText}
                    onDestroy ={this.handleDestroy}
                    updateGrandparent={this.updateGrandparent.bind(this)} 
                    >
                    </ProductTable>
                <ProductForm
                    loadTable={this.loadData}
                    updateRow={this.state.productToBeUpdated}
                ></ProductForm>
            </div>
        )
    }
}

export default Products