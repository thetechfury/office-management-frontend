 'use client'
import { useState, useEffect } from 'react';

const BASE_URL = 'http://127.0.0.1:8000';

const useFetchUserRole = () => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${BASE_URL}/user/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Token ${token}`,
          },
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setRole(data.user.role); // Set role in state
      } catch (error) {
        setError(error.message);
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, []);

  return { role, loading, error };
};

export default useFetchUserRole;

// import React, { useEffect, useState } from 'react';
// import {head} from "axios";
//  const BASE_URL = 'http://127.0.0.1:8000';
// const UserComponent = ({ onRoleReceived }) => {
//   const [userData, setUserData] = useState(null);
//
//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await fetch(`${BASE_URL}/user/`,{
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Accept': 'application/json',
//                 'Authorization': `Token ${token}`,
//             },
//             credentials: 'include',
//         });
//
//         if (!response.ok) {
//           throw new Error('Failed to fetch data');
//         }
//         const data = await response.json();
//         setUserData(data); // Assuming data structure matches your API response
//           if (onRoleReceived) {
//           onRoleReceived(data.user.role);
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };
//
//     fetchUserData();
//   }, [onRoleReceived]); // Empty dependency array ensures this effect runs only once
//
//   // Render based on userData
//   return (
//       <div>
//           <div>
//               {userData ? (
//                   <div>
//                       <h2>User Data</h2>
//                       <p>Number of active users: {userData.number_of_active_users}</p>
//                       <p>Total users: {userData.total_users}</p>
//                       <p>Total teams: {userData.total_teams}</p>
//                       {/* Render other data as needed */}
//                       <h3>User Details</h3>
//                       <p>Email: {userData.user.email}</p>
//                       <p>Role: {userData.user.role}</p>
//                       <p>Full Name: {userData.user.full_name}</p>
//                       {/* Render other user details */}
//                   </div>
//               ) : (
//                   <p>Loading...</p>
//               )}
//           </div>
//           {userData && (
//               <div>
//                   <h2>User Data</h2>
//                   <p>Number of active users: {userData.number_of_active_users}</p>
//                   <p>Total users: {userData.total_users}</p>
//                   <p>Total teams: {userData.total_teams}</p>
//
//                   <h3>All Users</h3>
//                   <ul>
//                       {userData.all_users.map((user, index) => (
//                           <li key={index}>
//                               <h4>{user.full_name}</h4>
//                               <p>Email: {user.email}</p>
//                               <p>Role: {user.role}</p>
//                               <p>Date Joined: {user.date_joined}</p>
//                               {/* Render other user details as needed */}
//                           </li>
//                       ))}
//                   </ul>
//
//                   {/* Render other fields if needed */}
//                   <h3>Other Fields</h3>
//                   <pre>{JSON.stringify(userData, null, 2)}</pre>
//               </div>
//           )}
//       </div>
//   );
// };
//
// export default UserComponent;
