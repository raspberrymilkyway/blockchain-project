const web3 = new Web3();

const abi = [];

const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
const tokenContract = new web3.eth.Contract(abi, contractAddress);