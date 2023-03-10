const channelsList = document.querySelector('.channels-container')
const channels = document.querySelectorAll('.channels')
const btnSendMessage = document.querySelector('#send-message')
let messageContainer = document.querySelector('.message-container')
const messageInput = document.querySelector('#message-input')
const messageHeading = document.querySelector('#message-heading')

let currentChannel = '';
getChannels()

// Get channels 
async function getChannels() {
     let channelData = null;
     try {
          const response = await fetch('api/channels');
          channelData = await response.json();
          if (response.status !== 200) {
               return
          }
     } catch (error) {
          console.log('Something went wrong when fetching data from the server. GET \n' +
               error.message)
          return
     }
     channelsList.innerHTML = '';

     channelData.forEach(channel => {
          onClickChannel(channel)
     });
}

// show fetched channels and adding click event
function onClickChannel(channel) {
     let channelElement = document.createElement('div');
     channelElement.classList = 'channels';
     channelElement.innerText = channel.channelName

     if (channel.status === 'private') {
          channelElement.innerText = 'PRIVATE * ' + channel.channelName

          channelElement.addEventListener('click', () => {
               currentChannel = channel.channelName
               if (isLoggedIn) {
                    getMessages(channel.channelName)
                    channelElement.innerText = channel.channelName
                    messageHeading.innerText = currentChannel

               } else {
                    messageContainer.innerHTML = ''
                    channelElement.innerText = channel.channelName + ' \n * Oops! Log in to see'
                    messageHeading.innerText = currentChannel
               }
          })
     } else {
          channelElement.addEventListener('click', () => {
               currentChannel = channel.channelName
               messageHeading.innerText = currentChannel
               getMessages(channel.channelName)
          })
     }
     channelsList.appendChild(channelElement);
}


function getDate() {
     let newDate = new Date()
     let datestring = newDate.toDateString()

     let hours = addZero(newDate.getHours())
     let minutes = addZero(newDate.getMinutes())
     let seconds = addZero(newDate.getSeconds())

     datestring = `${datestring} ${hours}:${minutes}:${seconds}`

     return datestring
}

function addZero(num) {
     return num < 10 ? `0${num}` : num
}

// POST, create and send message
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

     if (response.status === 200) {
          createMessage(newMessage)
          console.log('it worked')
     }
     messageInput.value = ''
}

btnSendMessage.addEventListener('click', postMessage)

async function getMessages(name) {

     messageContainer.innerHTML = ''
     let messageData;
     const response = await fetch(`api/channels/${name}/messages`)
     messageData = await response.json()

     messageData.forEach(message => {
          createMessage(message)
     })
}

function createMessage(message) {

     let messageElement = document.createElement('div')
     messageElement.className = 'messages'
     messageElement.innerText = `${message.timeCreated} \n ${message.username} : ${message.text}`
     messageContainer.appendChild(messageElement)

}


