/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import "../styles/UserDetails.css";
import LocationOnIcon from "@material-ui/icons/LocationOn";


export default function UserDetails(props) {
  const { userInfo } = props;
  const [starred, setStarred] = useState(0);


  //GET STARS COUNT OF THE USER
  const fetchStarred = async (user) => {
    try {
      const response = await fetch(
        `https://api.github.com/users/${user}/starred`
        );
        const data = await response.json();
        setStarred(data.length);
      } catch (error) {
        console.log(error);
      }
    };
    useEffect(() => {
      fetchStarred(userInfo.login);
    }, [userInfo.login]);
    

    
  return (
    <div className="user-section">
      <img
        className="user-avatar img-fluid"
        src={userInfo.avatar_url}
        alt={userInfo.login}
      />
      <div className="user-details">
        <h1>{userInfo.name}</h1>
        <h3>{userInfo.login}</h3>
        <button className="follow-button">Follow</button>
        <h6>{userInfo.bio}</h6>
      </div>
      <div className="follow-section">
        <a href="#">
          <i className="bi bi-people"></i>
          <strong className="strong">{userInfo.followers}</strong> followers
        </a>{" "}
        ·
        <a>
          <strong className="strong">{userInfo.following}</strong> following
        </a>{" "}
        ·
        <a>
          <i className="bi bi-star"></i>
          <strong className="strong">{starred}</strong>
        </a>
      </div>
      <div className="demographics">
        <LocationOnIcon />
        {userInfo.location}
        <p> Block or Report</p>
      </div>
    </div>
  );
}
