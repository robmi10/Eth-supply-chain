import firebase from "firebase";


const firebaseConfig = {
    apiKey: "AIzaSyBS8myRkgo160ep9_QfdWVaw-6TXJnCGSs",
    authDomain: "supplyeth.firebaseapp.com",
    projectId: "supplyeth",
    storageBucket: "supplyeth.appspot.com",
    messagingSenderId: "194816881602",
    appId: "1:194816881602:web:25ad703b3ef88f41e0dc5b",
    measurementId: "G-ZQNY3RQJX3"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;

  
  /*const curr_id = curr_data.text
          const new_id = parseInt(curr_id, 10)
          console.log("new_id -->", new_id)
          const react =  firebase.database().ref('supplyeth').orderByChild("supply_id").equalTo(new_id);
          react.on('value', (snapshot) => {
          const supply = snapshot.val();
          //this.state.new_list.push(supply[id])
          for(let id in supply){
              console.log("product->", supply[id].product)
              this.setState({
                  screen_product: supply[id].product,
                  screen_quality: supply[id].quality_grade,
                  screen_lat: supply[id].latitude,
                  screen_long: supply[id].longitude,
                  screen_id: supply[id].supply_id
              })
          }
          });*/