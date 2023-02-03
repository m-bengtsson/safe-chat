const channelsList = document.querySelector('.channels-container')
const channels = document.querySelectorAll('.channels')
const btnSendMessage = document.querySelector('#send-message')
let messageContainer = document.querySelector('.message-container')
const messageInput = document.querySelector('#message-input')
const messageHeading = document.querySelector('.heading')

let currentChannel = '';
getChannels()

async function getChannels() {
     let channelData = null;
     try {
          const response = await fetch('api/channels');
          channelData = await response.json();
          if (response.status !== 200) {
               console.log('Could not contact server. Status: ' + response.status)
               return
          } console.log('Data from server:', channelData)

     } catch (error) {
          console.log('Something went wrong when fetching data from the server. GET \n' +
               error.message)
          return
     }
     channelsList.innerHTML = '';
     // console.log('script.js channelData foreach')

     channelData.forEach(channel => {
          clickedChannel(channel)
          //console.log('channelData: ', channel.channelName)
          //console.log('Channel data from server: 'channelData)
          //console.log('Channel private or public?: ', channel.status)
     });
}



function clickedChannel(channel) {
     let channelElement = document.createElement('div');
     channelElement.classList = 'channels';
     channelElement.innerText = channel.channelName

     if (channel.status === 'private') {
          channelElement.innerText = 'PRIVATE * ' + channel.channelName

          channelElement.addEventListener('click', () => {
               currentChannel = channel.channelName
               if (isLoggedIn) {
                    getMessages(channel.channelName)
                    console.log('1 PRIVATE CHANNEL * Logged in?: ', isLoggedIn)
                    channelElement.innerText = channel.channelName
               } else {
                    console.log('2 PRIVATE CHANNEL * Logged in?: ', isLoggedIn)
                    channelElement.innerText = channel.channelName + ' * Oops! Log in to see'
                    messageContainer = ''
               }
          })
     } else {
          channelElement.addEventListener('click', () => {
               currentChannel = channel.channelName
               getMessages(channel.channelName)
               console.log(' PUBLICH CHANNEL * Logged in?: ', isLoggedIn)
          })
     }
     channelsList.appendChild(channelElement);
}



function getDate() {
     let newDate = new Date()
     let dateString = newDate.toDateString()
     return dateString
}

// POST
async function postMessage() {
     const jwt = localStorage.getItem(JWT_KEY)
     let messageData;

     const newMessage = {
          text: messageInput.value,
          timeCreated: getDate(),
          username: `${userLoggedIn}`
     }
     const options = {
          method: 'POST',
          body: JSON.stringify(newMessage),
          headers: {
               'Content-Type': 'application/json',
               'Authorization': 'Bearer ' + jwt
          }
     }
     const response = await fetch(`/api/channels/${currentChannel}/`, options)
     messageData = await response.json()
     // console.log('type of messagedata', '"' + messageData + '"', typeof messageData)
     if (response.status === 200) {
          //getMessages('animals')
          createMessage(newMessage)
          console.log('it worked')
     }
     // console.log('Status code: ', response.status)
     // console.log('new message ', newMessage)
     // console.log('Data from backend ', messageData)
}


btnSendMessage.addEventListener('click', postMessage)

async function getMessages(name) {

     messageContainer.innerHTML = ''
     let messageData;
     const response = await fetch(`api/channels/${name}/messages`)
     messageData = await response.json()

     messageData.forEach(message => {
          console.log('Message text: ', message.text)
          createMessage(message)
     })
     console.log('MessageData from server:', messageData)

}

function createMessage(message) {

     let messageElement = document.createElement('div')
     messageElement.className = 'messages'
     messageElement.innerText = `${message.timeCreated} * ${message.username} : ${message.text}`
     messageContainer.appendChild(messageElement)

}


