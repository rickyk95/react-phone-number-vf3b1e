import React from 'react';
import './style.css';

const PhoneBook = ({ onSubmit }) => {
  let response;
  return (
    <form className="phone-form flex column">
      <label>First Name</label>
      <input type="text" name="firstName"></input>
      <label>Last Name</label>
      <input type="text" name="lastName"></input>
      <label>Phone</label>
      <input type="text" name="phone"></input>
      <button className="self-end">Submit</button>
    </form>
  );
};

const PhoneList = () => {
  return (
    <table className="phone-list">
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Phone Number</th>
        </tr>
      </thead>
    </table>
  );
};

export default function App() {
  return (
    <div>
      <PhoneBook />
      <PhoneList />
    </div>
  );
}
