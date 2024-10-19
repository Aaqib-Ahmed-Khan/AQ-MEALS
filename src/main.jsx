// import React from 'react';
// import ReactDOM from 'react-dom/client'; // Import from react-dom/client
// import App from './App';
// import { AuthProvider } from './context/AuthContext'; // Import AuthProvider

// const root = ReactDOM.createRoot(document.getElementById('root')); // Create root

// root.render(
//   <React.StrictMode>
//     <AuthProvider>
//       <App />
//     </AuthProvider>
//   </React.StrictMode>
// );
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext'; 

ReactDOM.render(
  <AuthProvider>
    <App />
  </AuthProvider>,
  document.getElementById('root')
);
