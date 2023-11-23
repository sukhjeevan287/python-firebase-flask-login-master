// Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAEam1baciBLfMtxLicXF_fvPMwWI9-cwE",
    authDomain: "discussionapp-4f9e7.firebaseapp.com",
    databaseURL: "https://discussionapp-4f9e7-default-rtdb.firebaseio.com",
    projectId: "discussionapp-4f9e7",
    storageBucket: "discussionapp-4f9e7.appspot.com",
    messagingSenderId: "697311112027",
    appId: "1:697311112027:web:623603ae4f1b51eb9d487e",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the Firebase database
const db = firebase.database();

// Get the username from the user
const username = document.getElementById('dataElement').getAttribute('data-variable');


// Function to send messages
function sendMessage(e) {
    e.preventDefault();

    // Get values to be submitted
    const timestamp = Date.now();
    const messageInput = document.getElementById("message-input");
    const message = messageInput.value;

    // Clear the input box
    messageInput.value = "";

    // Auto-scroll to bottom
    document
        .getElementById("messages")
        .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });

    // Create a database collection and send in the data
    db.ref("messages/" + timestamp).set({
        username,
        message,
    });
}

// Fetch messages from Firebase database
const fetchChat = db.ref("messages/");

fetchChat.on("child_added", function (snapshot) {
    const messages = snapshot.val();
    const message = `<li class=${username === messages.username ? "sent" : "received"}><span>${messages.username}: </span>${messages.message}</li>`;
    // Append the message on the page
    document.getElementById("messages").innerHTML += message;
});

// Event listener for message form submission
document.getElementById("message-form").addEventListener("submit", sendMessage);
