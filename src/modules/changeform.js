import ChangeBack from './changeback'
import CurrencyInput from 'react-currency-input'
import React from 'react';
import '../styles/App.css';

class ChangeForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { showComponent: false, paid: 0, owe: 0}
    
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handlePaid = (event, value, maskedValue) => {
    this.setState({paid: value})
  }

  handleOwe = (event, value, maskedValue) => {
    this.setState({owe: value})
  }

  handleSubmit(event) {
    event.preventDefault()
    this.setState({ showComponent: true })
  }

  render() {
    return (
      <div className="App-header App">
        <div>
          <header>
            <p>
              Change Machine
            </p>
          </header>
        </div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Paid amount: 
            <CurrencyInput prefix="$" value={this.state.paid} onChange={this.handlePaid} />
          </label>
          <br/>
          <label>
            Owe amount:  
            <CurrencyInput prefix="$" value={this.state.owe} onChange={this.handleOwe} />
          </label>
          <br/>
          <button className={"button"} onClick={this.handleSubmit}>Get Change</button>
          {this.state.showComponent ? 
            <ChangeBack paid={this.state.paid} owe={this.state.owe} /> :
            null
          }
        </form>
      </div>
    );
  }
}

export default ChangeForm;
