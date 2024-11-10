//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Modified from Assignment 6 -- Agricultural supply chain tracker for use at a farm level

contract CropToken {
    string public name = "CropToken";
    string public symbol = "CT";
    uint256 public totalSupply;
    address private deployer;

    mapping(address => uint256) public balanceOf;
    mapping(address => uint256) public approvedAmount; //Only the deployer account can approve

    mapping(address => int) public fertilizerLimit;
    mapping(address => int) public fungicideLimit;
    mapping(address => int) public insecticideLimit;
    mapping(address => int) public herbicideLimit;

    struct Chemical{
        string chemicalType;
        string locationUsed;
        int256 amountUsed;
        uint256 cropCount;
        string cropType;
        string timestamp;
        //bool stop; //false for start/running; true for stop
        string imageLink;
    }

    struct ChemicalBulk{
        Chemical chemical;
        uint256 timesRun;
        string startTime;
        string endTime;
    }

    event Transfer(address indexed from, address indexed to, uint256 value);
    event ApprovedTransfer(address indexed from, address indexed to, address indexed sender, uint256 value);
    event Approval(address indexed sender, address indexed spender, uint256 value);

    event Fertilizer(address indexed from, Chemical fertilizer);
    event Fungicide(address indexed from, Chemical fungicide);
    event Insecticide(address indexed from, Chemical insecticide);
    event Herbicide(address indexed from, Chemical herbicide);

    event FertilizerBulk(address indexed from, ChemicalBulk fertilizer);
    event FungicideBulk(address indexed from, ChemicalBulk fungicide);
    event InsecticideBulk(address indexed from, ChemicalBulk insecticide);
    event HerbicideBulk(address indexed from, ChemicalBulk herbicide);

    event FertilizerLimit(address indexed farm, int256 fertilizerLimit, int256 addedAmount);
    event FungicideLimit(address indexed farm, int256 fungicideLimit, int256 addedAmount);
    event InsecticideLimit(address indexed farm, int256 insecticideLimit, int256 addedAmount);
    event HerbicideLimit(address indexed farm, int256 herbicideLimit, int256 addedAmount);
    
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

    function useFertilizer(string memory _brand, string memory _location, int256 _amount, uint256 _cropCount, string memory _cropType, string memory _timestamp, string memory _imageLink) public returns (bool success){
        require(bytes(_brand).length > 0, "Fertilizer brand must be given");
        require(bytes(_location).length > 0, "Location where fertilizer was used must be given");
        require(bytes(_cropType).length > 0, "Crop type on which fertilizer was used must be given");
        require(_amount > 0, "Amount of fertilizer used must be given");
        // require(_amount <= fertilizerLimit[msg.sender], "You cannot use that much fertilizer");
        require(_cropCount > 0, "Number of crops fertilizer was used on must be given");
        Chemical memory f = Chemical(_brand, _location, _amount, _cropCount, _cropType, _timestamp, _imageLink);
        fertilizerLimit[msg.sender] -= _amount;
        emit Fertilizer(msg.sender, f);
        return true;
    }
    
    //Consider separating these, to match the design of everything else
    function usePesticide(string memory _brand, string memory _location, int256 _amount, uint256 _cropCount, string memory _cropType, string memory _timestamp, string memory _imageLink, string memory _typeOfPesticide) public returns (bool success){
        require(bytes(_brand).length > 0, "Pesticide brand must be given");
        require(bytes(_location).length > 0, "Location where pesticide was used must be given");
        require(bytes(_cropType).length > 0, "Crop type on which pesticide was used must be given");
        require(bytes(_typeOfPesticide).length > 0, "Type of pesticide was used must be given");
        require(_amount > 0, "Amount of pesticide used must be given");
        require(_cropCount > 0, "Number of crops pesticide was used on must be given");
        Chemical memory f = Chemical(_brand, _location, _amount, _cropCount, _cropType, _timestamp, _imageLink);

        //String comparisons are apparently only done via byte hash comparisons..?
        if (keccak256(bytes(_typeOfPesticide)) == keccak256(bytes("Fungicide"))){
            // require(_amount <= fungicideLimit[msg.sender], "You cannot use that much fungicide");
            fungicideLimit[msg.sender] -= _amount;
            emit Fungicide(msg.sender, f);
        }
        else if (keccak256(bytes(_typeOfPesticide)) == keccak256(bytes("Insecticide"))){
            // require(_amount <= insecticideLimit[msg.sender], "You cannot use that much insecticide");
            insecticideLimit[msg.sender] -= _amount;
            emit Insecticide(msg.sender, f);
        }
        else if (keccak256(bytes(_typeOfPesticide)) == keccak256(bytes("Herbicide"))){
            // require(_amount <= herbicideLimit[msg.sender], "You cannot use that much herbicide");
            herbicideLimit[msg.sender] -= _amount;
            emit Herbicide(msg.sender, f);
        }
        else{
            require(1 == 0, "Pesticide must be a fungicide, insecticide, or herbicide");
        }
        return true;
    }

    function useFertilizerBulk(string memory _location, int256 _amount, uint256 _cropCount, string memory _cropType, string memory _imageLink, uint256 _timesRun, string memory _startTime, string memory _endTime) public returns (bool success){
        require(bytes(_location).length > 0, "Location where fertilizer was used must be given");
        require(bytes(_cropType).length > 0, "Crop type on which fertilizer was used must be given");
        require(_amount > 0, "Amount of fertilizer used must be given");
        require(_cropCount > 0, "Number of crops fertilizer was used on must be given");
        require(_timesRun > 0, "Must have run at least once.");
        Chemical memory c = Chemical("fertilizer", _location, _amount, _cropCount, _cropType, _startTime, _imageLink);
        ChemicalBulk memory f = ChemicalBulk(c, _timesRun, _startTime, _endTime);
        fertilizerLimit[msg.sender] -= _amount;
        emit FertilizerBulk(msg.sender, f);
        return true;
    }

    function useFungicideBulk(string memory _location, int256 _amount, uint256 _cropCount, string memory _cropType, string memory _imageLink, uint256 _timesRun, string memory _startTime, string memory _endTime) public returns (bool success){
        require(bytes(_location).length > 0, "Location where fungicide was used must be given");
        require(bytes(_cropType).length > 0, "Crop type on which fungicide was used must be given");
        require(_amount > 0, "Amount of fungicide used must be given");
        require(_cropCount > 0, "Number of crops fungicide was used on must be given");
        require(_timesRun > 0, "Must have run at least once.");
        Chemical memory c = Chemical("fungicide", _location, _amount, _cropCount, _cropType, _startTime, _imageLink);
        ChemicalBulk memory f = ChemicalBulk(c, _timesRun, _startTime, _endTime);
        fungicideLimit[msg.sender] -= _amount;
        emit FungicideBulk(msg.sender, f);
        return true;
    }

    function useInsecticideBulk(string memory _location, int256 _amount, uint256 _cropCount, string memory _cropType, string memory _imageLink, uint256 _timesRun, string memory _startTime, string memory _endTime) public returns (bool success){
        require(bytes(_location).length > 0, "Location where insecticide was used must be given");
        require(bytes(_cropType).length > 0, "Crop type on which insecticide was used must be given");
        require(_amount > 0, "Amount of insecticide used must be given");
        require(_cropCount > 0, "Number of crops insecticide was used on must be given");
        require(_timesRun > 0, "Must have run at least once.");
        Chemical memory c = Chemical("insecticide", _location, _amount, _cropCount, _cropType, _startTime, _imageLink);
        ChemicalBulk memory f = ChemicalBulk(c, _timesRun, _startTime, _endTime);
        insecticideLimit[msg.sender] -= _amount;
        emit InsecticideBulk(msg.sender, f);
        return true;
    }

    function useHerbicideBulk(string memory _location, int256 _amount, uint256 _cropCount, string memory _cropType, string memory _imageLink, uint256 _timesRun, string memory _startTime, string memory _endTime) public returns (bool success){
        require(bytes(_location).length > 0, "Location where herbicide was used must be given");
        require(bytes(_cropType).length > 0, "Crop type on which herbicide was used must be given");
        require(_amount > 0, "Amount of herbicide used must be given");
        require(_cropCount > 0, "Number of crops herbicide was used on must be given");
        require(_timesRun > 0, "Must have run at least once.");
        Chemical memory c = Chemical("herbicide", _location, _amount, _cropCount, _cropType, _startTime, _imageLink);
        ChemicalBulk memory f = ChemicalBulk(c, _timesRun, _startTime, _endTime);
        herbicideLimit[msg.sender] -= _amount;
        emit HerbicideBulk(msg.sender, f);
        return true;
    }

    //"set" functionality implies replacing the current value
    function setFertilizerLimit(address _farm, int256 _fertilizerLimit) public returns (bool success){
        require(msg.sender == deployer, "You do not have permission to set the fertilizer limit");
        require(_fertilizerLimit > 0, "Amount to add to fertilizer limit must be greater than 0");
        fertilizerLimit[_farm] = _fertilizerLimit;
        emit FertilizerLimit(_farm, fertilizerLimit[_farm], _fertilizerLimit);
        return true;
    }

    function setFungicideLimit(address _farm, int256 _fungicideLimit) public returns (bool success){
        require(msg.sender == deployer, "You do not have permission to set the fungicide limit");
        require(_fungicideLimit > 0, "Amount to add to fungicide limit must be greater than 0");
        fungicideLimit[_farm] = _fungicideLimit;
        emit FungicideLimit(_farm, fungicideLimit[_farm], _fungicideLimit);
        return true;
    }

    function setInsecticideLimit(address _farm, int256 _insecticideLimit) public returns (bool success){
        require(msg.sender == deployer, "You do not have permission to set the insecticide limit");
        require(_insecticideLimit > 0, "Amount to add to insecticide limit must be greater than 0");
        insecticideLimit[_farm] = _insecticideLimit;
        emit InsecticideLimit(_farm, insecticideLimit[_farm], _insecticideLimit);
        return true;
    }

    function setHerbicideLimit(address _farm, int256 _herbicideLimit) public returns (bool success){
        require(msg.sender == deployer, "You do not have permission to set the herbicide limit");
        require(_herbicideLimit > 0, "Amount to add to herbicide limit must be greater than 0");
        herbicideLimit[_farm] = _herbicideLimit;
        emit HerbicideLimit(_farm, herbicideLimit[_farm], _herbicideLimit);
        return true;
    }

    function isDeployer(address addr) public view returns (bool dep){
        return deployer == addr;
    }
}
