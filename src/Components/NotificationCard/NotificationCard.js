import React from 'react'
import { Link } from 'react-router-dom';
import "./NotificationCard.css";

function NotificationCard() {
  return (
    <>
        <Link to="/downloadstatus" className="notification-card">
            <h4>Title</h4>
            <h6>11:32 pm 12 Dec</h6>
            <p>
                It is a long established fact that a reader will be distracted by the readable content of 
                a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less
                normal distribution of letters
            </p>
        </Link>
    </>
  )
}

export default NotificationCard