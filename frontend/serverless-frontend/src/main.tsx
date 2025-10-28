
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './index.css'
import App from './App.tsx'
import ItemDetails from './ItemDetails.tsx';

// createRoot(document.getElementById('root')!).render(
//   <Router>
//     <div>
//       <Routes>
//         <Route path="/" element={<App />} />
//         <Route path = "/details/:id" element={<ItemDetails />} />
//       </Routes>
//     </div>
//   </Router>
// )
import { AuthProvider } from "react-oidc-context";

const cognitoAuthConfig = {
  authority: "https://cognito-idp.us-east-2.amazonaws.com/us-east-2_q2eI2dZAE",
  client_id: "6nhicjro366enhhnva8f0r46r8",
  redirect_uri: "https://d2m5qnl9omftud.cloudfront.net",
  response_type: "code",
  scope: "email openid phone",
};


createRoot(document.getElementById('root')!).render(
  <AuthProvider {...cognitoAuthConfig}>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/details/:id" element={<ItemDetails />} />
      </Routes>
    </Router>
  </AuthProvider>
)
