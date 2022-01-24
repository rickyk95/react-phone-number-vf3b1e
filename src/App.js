import { set } from 'mongoose';
import React, { useState, useEffect } from 'react';
import ModifyEntry from './ModifyEntry';
import ErrorDiv from './ErrorDiv'

import './style.css';

const PhoneBook = ({ onSubmit, getList, firstName, setFirstName, lastName, setLastName, phoneNumber, setPhoneNumber }) => {
  const inputs = Array.from(document.querySelectorAll('.phone-form.original input'))
  const emptyFieldWarning = document.querySelectorAll('small')
  function resetInputFields() {
    inputs.forEach((input, index) => {
      index === 2 ? input.value = 0 : input.value = ''
      input.value = '';
      input.style.border = ""
      emptyFieldWarning[index].innerText = "";
      console.log(input)
    })
    setFirstName('')
    setLastName('')
    setPhoneNumber('')
  }
  function validateForm() {
    let incompleteFields;
    let phoneNotANumber;
    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].value.trim() === '') {
        console.log(i)
        inputs[i].style.border = "red 2px solid";
        emptyFieldWarning[i].innerText = "Este campo esta vacío";
        incompleteFields = true
        if (inputs[i].name === 'phone' && typeof inputs[i].value !== Number) {
          inputs[i].style.border = "red 2px solid";
          emptyFieldWarning[i].innerText = "Este campo no es un número";
          return false
        }
      }
    }
    if (incompleteFields) {
      return false
    }
    return true
  }

  function deleteEntry() {

  }

  function submitForm(e) {
    e.preventDefault()
    if (validateForm() === false) {
      return console.log('Forma no válida')
    }
    fetch('http://www.localhost:5000/newContact', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ firstName, lastName, phoneNumber })
    }).then((response) => {
      if(response.status === 409){
       document.querySelector('.error-div').style.display="block"
        return
      }
      resetInputFields()
      getList()
      console.log(1000)
      console.log('no error')
    }).catch((e) => {
      console.log('errorr')
    })
  }

  return (
    <form className="phone-form original flex column" onSubmit={(e) => { submitForm(e) }}>
      <label>First Name</label>
      <input type="text" onChange={(e) => { setFirstName(e.target.value) }} name="firstName"></input>
      <small></small>
      <label>Last Name</label>
      <input type="text" onChange={(e) => { setLastName(e.target.value) }} name="lastName"></input>
      <small></small>
      <label>Phone</label>
      <input type="text" onChange={(e) => { setPhoneNumber(e.target.value) }} name="phone"></input>
      <small></small>
      <button className="self-end">Submit</button>
    </form>
  );
};

const PhoneList = ({ getList, currentContactList, firstName, setFirstName, lastName, setLastName, phoneNumber, setPhoneNumber }) => {
  function modifyEntry(e) {
    const nombre = e.target.parentElement.previousSibling.previousSibling.previousSibling.innerText
    const apellido = e.target.parentElement.previousSibling.previousSibling.innerText
    const phoneNumber = e.target.parentElement.previousSibling.innerText
    const modifyEntry = document.querySelector('.modify-entry')
    modifyEntry.style.display = "block"
    console.log(modifyEntry, 'this is modify entry')
    setFirstName(nombre)
    setLastName(apellido)
    setPhoneNumber(phoneNumber)
  }

  function deleteEntry(e) {
    const nombre = e.target.parentElement.previousSibling.previousSibling.previousSibling.previousSibling.innerText
    const apellido = e.target.parentElement.previousSibling.previousSibling.previousSibling.innerText
    const phoneNumber = e.target.parentElement.previousSibling.previousSibling.innerText
    console.log(nombre, apellido, phoneNumber)
    fetch('http://www.localhost:5000/removeEntry', {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nombre, apellido, phoneNumber })
    }).then(() => {
      getList()
    }).catch((e) => {
      console.log(e)
      console.log('An error was found')
    })

  }

  if (currentContactList.length === 0) {
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
          {currentContactList.map(({ firstName, lastName, phoneNumber }, index) => {
            return <tr key={index}>
              <td>{firstName}</td>
              <td>{lastName}</td>
              <td>{phoneNumber}</td>
              <td><button onClick={(e) => { modifyEntry(e) }}>Editar</button> </td>
              <td><button onClick={(e) => { deleteEntry(e) }}>Eliminar</button></td>
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
  const [currentContactList, setContacts] = useState([])
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  function getList() {
    fetch('http://www.localhost:5000').then((res) => {
      return res.json()
    }).then((fetchedContactList) => {
      console.log(fetchedContactList)
      if (fetchedContactList.length !== currentContactList.length) {
        setContacts(fetchedContactList)
      } else {
        fetchedContactList.forEach((contact, index) => {
          //Comparasion entre objetos de cada arreglo
          console.log(contact, 1000800)
          const fetchedListObjKeys = Object.keys(contact)
          const currentListObjKeys = Object.keys(currentContactList[index])

          if (fetchedListObjKeys.length !== currentListObjKeys.length) {
            setContacts(fetchedContactList)
          } else {
            fetchedListObjKeys.forEach((key, index) => {
              if (fetchedListObjKeys[key] !== currentListObjKeys[index]) {
                console.log(1000)
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
      <PhoneBook getList={getList} currentContactList={currentContactList} firstName={firstName} setFirstName={setFirstName} lastName={lastName} setLastName={setLastName} phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} />
      <PhoneList getList={getList} currentContactList={currentContactList} firstName={firstName} setFirstName={setFirstName} lastName={lastName} setLastName={setLastName} phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} />
      <ModifyEntry getList={getList} firstName={firstName} irstName={firstName} setFirstName={setFirstName} lastName={lastName} setLastName={setLastName} phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} />
      <ErrorDiv/>
    </div>
  );
}


