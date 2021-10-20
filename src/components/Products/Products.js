import React from "react";
import { Grid, Input, Table } from "semantic-ui-react";

// Redux
import { connect } from "react-redux";
import Product from "./Product/Product";
import {
  fetchProduct
} from "../../redux/Shopping/shopping-actions";

class Products extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      search: '',
      categoryOptions: [],
      selectedCategory: '',
    };
  }

  componentDidMount() {
    fetch('https://muigrocery.free.beeceptor.com/groceries')
    .then(response => response.json())
    .then(json => {
      let products = json.products.map(function(el) {
        let ob = Object.assign({}, el);
        ob.qty = 0;
        return ob;
      })
      this.props.fetchProduct(products)
    })
  }

  searchTbleRow(event) {
    let searchValue = event.target.value;
    this.setState({ search: searchValue });
  }
  filtrTableRow(e) {
    let selectedVal = e.target.value;
    this.setState({ selectedCategory: selectedVal });
  };
   
   render() {
     // Table filter by Search
    let sProducts = this.props.products || [],
    searchString = this.state.search.trim().toLowerCase();
    if(this.state.selectedCategory) {
      sProducts = sProducts.filter((e) => e.type.toLowerCase().match(this.state.selectedCategory));
    }
    if (searchString.length > 0) {
      sProducts = sProducts.filter((e) => e.name.toLowerCase().match(searchString));
    }
    // Table filter by dropdown
    const categoryName = this.props.products.map(item => item.type);
    this.state.categoryOptions = categoryName.filter((c,index) => categoryName.indexOf(c) === index);
    
  return (
    <>
    <Grid>
      <Grid.Column width={4}>
        <Input icon='search' placeholder='Search by name' onChange={(e) => this.searchTbleRow(e)} style={{width: "100%"}} />
      </Grid.Column>
      <Grid.Column width={4}>
        <div className="ui icon input" style={{width: "100%"}}>
          <select className="filter-select" onChange={(e) => this.filtrTableRow(e)} style={{textTransform:"capitalize"}}>
            <option kay='selectAll' value="">Select category</option>
            {this.state.categoryOptions.map((item) => {
              return <option key={item} value={item} style={{textTransform:"capitalize"}}>{item}</option>;
            })}
          </select>
        </div>
      </Grid.Column>
    </Grid>
      
    <Table celled padded>
      <Table.Header>
      <Table.Row>
          <Table.HeaderCell singleLine>Name</Table.HeaderCell>
          <Table.HeaderCell>Category</Table.HeaderCell>
          <Table.HeaderCell>Price</Table.HeaderCell>
          <Table.HeaderCell>Add/Remove Item</Table.HeaderCell>
      </Table.Row>
      </Table.Header>
      <Table.Body>
        {sProducts.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </Table.Body>
    </Table>
    </>
  );
};
}

const mapStateToProps = (state) => {
  return {
    products: state.shop.products,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProduct: (data) => dispatch(fetchProduct(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
