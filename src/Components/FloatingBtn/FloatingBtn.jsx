import React from "react";
import {
  Container,
  Button,
  Link,
  lightColors,
  darkColors,
} from "react-floating-action-button";
import { NavLink } from "react-router-dom";

function FloatingBtn() {
  return (
    <Container className="conti">
      <Link
        tooltip="Create Reservation"
        icon="fa-solid fa-calendar-days"
        className="mNavLink"
      >
        <NavLink to="/reservations/create" className="sNavLink"></NavLink>
      </Link>

      <Link
        href="/hotels/create"
        tooltip="Create Hotel"
        icon="fa-solid fa-hotel"
        styles={{
          backgroundColor: darkColors.yellow,
          color: lightColors.white,
        }}
      >
        <NavLink to="/hotels/create" className="sNavLink"></NavLink>
      </Link>

      <Link
        href="/banks/create"
        tooltip="Create Bank"
        icon="fa-solid fa-building-columns"
        styles={{
          backgroundColor: darkColors.yellow,
          color: lightColors.white,
        }}
      >
        <NavLink to="/banks/create" className="sNavLink"></NavLink>
      </Link>

      <Link
        href="/clients/create"
        tooltip="Create Client"
        icon="fa-solid fa-users"
        styles={{
          backgroundColor: darkColors.yellow,
          color: lightColors.white,
        }}
      >
        <NavLink to="/clients/create" className="sNavLink"></NavLink>
      </Link>

      <Link
        href="/users/create"
        tooltip="Create user"
        icon="fa-solid fa-user"
        styles={{
          backgroundColor: darkColors.yellow,
          color: lightColors.white,
        }}
      >
        <NavLink to="/users/create" className="sNavLink"></NavLink>
      </Link>

      <Link
        href="/collections/create"
        tooltip="Create Collection"
        icon="fa-regular fa-money-bill-1"
        styles={{
          backgroundColor: darkColors.yellow,
          color: lightColors.white,
        }}
      >
        <NavLink to="/collections/create" className="sNavLink"></NavLink>
      </Link>

      <Button
        icon="fas fa-plus"
        rotate={true}
        styles={{
          backgroundColor: darkColors.yellow,
          color: lightColors.white,
        }}
      />
    </Container>
  );
}

export default FloatingBtn;
