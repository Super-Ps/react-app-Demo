import React, { Component } from 'react';
import * as RecordsAPI from '../utils/RecordsAPI'

export default class RecordForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "",
      title: "",
      amount: ""
    }
  }



    handleChange(event) {
        console.log(`event=${event}, event.target.name=${event.target.name}`)
        let name, obj;
        name = event.target.name;
        this.setState((
          obj = {},
          obj["" + name] = event.target.value,
          obj
        ))
        console.log(`obj`,obj)
      }
    
      valid() {
        return this.state.date && this.state.title && this.state.amount
      }

      handleSubmit(even){
        even.preventDefault()
        //   console.log(`even~~${Object.prototype.toString.call(even)}`)  [object Object]
        //  console.log(`[object Object]: ${ JSON.stringify(even)}`)

        const date={
            date:this.state.date,
            title:this.state.title,
            amount: Number.parseInt( this.state.amount,0)
        }
        
        RecordsAPI.addRecode(date)
        .then(res=> {
             this.props.handleNewRecord(res.data)
             this.setState(
                 {
                    date: "",
                    title: "",
                    amount: ""
                 })
             
        })
        .catch((error)=>console.log('err',error.message))
        

      }




    render() {
        return (
          <form className="form-inline mb-3" onSubmit={(even)=>this.handleSubmit(even)}>
            <div className="form-group mr-1">
              <input type="text" className="form-control" onChange={(even)=>this.handleChange(even)} placeholder="Date" name="date" value={this.state.date} />
            </div>
            <div className="form-group mr-1">
              <input type="text" className="form-control" onChange={(even)=>this.handleChange(even)} placeholder="Title" name="title" value={this.state.title} />
            </div>
            <div className="form-group mr-1">
              <input type="text" className="form-control" onChange={(even)=>this.handleChange(even)}  placeholder="Amount" name="amount" value={this.state.amount} />
            </div>
            <button type="submit" className="btn btn-primary" disabled={!this.valid()}>Create Record</button>
          </form>
        );
      }
    
}