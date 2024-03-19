import React from "react";
import { useAuth } from "../contexts/AuthContext";

function Profile() {
  const { currentUser } = useAuth();
  console.log(currentUser)
  return (
    <div>
      <h1>Tableau de bord</h1>
      {currentUser && <p>Bonjour, {currentUser.email}</p>}
    </div>
  );
}

export default Profile