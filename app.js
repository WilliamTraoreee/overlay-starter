const client = tmi.Client({
  channels: ['willtraore']
})

client.connect();

// CHAT

client.on('message', (channel, tags, message, self) => {
  const pseudo = tags['display-name']
  const msg = message
  const messages = document.querySelector('.messages')

  const msgContainer = document.createElement('div')
  const pseudoContainer = document.createElement('p')
  const textContainer = document.createElement('section')

  msgContainer.classList.add('message')
  pseudoContainer.innerText = pseudo
  textContainer.innerText = msg

  msgContainer.appendChild(pseudoContainer)
  msgContainer.appendChild(textContainer)

  messages.appendChild(msgContainer)

  deleteMessage()
});

const deleteMessage = () => {

  const numbMessagetoDisplay = 15
  const messages = document.querySelectorAll('.message')
  const numbOfMessage = messages.length
  const numbToDelete = numbOfMessage - numbMessagetoDisplay

  if(numbOfMessage >= numbMessagetoDisplay) {
    for(let i = 0; i < numbToDelete; i++) {
      const msg = messages[i]
      msg.remove()
    }
  } 

}

// EVENTS 

client.on("subscription", (channel, username, method, message, userstate) => {
  localStorage.setItem('lastsub', username)
  const el = document.querySelector('.lastsub span')
  el.innerText = username
  displayAlert(`${username} vient de se sub`)
});

client.on("raided", (channel, username, viewers) => {
  localStorage.setItem('lastraid', JSON.stringify({ from: username, viewers: viewers }))
  const el = document.querySelector('.lastraid span')
  el.innerText = `${username} - ${viewers} viewers`
  displayAlert(`${username} vient de raid avec ${viewers} viewers`)
});

client.on("hosted", (channel, username, viewers) => {
  localStorage.setItem('lasthost', JSON.stringify({ from: username, viewers: viewers }))
  const el = document.querySelector('.lasthost span')
  el.innerText = `${username} - ${viewers} viewers`
  displayAlert(`${username} vient de host avec ${viewers} viewers`)
});

client.on("subgift", (channel, username, streakMonths, recipient, methods, userstate) => {
  localStorage.setItem('gift', JSON.stringify({ from: username, to: recipient, number: 1 }))
  const el = document.querySelector('.lastgift span')
  el.innerText = `${username} - 1 sub`
  displayAlert(`${username} vient d'offrir un sub à ${recipient}`)
});

client.on("submysterygift", (channel, username, numbOfSubs, methods, userstate) => {
  localStorage.setItem('gift', JSON.stringify({ from: username, to: null, number: numbOfSubs }))
  const el = document.querySelector('.lastgift span')
  el.innerText = `${username} - ${numbOfSubs} sub(s)`
  displayAlert(`${username} vient d'offrir ${numbOfSubs} subs`)
});

const getEvents = () => {
  // Last sub
  const lastsub = localStorage.getItem('sub')
  const elLastSub = document.querySelector('.lastsub span')
  if(lastsub) elLastSub.innerText = lastsub

  // Last raid 
  const lastraid = JSON.parse(localStorage.getItem('raid'))
  const elLastraid = document.querySelector('.lastraid span')
  if(lastraid) elLastraid.innerText = `${lastraid?.from} - ${lastraid?.viewers} viewers`

  // Last host
  const lasthost = JSON.parse(localStorage.getItem('host'))
  const elLasthost = document.querySelector('.lasthost span')
  if(lasthost) elLasthost.innerText = `${lasthost?.from} - ${lasthost?.viewers} viewers`

  // Last gift
  const lastgift = JSON.parse(localStorage.getItem('gift'))
  const elLastGift = document.querySelector('.lastgift span')
  if(lastgift) elLastGift.innerText = `${lastgift?.from} - ${lastgift?.number} sub(s)`
}

getEvents()

// ALERTS 

const displayAlert = (text) => {
  const alerts = document.querySelector('.alerts')
  const container = document.createElement('div')
  container.classList.add('alert')
  container.innerText = text
  alerts.appendChild(container)
  setTimeout(() => {
    container.classList.add('alert-hide')
  }, 3000)
  setTimeout(() => {
    container.remove()
  }, 3300)
}

const displayAlertBtn = document.querySelector('.display-alert')
displayAlertBtn.addEventListener('click', (e) => {
  console.log('test')
  displayAlert('Fabrice vient de se sub')
})