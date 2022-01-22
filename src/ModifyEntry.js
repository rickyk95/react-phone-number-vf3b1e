import React, {useState} from 'react';
import './style.css'

export default function ModifyEntry({getList,firstName,lastName,phoneNumber,setFirstName,setLastName,setPhoneNumber}) {
  const [newFirstName,modifyFirstName] = useState('')
  const [newLastName,modifyLastName] = useState('')
  const [newPhoneNumber,modifyPhoneNumber] = useState('')
  const emptyFieldWarning = document.querySelectorAll('small')
  const inputs = Array.from(document.querySelectorAll('input.modify'))
  console.log(inputs,1000)

  function validateModification(){
    let incompleteFields;
    let phoneNotANumber;
    for(var i = 0; i < inputs.length;i++){
        if(inputs[i].value.trim() === ''){
          console.log(i)
          inputs[i].style.border="red 2px solid";
          emptyFieldWarning[i].innerText="Este campo esta vacío";
          incompleteFields = true
          if(inputs[i].name === 'phone' && typeof inputs[i].value !== Number){
            console.log(5000,inputs[i])
            inputs[i].style.border="red 2px solid";
            emptyFieldWarning[i].innerText="Este campo no es un número";
            return false
          }
        }
    }
    if(incompleteFields){
        return false
    }
    return true
  }
  function resetInputFields(){
    console.log(inputs)
    inputs.forEach((input,index)=>{
      index === 2 ? input.value = 0 : input.value = ''
      input.value='';
      input.style.border=""
      emptyFieldWarning[index].innerText="";
      console.log(input)
    })
    modifyFirstName('')
    modifyLastName('')
    modifyPhoneNumber('')
  }
  
  function submitModification(e){
    const modifyEntry = document.querySelector('.modify-entry')
    e.preventDefault()
    if(validateModification() === false){
        return console.log('Forma no válida')
    }
    fetch('http://www.localhost:5000/modifyEntry',{
      method:'PUT',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      }, 
      body:JSON.stringify({
        oldValues:{
          firstName,
          lastName,
          phoneNumber
        },
        newValues:{
          newFirstName,newLastName,newPhoneNumber
        }
       
      })
    }).then(()=>{
        modifyEntry.style.display="none"
        resetInputFields()
        getList()
        console.log(1000)
     
    }).catch((e)=>{
        console.log(e)
        console.log('An error was found')
    })
  }

  return <div className="modify-entry">
      <h1>Editar Contacto</h1>
    <form  className="phone-form flex column" onSubmit={(e)=>{submitModification(e)}}>
        <label>First Name</label>
        <input type="text" className="modify" onChange={(e)=>{modifyFirstName(e.target.value)}} placeholder='Escribir nuevo nombre' name="firstName"></input>
        <small></small>
        <label>Last Name</label>
        <input type="text"  className="modify"  onChange={(e)=>{modifyLastName(e.target.value)}}  placeholder='Escribir nuevo apellido' name="lastName"></input>
        <small></small>
        <label>Phone</label>
        <input type="text"  className="modify" onChange={(e)=>{modifyPhoneNumber(e.target.value)}} placeholder='Escribir nuevo número' name="phone"></input>
        <small></small>
        <button className="self-end">Submit</button>
    </form>

  </div>;
}
