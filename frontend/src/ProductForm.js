import React, { Component } from 'react';

const RESET_VALUES = {category: '', price: '', name: '', instock: false}

class ProductForm extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.handleUpdate = this.handleUpdate.bind(this)
        this.handleSave = this.handleSave.bind(this)
        
        this.state = {
            product: Object.assign({}, RESET_VALUES),
            updateRow: '',
            enableUpdateBtn: true,
            errors: {}
        }

    }
    


    handleChange(e) {
        const target = e.target
        const value = target.value
        const name = target.name
        
        this.setState((prevState) => {
            prevState.product[name] = value
            return { product: prevState.product }
        })

    }

    componentDidUpdate(prevProps, prevState) {
        //console.log('[componentDidUpdate]', prevState);
        //console.log('[componentDidUpdate2]', prevProps);
         if (this.props.updateRow !== '') {
             if (this.state.enableUpdateBtn === true){
                this.setState({enableUpdateBtn: false});
             }
            this.name.value = this.props.updateRow.name;
            this.category.value = this.props.updateRow.category;
            this.price.value = this.props.updateRow.price;
 
            if(this.props.updateRow.instock==="true") {
                this.inStockTrue.value = "true" } else {
                    this.inStockTrue.value = 1;
                }
            
            //update prevState to new values
                //if(prevState.updateRow != this.prevState)
         }
         //console.log('[componentDidUpdate After]', prevState);
         //console.log('[componentDidUpdate After]', this.state.prevState);
      }


    handleUpdate = async () => {
        console.log(this.state.product);
        try {
            const response = await fetch('http://localhost:5000/products/update/'+ this.state.product.id, {
              method: 'PATCH',
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
        }catch (err) {
            console.log(err);
            }
    } 

    handleSave = async event => {
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
                this.props.loadTable();
                this.setState({product: RESET_VALUES});
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
            <form>
                <h4>Add a new product</h4>
                <p>
                    <label>Name <br /> 
                    <input type="text" className="form-control" name="name" onChange={this.handleChange}  ref={(input)=>{this.name = input}} value={this.state.product.name} required/></label>
                </p>
                <p>
                    <label>Category <br /> 
                    <input type="text" className="form-control" name="category" onChange={this.handleChange} ref={(input)=>{this.category = input}} value={this.state.product.category} required/></label>
                </p>
                <p>
                    <label>Price <br /> 
                    <input type="text" className="form-control" name="price" onChange={this.handleChange} ref={(input)=>{this.price = input}} value={this.state.product.price} required/></label>
                </p>
                <p>Is product in Stock? </p>
                    <input type="radio"  name="instock" onChange={this.handleChange} ref={(input)=>{this.inStockTrue = input}} value="true" />True<br/>
                    <input type="radio"  name="instock" onChange={this.handleChange} ref={(input)=>{this.inStockFalse = input}} value="false" />False
                <br/>
                <button type="button" className="btn btn-info" onClick={this.handleUpdate}  disabled={this.state.enableUpdateBtn}>Update</button>
                <input type="submit" className="btn btn-info  ml-3" value="Save" onClick={this.handleSave}></input>
                
            </form>
        )
    }
}

export default ProductForm