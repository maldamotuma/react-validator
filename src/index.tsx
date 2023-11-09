import React from 'react'
import ReactDOM from 'react-dom/client'
import { useValidator } from '@malda/react-validator'

const App = () => {
    const { validate } = useValidator();
    return (
        <div style={{ width: '600px', margin: '20px auto' }}>
            <h1>my-react-typescript-package</h1>
            <h2>This is the demonstration of how to create github-pages</h2>
            <button onClick={validate}>click me</button>
        </div>
    )
}
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)