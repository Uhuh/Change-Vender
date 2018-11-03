import React from 'react'

class ChangeBack extends React.Component {

  getChange = () => {
    const BILLS = [100, 50, 20, 10, 5, 1]
    const CHANGE = [25, 10, 5, 1] 
    const cashBack = [] // The cash we'll output.
    let cashNames = new Map()
    cashNames.set(0.01, "Pennies")
    cashNames.set(0.05, "Nickles")
    cashNames.set(0.10, "Dimes")
    cashNames.set(0.25, "Quarters")
    cashNames.set(1, "Dollars")
    cashNames.set(5, "Fives")
    cashNames.set(10, "Tens")
    cashNames.set(20, "Twenties")
    cashNames.set(50, "Fifties")
    cashNames.set(100, "Hundreds")
    
    const dueAmount = parseFloat(this.props.paid - this.props.owe).toFixed(2) // What's due back
    let coins = parseFloat((dueAmount*100)%100).toFixed(0)
    let cash = Math.floor(dueAmount)

    while(cash > 0 || coins > 0) {
      BILLS.find((val) => {
        if(val > cash) {
          return // Return because the bill doesn't go into the cash.
        }
        
        let numBills = Math.floor(cash/val)

        cashBack.push({amount: numBills, type: cashNames.get(val)})

        cash -= (val*numBills)
      })
  
      CHANGE.find((val) => {
        if(val > coins) {
          return // Return because the change doesn't go into the coins
        }

        let numChange = Math.floor(coins/val)
        // Divide by 100 to bring it back to decimal form.
        cashBack.push({amount: numChange, type: cashNames.get((val/100))})

        // Take away from to ensure we're counting down
        coins -= (val*numChange)
      })
    }
    return cashBack
  }

  render() {
    const amountDue = parseFloat(this.props.paid - this.props.owe).toFixed(2)
    const change = this.getChange()
    let idents = []
    for(const i of change) {
      idents.push(<span>{i.type} - {i.amount}</span>, <br/>)
    }
    return (
      <div>
        ${this.props.paid} - ${this.props.owe} = {amountDue < 0 ? "-$" : "$"}{Math.abs(amountDue)}
        {amountDue < 0 ? " You need to pay more!":" change to return."}
        <br/>
        {idents}
      </div>
    )
  }
}

export default ChangeBack