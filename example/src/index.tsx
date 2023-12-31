import React, { FormEvent } from 'react'
import ReactDOM from 'react-dom/client'
import { rulesAndMessagedType, useValidator } from '@malda/react-validator'
import validator from 'validator'
import './style.css'
// import { rulesAndMessagedType, useValidate } from './useValidate'

const rules: rulesAndMessagedType = {
  rules: {
    required: ['required'],
    name: ['required', 'name'],
    email: ['required', 'email'],
    full_name: ['required', 'full_name'],
    portfolio_link: ['required', 'url'],
    description: ['required'],
  },

  messages: {
    name: ['Maqaa kee galchi horii'],
  },

  custom: {
    rules: {
      free: (in_val: string) => {
        return validator.matches(in_val, /^0[79][0-9]{8}$/g)
      },
    },
    messages: {
      required: 'Enter Phone number dUDE',
      free: 'It is free man',
    },
  },

  files: {
    rules: {
      image: {
        required: true,
        type: ["image/png", "application/zip"],
        max: 3,
        maxSize: 2048
      }
    },
    messages: {
      image: {
        max: "waan baay'ee galchiteem",
        maxSize: "Megabaaytii xiqqoo galchi",
      }
    }
  }
}
const TestValidate = () => {
  const { validate } = useValidator('malda-react-validator', rules)

  const handle_submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    validate(() => {
      alert('Valid and Submitting')
    })
  }

  return (
    <>
      <div className='wrapper'>
        <h2>@malda/react-validator</h2>
        <form id='malda-react-validator' onSubmit={handle_submit}>
          <div className='input-box' id='input-free'>
            <input type='text' name='free' placeholder='Enter your free data' />
          </div>
          <div className='input-box' id='input-required'>
            <input type='text' name='required' placeholder='Enter your required data' />
          </div>
          <div className='input-box' id='input-name'>
            <input type='text' name='name' placeholder='Enter your name' />
          </div>
          <div className='input-box' id='input-email'>
            <input type='text' name='email' placeholder='Enter your email' />
          </div>
          <div className='input-box' id='input-full_name'>
            <input type='text' name='full_name' placeholder='Full Name' />
          </div>
          <div className='input-box' id='input-portfolio_link'>
            <input type='text' placeholder='portfolio link' name='portfolio_link' />
          </div>
          <div className='input-box' id='input-description'>
            <textarea placeholder='portfolio link' name='description' rows={3} />
          </div>
          <div className='input-box' id='input-image'>
            <input type='file' name='image' multiple />
          </div>
          <div className='input-box button'>
            <input type='Submit' value='validate' />
          </div>
        </form>
      </div>
    </>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <div>
      <TestValidate />
    </div>
  </React.StrictMode>,
)
