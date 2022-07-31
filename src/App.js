import React from 'react';
import 'antd/dist/antd.css';
import './App.css';
import { Button } from 'antd';
import { Input, Space, Checkbox, message } from 'antd';

function App() {
  const [formData, setFormData] = React.useState({
    email: '',
    password: ''
  })

  // const [data, setData] = React.useState({});

  function handleChange(event){
    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value
      }
    })
  }

  function handleLogin(){
    fetch('https://reqres.in/api/login', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "email": "eve.holt@reqres.in",
        "password": "cityslicka"
    })
    })
    .then(res => res.json())
    .then(data => {
      if(data['error'] !== undefined){
        message.error(data.error);
      }
      else {
        localStorage.setItem('myToken', data.token);
        message.success("Success !!");
      }
    });
  }

  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  }

  console.log("rendered");

  return (
    <div className="App">
      <header>
        <div className="header">
          <h1 className='title'>ATools<span>.</span></h1>
          <div className="header-btns">
            <Button className='trial-btn'>Start Free Trial</Button>
            <Button className='login-btn'>Login</Button>
          </div>
          </div>
      </header>
      <main className='main'>
        <div className="form-container">
          <div>
            <h1 className="form-header">
              Welcome Back
            </h1>
            <p>Sub-title goes here</p>
            <Space direction="vertical">
              <Input name='email' type='email' placeholder="Email Address *" onChange={handleChange} value={formData.email} />
              <Input.Password name='password' placeholder="Password *" onChange={handleChange} value={formData.password} />
            </Space>
            <Button className='form-btn' block onClick={handleLogin} onTouchStart={handleLogin}>Login</Button>
            <div className="form-pagination">
              <Checkbox onChange={onChange}>Remember password</Checkbox>
              <a href="#" className='forgot-password'>Forgot Password?</a>
            </div>
          </div>
        </div>
        <div className="img-container"></div>
      </main>
    </div>
  );
}

export default App;
