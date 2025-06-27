import styled from "@emotion/styled";

export const StyledAvatar = styled.div`
  width: ${(props) => props.size || 48}px;
  height: ${(props) => props.size || 48}px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: ${(props) => (props.size || 48) * 0.4}px;
  color: white;
  flex-shrink: 0;
`;
