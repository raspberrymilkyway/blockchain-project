//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Code copied from class demo

contract CropToken {
    string public name = "CropToken";
    string public symbol = "CT";
    uint256 public totalSupply;
    address private deployer;

    mapping(address => uint256) public balanceOf;
    mapping(address => uint256) public approvedAmount; //Only the deployer account can approve, so this is valid

    struct Chemical{
        string brandUsed;
        string locationUsed;
        uint256 amountUsed;
        uint256 cropCount;
        string cropType;
    }

    event Transfer(address indexed from, address indexed to, uint256 value);
    event ApprovedTransfer(address indexed from, address indexed to, address indexed sender, uint256 value);
    event Approval(address indexed sender, address indexed spender, uint256 value);

    event Fertilizer(address indexed from, Chemical fertilizer);
    event Fungicide(address indexed from, Chemical fungicide);
    event Insecticide(address indexed from, Chemical insecticide);
    event Herbicide(address indexed from, Chemical herbicide);
    
    constructor(uint256 _initialSupply) {
        totalSupply = _initialSupply;
        balanceOf[msg.sender] = totalSupply;
        deployer = msg.sender;
    }

    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(_value >= 0, "Cannot transfer negative MTK");
        require(balanceOf[msg.sender] >= _value, "Insufficient balance");
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function approve(address _spender, uint256 _value) public returns (bool success){
        require(_value >= 0, "Cannot approve negative MTK");
        require(msg.sender == deployer, "You do not have permission to approve");
        require(balanceOf[msg.sender] >= _value, "Insufficient balance");
        require(_spender != deployer, "You do not need approval to send tokens");
        approvedAmount[_spender] += _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    function approvalTransfer(address _from, address _to, uint256 _value) public returns (bool success){
        require(_value >= 0, "Cannot transfer negative MTK");
        require(_value <= approvedAmount[msg.sender], "You are not approved to transfer that much");
        require(balanceOf[_from] >= _value, "Insufficient balance");
        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;
        approvedAmount[msg.sender] -= _value;
        emit ApprovedTransfer(_from, _to, msg.sender, _value);
        return true;
    }

    function useFertilizer(string memory _brand, string memory _location, uint256 _amount, uint256 _cropCount, string memory _cropType) public returns (bool success){
        require(bytes(_brand).length > 0, "Fertilizer brand must be given");
        require(bytes(_location).length > 0, "Location where fertilizer was used must be given");
        require(bytes(_cropType).length > 0, "Crop type on which fertilizer was used must be given");
        require(_amount > 0, "Amount of fertilizer used must be given");
        require(_cropCount > 0, "Number of crops fertilizer was used on must be given");
        Chemical memory f = Chemical(_brand, _location, _amount, _cropCount, _cropType);
        emit Fertilizer(msg.sender, f);
        return true;
    }

    function usePesticide(string memory _brand, string memory _location, uint256 _amount, uint256 _cropCount, string memory _cropType, string memory _typeOfPesticide) public returns (bool success){
        require(bytes(_brand).length > 0, "Pesticide brand must be given");
        require(bytes(_location).length > 0, "Location where pesticide was used must be given");
        require(bytes(_cropType).length > 0, "Crop type on which pesticide was used must be given");
        require(bytes(_typeOfPesticide).length > 0, "Type of pesticide was used must be given");
        require(_amount > 0, "Amount of pesticide used must be given");
        require(_cropCount > 0, "Number of crops pesticide was used on must be given");
        Chemical memory f = Chemical(_brand, _location, _amount, _cropCount, _cropType);

        if (keccak256(bytes(_typeOfPesticide)) == keccak256(bytes("Fungicide"))){
            emit Fungicide(msg.sender, f);
        }
        if (keccak256(bytes(_typeOfPesticide)) == keccak256(bytes("Insecticide"))){
            emit Insecticide(msg.sender, f);
        }
        if (keccak256(bytes(_typeOfPesticide)) == keccak256(bytes("Herbicide"))){
            emit Herbicide(msg.sender, f);
        }
        else{
            require(1 == 0, "Pesticide must be a fungicide, insecticide, or herbicide");
        }
        return true;
    }
}
