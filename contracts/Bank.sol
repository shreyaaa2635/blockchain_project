// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Bank {

    struct Account {
        uint balance;
        bool exists;
    }

    mapping(address => Account) public accounts;

    function createAccount() public {
        require(!accounts[msg.sender].exists, "Account exists");
        accounts[msg.sender] = Account(0, true);
    }

    function deposit() public payable {
        require(accounts[msg.sender].exists, "No account");
        accounts[msg.sender].balance += msg.value;
    }

    function transfer(address to, uint amount) public {
        require(accounts[msg.sender].exists, "Sender not registered");
        require(accounts[to].exists, "Receiver not registered");
        require(accounts[msg.sender].balance >= amount, "Low balance");

        accounts[msg.sender].balance -= amount;
        accounts[to].balance += amount;
    }

    function withdraw(uint amount) public {
        require(accounts[msg.sender].exists, "No account");
        require(accounts[msg.sender].balance >= amount, "Low balance");

        accounts[msg.sender].balance -= amount;
        payable(msg.sender).transfer(amount);
    }

    function getBalance() public view returns(uint) {
        return accounts[msg.sender].balance;
    }
}