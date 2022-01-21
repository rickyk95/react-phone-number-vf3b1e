import { set } from 'mongoose';
import React, {useState, useEffect} from 'react';
import './style.css';

const PhoneBook = ({ onSubmit, getList }) => {
  const inputs = Array.from(document.querySelectorAll('input'))
  const emptyFieldWarning = document.querySelectorAll('small')
  const [firstName,setFirstName] = useState('')
  const [lastName,setLastName] = useState('')
  const [phoneNumber,setPhoneNumber] = useState('')

  function resetInputFields(){
    inputs.forEach((input,index)=>{
      input.value='';
      input.style.border=""
      emptyFieldWarning[index].innerText="";
      console.log(input)
    })
    setFirstName('')
    setLastName('')
    setPhoneNumber('')
  }

  function validateForm(){
    let incompleteFields;
    let phoneNotANumber;
    for(var i = 0; i < inputs.length;i++){
        if(inputs[i].value.trim() === ''){
          inputs[i].style.border="red 2px solid";
          emptyFieldWarning[i].innerText="Este campo esta vacío";
          incompleteFields = true

          if(inputs[i].name === 'phone' && typeof inputs[i].value !== Number){
            console.log(inputs[i],'este es')
            inputs[i].style.border="red 2px solid";
            emptyFieldWarning[i].innerText="Este campo no es un número";
            return false
          }
        }
    }
    if(incompleteFields){
        return false
    }

    
  }
  function submitForm(e){
    e.preventDefault()
    if(validateForm() === false){
        return console.log('Forma no válida')
    }

    fetch('http://www.localhost:5000/newContact',{
      method:'POST',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      }, 
      body:JSON.stringify({firstName,lastName,phoneNumber})
    }).then(()=>{
        resetInputFields()
        getList()
     
    }).catch((e)=>{
        console.log(e)
        console.log('An error was found')
    })
  }
  return (
    <form  className="phone-form flex column" onSubmit={(e)=>{submitForm(e)}}>
      <label>First Name</label>
      <input type="text"  onChange={(e)=>{setFirstName(e.target.value)}} name="firstName"></input>
      <small></small>
      <label>Last Name</label>
      <input type="text"  onChange={(e)=>{setLastName(e.target.value)}} name="lastName"></input>
      <small></small>
      <label>Phone</label>
      <input type="text" onChange={(e)=>{setPhoneNumber(e.target.value)}} name="phone"></input>
      <small></small>
      <button className="self-end">Submit</button>
    </form>
  );
};

const PhoneList = ({getList,currentContactList}) => {
  if(currentContactList.length === 0){
      getList()
  }
  return (
<>
    <table className="phone-list">
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Phone Number</th>
        </tr>
        {currentContactList.map(({firstName,lastName,phoneNumber},index)=>{
          return <tr key={index}>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{phoneNumber}</td>
          </tr>
        })}
      </thead>
    </table>
   <div>
 
   </div>
    </>
  );
};

export default function App() {
  const [currentContactList,setContacts] = useState([])
  function getList(){
    fetch('http://www.localhost:5000').then((res)=>{
      return res.json()
      }).then((fetchedContactList)=>{
            if(fetchedContactList.length !== currentContactList.length){
                setContacts(fetchedContactList)
            }else{
              fetchedContactList.forEach((contact,index)=>{
                //Comparasion entre objetos de cada arreglo
                const fetchedListObjKeys = Object.keys(contact)
                const currentListObjKeys = Object.keys(currentContactList[index])
                if(fetchedListObjKeys.length !== currentListObjKeys.length){
                    setContacts(fetchedContactList)
                }else{
                    fetchedListKeys.forEach((key,index)=>{
                      if(key !== currentListObjKeys[index]){
                          setContacts(fetchedContactList)
                      }
                    })
                }
              })
            }
      })
  }
  return (
    <div>
      <PhoneBook  getList={getList} currentContactList={currentContactList}/>
      <PhoneList getList={getList} currentContactList={currentContactList} />
    </div>
  );
}
