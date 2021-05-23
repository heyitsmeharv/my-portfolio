import styled, { css } from "styled-components";
import { motion } from "framer-motion";

export const StyledButton = styled(motion.button)`
  background: none;
  outline: none !important;
  border: none;
  :hover {
    cursor: pointer;
  }
`;

export const DownloadCVButton = styled(motion.button)`
  width: 20rem;
  height: 5rem;
  margin-top: 3rem;
  font-size: 16px;
  font-weight: 800;
  text-transform: uppercase;
  border: 2px solid;
  border-color: ${({ theme }) => theme.background};
  border-radius: 2px;
  background: none;
  outline: none;
  color: ${({ theme }) => theme.text};
  :hover {
    background: ${({ theme }) => theme.secondary};
    color: ${({ theme }) => theme.text};
  }
  :focus {
    text-decoration: underline;
  }
  @media only screen and (max-width: 375px) {
    width: 100%;
    font-size: 14px;
  }
`;

export const ContactMeButton = styled(motion.button)`
  width: 20rem;
  margin-top: 3rem;
  margin-right: 3rem;
  font-size: 16px;
  font-weight: 800;
  text-transform: uppercase;
  border: none;
  outline: none;
  background: ${({ theme }) => theme.text};
  color: ${({ theme }) => theme.primary};
  :focus {
    text-decoration: underline;
  }
  @media only screen and (max-width: 375px) {
    width: 100%;
    font-size: 14px;

  }
`;

export const ContactMeSendButton = styled(motion.button)`
  height: 50px;
  min-width: 180px;
  padding: 0 20px;
  background-color: ${({ theme }) => theme.accent};
  border-radius: 2px;
  color: ${({ theme }) => theme.primary};
  display: inline-block;
  text-align: center;
  font-size: 16px;
  font-weight: 800;
  text-transform: uppercase;
  line-height: 44px;
  margin: 30px 14px;
  border: 2px solid ${({ theme }) => theme.accent};
  :hover {
    background: ${({ theme }) => theme.secondary};
    color: ${({ theme }) => theme.accent};
  }
  ${props => props.disabled && css`
    cursor: not-allowed;
    pointer-events: none;
    border: 1px solid #999999;
    background-color: #cccccc;
    color: #666666;
    :hover {
      background: #cccccc;
      color: #666666;
    }
  `}
`;

export const CommentSendButton = styled(motion.button)`
  padding: 0 20px;
  background-color: ${({ theme }) => theme.accent};
  border-radius: 2px;
  color: ${({ theme }) => theme.primary};
  display: inline-block;
  text-align: center;
  font-size: 16px;
  font-weight: 800;
  text-transform: uppercase;
  line-height: 44px;
  border: 2px solid ${({ theme }) => theme.primary};
  :hover {
    background: ${({ theme }) => theme.secondary};
    color: ${({ theme }) => theme.accent};
  }
  ${props => props.disabled && css`
    cursor: not-allowed;
    pointer-events: none;
    border: 1px solid #999999;
    background-color: #cccccc;
    color: #666666;
    :hover {
      background: #cccccc;
      color: #666666;
    }
  `}
`;

export const CommentCancelButton = styled(motion.button)`
  padding: 0 20px;
  border-radius: 2px;
  display: inline-block;
  text-align: center;
  font-size: 16px;
  font-weight: 800;
  text-transform: uppercase;
  line-height: 44px;
  background: none;
  outline: none !important;
  border: none;
  :hover {
    cursor: pointer;
  }
`;

export const ToastCloseButton = styled.button`
  width: 25px;
  height: 25px;
  color: white;
  background: none;
  outline: none;
  border: none;
  margin-left: auto;
`;