pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;

contract Supply{
mapping(uint => Manager) Manager_map;
mapping(uint => Product) Product_map;
address owner = msg.sender;
address customer = msg.sender;
mapping(uint => Customer) Customer_map;

mapping (string => Geolocation[]) Geo_map;


bool manager_loggedin;
bool customer_loggedin;

string message = "Hello World";

struct Manager{
    string username;
    string password;
    address owner;
    
}
struct Product{
    uint deviceid;
    address owner;
    string product;
    uint quality;
    string latitude;
    string longitude;
}
    
struct Customer{
        address customer_owner;
        string username;
        string password;
    }
    
struct Geolocation{
    string deviceid;
    string latitude;
    string longitude;
    string date;
}
    
    event isLoggedin(bool _isloggedin);
    uint customerindex;
    Customer [] public customer_list;

event Loggedin(bool loggedin); 

uint managerindex;

uint geoindex;

Product [] public product_list;
Manager [] public manager_list;


Geolocation [] public geo_list;

modifier is_manager_loggedin{
    require(manager_loggedin = true, "Manager - Password and username is not correct..");
    _;
    }
    
modifier is_customer_loggedin{
    require(customer_loggedin = true, "Customer - Password and username is not correct..");
    _;
    }


function get() public view returns(string memory) {
        return message;
}


function log_in_manager(string memory _username, string memory _password) public payable returns(bool){
    for(uint i = 0; i < manager_list.length; i++){
        if(keccak256(bytes(manager_list[i].username)) == keccak256(bytes(_username)) && 
        keccak256(bytes(manager_list[i].password)) == keccak256(bytes(_password))
        ){
            manager_loggedin = true;
            
        }
    }
    emit Loggedin(manager_loggedin);
    return manager_loggedin;
}

function log_in_customer(string memory _username, string memory _password) public payable returns(bool){
    for(uint i = 0; i < customer_list.length; i++){
        if(keccak256(bytes(customer_list[i].username)) == keccak256(bytes(_username)) && 
        keccak256(bytes(customer_list[i].password)) == keccak256(bytes(_password))
        ){
            customer_loggedin = true;
        }
    }
    emit isLoggedin(customer_loggedin);
    return customer_loggedin;
}

function create_manager(string memory _username, string memory _password) public {
    manager_list.push(Manager(_username, _password, owner));
}

 function create_customer(string memory _username, string memory _password) public{
       customer_list.push(Customer(owner, _username, _password));
    }


function create_product(uint _deviceid, string memory _product, uint _quality, string memory _latitude, string memory _longitude) public {
    product_list.push(Product(_deviceid, owner, _product, _quality, _latitude, _longitude));
}

function create_location(string memory _deviceid, string memory _latitude, string memory _longitude, string memory _date) public {
    Geolocation memory g =  Geolocation(_deviceid, _latitude, _longitude, _date);
    Geo_map[_deviceid].push(g);
    geo_list.push(Geolocation(_deviceid, _latitude, _longitude, _date));
}

function get_index_manager(uint _id) public view returns(string memory){
    return manager_list[_id].username;
}

function get_new_locationid(string memory _id) public view returns(Geolocation [] memory ){
    return Geo_map[_id];
}

function get_product_list() public view returns(Product [] memory ){
    return product_list;
}

function get_manager_list() public view returns(Manager [] memory ){
    return manager_list;
}

function get_devid(uint _id) public view returns(uint ){
    return product_list[_id].deviceid;
}

function get_geolocation() public view returns(Geolocation [] memory ){
    return geo_list;
}

function get_index_product(uint _id) public view returns(uint, string memory, uint, string memory, string memory){
    uint curr_deviceid;
    string memory curr_product;
    uint curr_quality;
    string memory curr_latitude;
    string memory curr_longitude;
    
    for(uint i = 0; i < product_list.length; i++){
    if(product_list[i].deviceid == _id){
        curr_deviceid = product_list[i].deviceid;
        curr_product = product_list[i].product;
        curr_quality = product_list[i].quality;
        curr_latitude = product_list[i].latitude;
        curr_longitude = product_list[i].longitude;
    }
    }
    return (curr_deviceid, curr_product, curr_quality, curr_latitude, curr_longitude);
}

function get_index_location(string memory _id) public view returns(string memory, string memory, string memory, string memory){
    
    string memory curr_deviceid;
    string memory curr_latitude;
    string memory curr_longitude;
    string memory curr_date;
    for(uint i = 0; i < geo_list.length; i++){
    if( keccak256(bytes(geo_list[i].deviceid)) == keccak256(bytes(_id)) ) {
        curr_deviceid = geo_list[i].deviceid;
        curr_latitude = geo_list[i].latitude;
        curr_longitude = geo_list[i].longitude;
        curr_date = geo_list[i].date;
    }
    }
    return (curr_deviceid, curr_latitude, curr_longitude, curr_date);
}

function set_curr_location(string memory _id, string memory _latitude, string memory _longitude, string memory _date) public payable returns(
    string memory, string memory, string memory, string memory){
   
    for(uint i = 0; i < geo_list.length; i++){
    if(keccak256(bytes(geo_list[i].deviceid)) == keccak256(bytes(_id))){
         geo_list[i].longitude = _longitude;
         geo_list[i].latitude = _latitude;
         geo_list[i].date = _date;
        
    }
    }
    return (_id, _latitude, _longitude, _date);
}
    
}