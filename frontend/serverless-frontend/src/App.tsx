// App.js

import { useAuth } from "react-oidc-context";
import Home from "./Home";
import { deleteAccessToken } from "./utils/apis";

function App() {
    const auth = useAuth();

    console.log("auth", auth);

    const signOutRedirect = () => {
      const clientId = "6nhicjro366enhhnva8f0r46r8";
      const logoutUri = "https://d2m5qnl9omftud.cloudfront.net";
      const cognitoDomain = "https://us-east-2q2ei2dzae.auth.us-east-2.amazoncognito.com";
      deleteAccessToken();
      window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
    }


    // const signOutRedirect = () => {
    //     const clientId = "6nhicjro366enhhnva8f0r46r8";
    //     const logoutUri = "http://localhost:5173";
    //     const cognitoDomain = "";
        
    //     window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
    // };

    if (auth.isLoading) {
        return <div>Loading...</div>;
    }

    if (auth.error) {
        return <div>Encountering error... {auth.error.message}</div>;
    }

    if (auth.isAuthenticated) {
        return (
            <>
                <button onClick={() => signOutRedirect()} >Sign out</button>
                <Home />
            </>

        );
    }

    return (
        <div style={{ width: "100vw", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <button onClick={() => auth.signinRedirect()}>Sign in</button>
        </div>
    );
}

export default App;