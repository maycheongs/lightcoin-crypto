
class Account {
  constructor (username) {
    this._username = username;
    this._transactions = [];
  }

  get balance() {
    let bal = 0;
    for (let trans of this._transactions) {
      bal += trans.value;
    }
    return bal;
  }

  get transactions() {
    return this._transactions;
  }

  addTransaction (transaction) {
    this._transactions.push(transaction);
  }
}

class Transaction {
  constructor (amount,account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    if (this.isAllowed()) {
    this.time = new Date();
    this.account.addTransaction(this); //add itself array of transactions.
    }
  }
}

class Deposit extends Transaction {
  get value() {
    return this.amount;
  }

  isAllowed () {
    return true;
  }
}

class Withdrawal extends Transaction {
  get value() {
    return -this.amount;
  }

  isAllowed () {
    return (this.account.balance >= this.amount);
  }
}




// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const account1 = new Account('user1');
t1 = new Deposit(100,account1);
t1.commit();


t2 = new Withdrawal(15, account1);
t2.commit();


console.log("BALANCE:",account1.balance)
