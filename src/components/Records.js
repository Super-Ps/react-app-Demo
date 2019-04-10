import React, { Component } from 'react';
import Record from './Record';
// import $ from 'jquery';
//import { getJSON } from 'jquery';
// import axios from  'axios'

import * as RecordsAPI from '../utils/RecordsAPI'
import RecordFrom from './RecordFrom'

import AmountBox from './AmountBox'

export default class Records extends Component {

    constructor(props){
    super(props);

    this.updateRecod=this.updateRecod.bind(this)
    this.state={

      loading:false,
      records:[],
      error:null,

      

      
    }

  }


// componentDidMount(){
             
//   getJSON('https://5cab08d0c85e05001452e2da.mockapi.io/api/v1/records1')
//   .then((res)=>this.setState({records:res}),(err)=>{console.log('err',err.responseJSON)})


// }

componentDidMount(){

  RecordsAPI.getAll().then(res=> this.setState({
    records:res.data,
    loading:true,
  }))
  .catch(err=> this.setState({
    loading:true,
    error:err
  }))

}

addRecord( record){

    console.log('record addRecord:', record);
    console.log('THIS:', this);

    this.setState({
      loading:true,
      records:[
        ...this.state.records,   //叔祖合并
        record
      ],
      error:null
    }
    )
    
}


updateRecod(record,data){
  const recordIndex= this.state.records.indexOf(record)
  const newReacords = this.state.records.map((item,index)=>{
    if(index !==recordIndex){
        return item
    }

    return {
      ...item,
      ...data
    }


  })

  this.setState({
    records:newReacords
  })
}


delectRecod(recode){

  console.log('recode :', recode);
  const recordIndex = this.state.records.indexOf(recode)
  const newReacords= this.state.records.filter((itme,index)=> index !== recordIndex)
  this.setState({
    records:newReacords
  }
  )
}


credits() {
  let credits = this.state.records.filter((record) => {
    return record.amount >= 0;
  })

  return credits.reduce((prev, curr) => {
    return prev + Number.parseInt(curr.amount, 0)
  }, 0)
}

debits() {
  let credits = this.state.records.filter((record) => {
    return record.amount < 0;
  })

  return credits.reduce((prev, curr) => {
    return prev + Number.parseInt(curr.amount, 0)
  }, 0)
}

balance() {
  return this.credits() + this.debits();
}
    
  render() {

    let recordsComponent;

    const {loading,records,error}=this.state
    

    if(error){
      recordsComponent = <div>Error:{error.message}</div>
    }
    else if (!loading){
      recordsComponent = <div> LOADING.............</div>

    }
    else{
      recordsComponent = (
          <table className="table table-bordered">
            <thead>
              <tr> 
                <td>DATE  </td>
                <td>Tile  </td>
                <td>Amount </td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
      {records.map((recode,index)=> (
              <Record  
                  key={index} 
                  recode={recode} 
                  handeleRecodUpdate={this.updateRecod}
                  handeleDelectdUpdateState={this.delectRecod.bind(this)}
                  />) )}
            </tbody>
          </table>
         
        
      );
      
    }

    return(

      <div>
        <h2>Records</h2>
        <div className="row mb-3">
          <AmountBox text="Credit" type="success" amount={this.credits()}/>
          <AmountBox text="Debit" type="danger" amount={this.debits()}/>
          <AmountBox text="Balance" type="info" amount={this.balance()}/>
        </div>
        
        <RecordFrom  handleNewRecord={(record)=>  this.addRecord(record)}/>
        {recordsComponent}

      </div>
    )


  }
}

