import React, { Component } from 'react';
// import PropTypes from 'prop-types'
import * as RecordsAPI from '../utils/RecordsAPI'

export default class Record extends Component {

  constructor(props ){
    super(props)

    console.log(`this`,this)
    this.state={

      edit:false
    
    }

  }




  handeleToEdit(){
    console.log('this:fn :', this)
    this.setState({
      edit:!this.state.edit
    })
  }




  handeleUpdae(event){
    event.preventDefault();

    const record={
      date:this.refs.date.value,
      title:this.refs.title.value,
      amount:Number.parseInt(this.refs.amount.value),
    }

    console.log('record :', record);

    RecordsAPI.update(this.props.recode.id,record)
    .then((res)=> { this.setState({ edit: false});
      this.props.handeleRecodUpdate(this.props.recode, res.data)
    })
    .catch((err)=>console.log('err :', err.message))
  }


  handeleToDelect(event){
    event.preventDefault();

    RecordsAPI.delectRecode(this.props.recode.id,)
    .then(res=>  this.props.handeleDelectdUpdateState(this.props.recode))
    .catch(e=>console.log('e :', e.message))

  }

  recordRow(){
    return (
      
      <tr >
        <td>{this.props.recode.date } </td>
        <td>{this.props.recode.title }</td>
        <td>{this.props.recode.amount }</td>
        <td>
          <button className="btn btn-info mr-1" onClick={()=>this.handeleToEdit() }>Edit</button>
          <button className="btn btn-danger "onClick={this.handeleToDelect.bind(this)} >Delect</button>

        </td>
      </tr>  



    );

  }



  recodeEdit(){

    return(
      
      <tr >
        <td><input type="text" className="form-control"   defaultValue={this.props.recode.date} ref="date" /> </td>
        <td><input type="text"  className="form-control"  defaultValue={this.props.recode.title } ref="title" /></td>
        <td><input type="text"  className="form-control"  defaultValue={this.props.recode.amount } ref="amount" /></td>
        <td>
          <button className="btn btn-info mr-1"onClick={(event)=>this.handeleUpdae(event)} >Update</button>
          <button className="btn btn-danger " onClick={()=>this.handeleToEdit()} >Cancel</button>

        </td>
      </tr>  
    )
  }

  render() {
    
      if(this.state.edit){

        return this.recodeEdit()

      }else{
        return this.recordRow()   
      }
    
  }

  // Record.propType ={
  //   id:
  // }
  
}


