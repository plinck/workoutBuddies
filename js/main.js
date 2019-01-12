// firebase setup and config
var config = {
    apiKey: "AIzaSyD-Rni68sV7NSl1a_nRI5QtDZ-GazqCcYg",
    authDomain: "workoutbuddies-a9eb5.firebaseapp.com",
    databaseURL: "https://workoutbuddies-a9eb5.firebaseio.com",
    projectId: "workoutbuddies-a9eb5",
    storageBucket: "workoutbuddies-a9eb5.appspot.com",
    messagingSenderId: "25982813153"
};
firebase.initializeApp(config);
var database = firebase.database();

// most things about a user need to happen inside of one of the state change listeners
// this is how we can find out the user id 
firebase.auth().onAuthStateChanged( user => {
    if (user) { 
        this.userId = user.uid 

        // create or update the user in the database using info from Auth.
        firebase.database().ref('users/' + this.userId).update({
            username: user.displayName,
            email: user.email,
            profilePicture: user.photoURL || '/images/profile_placeholder.png'
        });
        
        // this is setting up the database info for the current user
        // it needs to be inside of the OnStateChange listener so that we have access to the user id.
        var userSnap = firebase.database().ref('users/' + user.uid);

        // this is creating a 
        userSnap.on('value', function(snap) {
        // this spits out an arrary of the data from the database. (as opposed to the auth() which has much less info)
        // you could replace this section with jquery to populate page content or grab values for API calls. 
        document.getElementById('accountDetails').textContent = JSON.stringify({
            displayName: snap.val().username,
            email: snap.val().email,
            address: snap.val().address,
            city: snap.val().city,
            state: snap.val().state,
            zipCode: snap.val().zipCode,
            photoURL: snap.val().profilePicture,
            aboutMe: snap.val().aboutMe,
            uid: snap.val().userId
        }, null, '  ')});

    }
    // if there is not a user then we're looking at the not logged in page area.
    // Right now if redirects to the login screen
    // this could be removed and used to display not logged in content on the homepage
    // perhaps some reason why to create an account, etc. 
    else {
        window.location.replace("login.html");
    }

});
<<<<<<< HEAD




=======
>>>>>>> master
