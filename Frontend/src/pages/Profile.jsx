import React, { useEffect, useState } from "react";
import axios from "axios";

export default function UserProfile({ user_id }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function fetchUser() {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/users/${user_id}`
        );
        setUser(res.data);
      } catch (error) {
        setUser(null);
        console.log(error);
      }
      setLoading(false);
    }
    fetchUser();
  }, [user_id]);

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>User not found.</p>;

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "20px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      <h2>User Profile</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <tbody>
          <tr>
            <td style={{ padding: "8px", fontWeight: "bold" }}>User ID</td>
            <td style={{ padding: "8px" }}>{user.user_id}</td>
          </tr>
          <tr>
            <td style={{ padding: "8px", fontWeight: "bold" }}>Name</td>
            <td style={{ padding: "8px" }}>{user.name}</td>
          </tr>
          <tr>
            <td style={{ padding: "8px", fontWeight: "bold" }}>Email</td>
            <td style={{ padding: "8px" }}>{user.email}</td>
          </tr>
          <tr>
            <td style={{ padding: "8px", fontWeight: "bold" }}>Phone</td>
            <td style={{ padding: "8px" }}>{user.phone || "N/A"}</td>
          </tr>
          <tr>
            <td style={{ padding: "8px", fontWeight: "bold" }}>Role</td>
            <td style={{ padding: "8px" }}>{user.role || "user"}</td>
          </tr>
          <tr>
            <td style={{ padding: "8px", fontWeight: "bold" }}>
              Account Created
            </td>
            <td style={{ padding: "8px" }}>
              {new Date(user.created_at).toLocaleString()}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
