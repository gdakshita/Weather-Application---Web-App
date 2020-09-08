console.log('Client side js loaded.')



const weatherForm = document.querySelector('form')
const searchVal = document.querySelector('input')
const MessageOne = document.querySelector('#paraOne')
const MessageTwo = document.querySelector('#paraTwo')


weatherForm.addEventListener('submit',(e) =>{
     e.preventDefault()
     const location = searchVal.value
     console.log(location)

     MessageOne.textContent = 'Loading...'
     MessageTwo.textContent=''

     urlToPass = 'http://localhost:3000/weather?address='+location
     fetch(urlToPass).then((response) =>{
          response.json().then((data) => {
               if(data.Error){
                    console.log(data.Error)
                    MessageOne.textContent = data.Error
                    MessageTwo.textContent=''
               }
               else {
                    console.log(data.location)
                    console.log(data.dataforecast)
                    MessageTwo.textContent=data.location
                    MessageTwo.textContent= data.dataforecast
               }
          })
     })
})

