import React, { useState, useEffect, EffectCallback } from "react";
import styled from "styled-components";
import Link from "next/link";
import Modal from "../components/Modal";
import LoginForm from "../components/LoginForm";
import SVG from "react-inlinesvg";
import UserIcon from "../components/Icons/UserIcon";
import { SVGWrapper, colors } from "../../utils/style";

interface PropTypes {
  loggedIn?: boolean;
}
interface MenuProps {
  expanded?: boolean;
}
const DropDownWrapper = styled.div`
  position: relative;
  display: inline-block;
  align-items: center;
  padding: 0 1rem;
  margin: 0 auto;
`;

const DropdownMenu = styled.div<MenuProps>`
  border: none;
  min-width: 160px;
  padding: 0.75rem 0;
  background-color: ${colors.brandLight};
  border-radius: 3px;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.1);
  transform: ${({ expanded }): string => (expanded ? "scale(1)" : "scale(0)")};
  transform-origin: top right;
  transition: transform 300ms ease;
  flex-direction: column;
  align-items: center;
  position: absolute;
  right: 20px;
  z-index: 100;
`;

const LinkWrapper = styled.div`
  height: 2.5em;
  width: 100%;
  display: flex;
  align-items: center;
  &:hover {
    cursor: pointer;
    background: #a72ffb;
  }
`;
const StyledLink = styled.a`
  font-size: 1em;
  font-weight: 600;
  padding: 0 1rem;
  color: ${colors.white}cc;
  text-decoration: none;
`;
const ImportantLink = styled(StyledLink)`
  border: 1px solid #0f76fc;
  border-radius: 3px;
  color: #0f76fc;
  padding: 0.5rem 1.5rem;
  font-size: 1em;
  cursor: pointer;
`;
const OverlayDiv = styled.div`
  height: 100vh;
  width: 100vw;
  background: transparent;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
`;
const StyledIcon = styled(UserIcon)`
  height: 24px;
  width: 24px;
  cursor: pointer;
`;

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  parentProps: {};
}
const ToggleableMenu: React.FunctionComponent<PropTypes> = (
  props,
): JSX.Element => {
  const [expanded, setExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { loggedIn } = props;
  const getModalProps = (): ModalProps => {
    return {
      isOpen: showModal,
      closeModal: (): void => {
        setShowModal(!showModal);
      },
      parentProps: { ...props },
    };
  };
  useEffect((): EffectCallback => {
    const collapse = (): void => {
      setExpanded(false);
    };
    const main = document.getElementById("main");
    if (main) {
      main.addEventListener("click", collapse);
    }
    return (): void => {
      main ? main.removeEventListener("click", collapse) : null;
    };
  }, []);
  const handleToggleClick = (): void => {
    setExpanded(!expanded);
  };
  if (loggedIn) {
    return (
      <DropDownWrapper>
        <StyledIcon onClick={handleToggleClick} height={24} width={24} />
        {expanded && <OverlayDiv onClick={handleToggleClick} />}
        <DropdownMenu expanded={expanded}>
          <LinkWrapper>
            <Link href="/user/profile">
              <StyledLink onClick={handleToggleClick}>Profile</StyledLink>
            </Link>
          </LinkWrapper>
          <LinkWrapper>
            <StyledLink href="/user/logout" onClick={handleToggleClick}>
              Logout
            </StyledLink>
          </LinkWrapper>
        </DropdownMenu>
      </DropDownWrapper>
    );
  } else {
    return (
      <DropDownWrapper>
        <ImportantLink
          onClick={(): void => {
            setShowModal(true);
          }}
        >
          Login
        </ImportantLink>
        {showModal && (
          <Modal {...getModalProps()}>
            <LoginForm />
          </Modal>
        )}
      </DropDownWrapper>
    );
  }
};

ToggleableMenu.defaultProps = {
  loggedIn: false,
};

export default React.memo(ToggleableMenu);
