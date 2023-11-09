import React from 'react'
import ReactDOM from 'react-dom/client'
// import { useValidator } from '@malda/react-validator';

// const TestValidate = () => {
//     const { validate, valid } = useValidator();

//     return (
//         <>
//             <p>
//                 Currently {valid ? "Valid" : "INvalid"}
//             </p>
//             <button onClick={validate}>Validate Here</button>
//         </>
//     )
// }

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <div>
      <h2>Counter with predefined value</h2>
      {/* <TestValidate /> */}
    </div>
  </React.StrictMode>,
)
