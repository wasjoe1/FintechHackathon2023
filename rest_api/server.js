var express = require('express');
const axios = require('axios');
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
var Web3 = require('web3');
const Provider = require('@truffle/hdwallet-provider');
const {MongoClient} = require("mongodb")
const mongo = new MongoClient("mongodb+srv://joechua:Password99@cluster0.ggww2.mongodb.net/mongo1?retryWrites=true&w=majority")

var SmartContractAddress = "0xa6447dde6b0a7f7a04ae67cce13b805081c9f829";
const SmartContractABI = require("./contract-abi.json");
var address = "0x7a6586830eB47F53FA2F66E538d51aCc1B10FeB8" //address that is using to access the smart contract
var rpcurl = "https://goerli.infura.io/v3/fbc30355827c4501b34093ad49b6a453"; // url that provides access to the block chain data

const senderPk = "a3949c81d7503530367763b073c79e05e8bcf5206337d9c6b61eafb83b55bc21";
const senderAddress = "0x7a6586830eB47F53FA2F66E538d51aCc1B10FeB8"; //same as the address that is used to access the contract
const receiverPk = "71cd8fb48e8f1d056f065decbe9fb1a9dadec48a67e2661301c5c8dd6e3fa450";
const receiverAddress = "0xCb0066C6975021c165d571BD72e4FF7b5Ed52527";

// Hardware
var boxStatus = false; //true means its occupied, false means unoccupied
var itemDetails = undefined;
var rpi_ip_address = "http://172.20.10.3:3000"; //NEED TO CHANGE 
var my_ip_addresss = "http://172.20.10.2:80"; //NEED TO CHANGE

// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
//CONNECT TO SMART CONTRACT
var provider = new Provider(senderPk, rpcurl);
var web3 = new Web3(provider);
var myContract = new web3.eth.Contract(SmartContractABI, SmartContractAddress); //myContract.methods to access the functions tied to the contract

//CONNECT TO MONGODB
start();
async function start() { 
	console.log("connecting Mongo...");
	await mongo.connect(); 
	console.log("Mongo connected");
}

// HANDLE FORM DATA
const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, "photos/")
	},
	filename: function(req, file, cb) {
		numberOfFiles = fs.readdirSync("photos").length;
		console.log("number of files in photos: " + numberOfFiles);
		cb(null, `imageFile${numberOfFiles}.jpeg`);
	}
});
const upload = multer({ storage: storage });

//ON SERVER
var app = express();
var port = process.env.PORT || 80;
app.listen(port);
console.log('listening on', port);

// CORS CONFIGURATION
app.options('*', cors());
app.use(cors())

// PARSING DATA
app.use(express.json()); 
app.use(express.urlencoded({ extended: true}));

// HOST MY PICTURES
app.use("/photos", express.static("photos"))

// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
//MIDDLEWARE
app.get("/checkBoxStatus", async (req, res, next) => {
	res.send(boxStatus)
	console.log(boxStatus)
})

app.post("/register", async (req, res, next) => {
	console.log("Creating new account...")
	var vRegistrationDetails = req.body

	// create web3 account/wallet for client
	var account = web3.eth.accounts.create() // create new account
	// encrpyt private key, store all keys & adresses
	var JSONToStore = web3.eth.accounts.encrypt(account.privateKey, vRegistrationDetails.password) // private key encrypted with password, returns a JSON object
	vRegistrationDetails.encrypted_JSON_key = JSONToStore
	vRegistrationDetails.address = account.address
	
	// store new user data in mongoDB
	await mongo.db("web3hackathon").collection("users").insertOne(vRegistrationDetails);
	// end request
	res.send("your account is created")
	console.log(`${vRegistrationDetails.company_name}'s account created`)

	// Details sent :
	// 1. company_id: 12,
	// 2. company_name: "Amazon",
	// 3. deposit_amount: 1000000,
	// 4. password: "password",
	// 5. Country: "USA",
	// 6. Email: "amazon@gmail.com",
	// 7. Comment: "nil"
	// 8. encrypted private key
	// 9. wallet public key?
	// 10. wallet public address
})

app.post("/putNewItem", async (req, res, next) => {
	// check if there's an item
	if (boxStatus) { // if its true, then nothing happens
		res.send({boxStatus: boxStatus})
	} else {
		next() //if its false then save all the details
	}
}, upload.fields([{name:"image"}]),  async (req, res, next) => {
	// no item, receive the form, set the box status & item details
	itemDetails = req.body
	itemDetails.boxStatus = true
	itemDetails.imageLink = `${my_ip_addresss}/photos/imageFile${fs.readdirSync("photos").length - 1}.jpeg`
	// send back success so that page can be updated
	res.send(itemDetails)
	axios.get(`${rpi_ip_address}/close`) //close the box
	boxStatus = true
	console.log("success")
})

app.get("/buyItem", async (req, res, next) => {
	res.send(itemDetails)
	console.log("just gives back the payment page")
})

app.post("/payForItem", async (req, res, next) => {
	// check if there's an item
	if (boxStatus) { // if its true
		// got item
		next()
	} else {
		// no item
		res.send("no item in box")
	}
}, B2BTransaction)

//MULTIPLE STAKEHOLDERS
// app.post("/payForItem", async (req, res, next) => {
// 	// check if there's an item
// 	if (boxStatus) { // if its true
// 		// got item
// 		var item = req.body
// 		for (let i =0; i < item;i++) {
			
// 		}
		
// 		next()
// 	} else {
// 		// no item
// 		res.send("no item in box")
// 	}
// }, B2BTransaction)



// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// FUNCTIONS
function resetBox() {
	// set box status to false
	boxStatus = false
	// set item details to undefined
	itemDetails = undefined
}

async function B2BTransaction (req, res, next) {
	console.log("transaction starting ...");
	
	// find the item in my database, set necessary details (IMPLEMENTED IN THE FUTURE)
	// var itemId = req.body.itemId
	// var cursor = await mongo.db("web3hackathon").collection("items").find({"itemId": itemId});
	// var item = await cursor.toArray()
	// var itemPrice = item.price

	// Do transaction between wallets
	try {
		var transactionObject = await myContract.methods.transferFrom(senderAddress, receiverAddress, itemDetails.item_price).send({from: address}); //dk why but just need address LOL
		// console.log(transactionObject); //returns a transaction object, 1 of its properties is status ()
		console.log(transactionObject.transactionHash);
		console.log("transaction is " + transactionObject.status);
		res.send({link: "https://goerli.etherscan.io/tx/" + transactionObject.transactionHash, status: true})
	} catch (error) {
		res.send({error: error.message, status: false})
		console.log("transaction failed")
		console.log(error.message)
	}
	
	// unlock the lock
	if (transactionObject.status) {
		axios.get(`${rpi_ip_address}/open`) //find the ip address of the rpi
		console.log("transaction complete")
		resetBox()
	}
}



















// async function test() {
// 	// var contractMethods = await myContract.methods
// 	// console.log(contractMethods)

// 	try {
// 		var transactionObject = await myContract.methods.transfer(receiverAddress, 9).send({from: address}); //dk why but just need address LOL
// 		console.log(transactionObject)
// 	} catch (error) {
// 		console.log("transaction failed")
// 		return console.log(error.message)
// 	}
// }
// // test()