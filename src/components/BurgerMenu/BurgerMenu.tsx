import React, { useState } from "react";
import SVG from "react-inlinesvg";
import styled from "styled-components";
import Link from "next/link";
import { fadeIn } from '../../styles/shared';

const Wrapper = styled.div`
  cursor: pointer;
  padding: 1rem;
`;
interface MenuProps {
  show: boolean;
}
const MenuWrapper = styled.div<MenuProps>`
  box-sizing: border-box;
  position: absolute;
  transition: 0.75s ease-in-out max-height;
  max-height: ${({ show }) => (show ? "100%" : "0")};
  width: 100%;
  background-color: #fff;
  top: 50px;
  left: 0;
  & > ul {
    max-height: ${({ show }) => (show ? "100%" : "0")};
  }
  & > ul > li {
    display: ${({ show }) => (show ? "block" : "none")};
    animation: ${fadeIn} 0.75s ease-in-out 1;
  }
`;
const Menu = styled.ul`
  font-size: calc(0.35vw + 16px);
`;
const MenuItem = styled.li`
  display: block;
  color: #222;
  font-size: 1em;
  padding: 1em;
`;
interface PropTypes {
  loggedIn: boolean;
}
const BurgerMenu: React.FC<PropTypes> = ({ loggedIn }) => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <Wrapper onClick={() => setShowMenu(!showMenu)}>
      <SVG
        src="/static/images/menu.svg"
        className={`small-icon ${showMenu ? "active" : ""}`}
      />
      <MenuWrapper show={showMenu}>
        <Menu>
          <Link href="/">
            <MenuItem>Home</MenuItem>
          </Link>
          <Link href="/about">
            <MenuItem>About</MenuItem>
          </Link>
          <Link href="/login">
            <MenuItem>Login / Singup</MenuItem>
          </Link>
          {loggedIn && (
            <>
              <Link href="/user/create">
                <MenuItem>Create Card</MenuItem>
              </Link>
              <Link href="/user/review">
                <MenuItem>Review</MenuItem>
              </Link>
              <Link href="/user/cards">
                <MenuItem>Cards</MenuItem>
              </Link>
            </>
          )}
        </Menu>
      </MenuWrapper>
    </Wrapper>
  );
};

export default BurgerMenu;