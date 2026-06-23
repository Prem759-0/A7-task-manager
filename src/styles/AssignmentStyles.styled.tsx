import styled from "@emotion/styled";

export const BrutalContainer = styled.div`
  background-color: #ffffff;
  border: 4px solid #000000;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 8px 8px 0px #000000;
  margin-bottom: 30px;
  position: relative;
  overflow: hidden;
  color: #000000;

  &.bg-yellow {
    background-color: #fde047;
  }
  &.bg-pink {
    background-color: #f9a8d4;
  }
  &.bg-blue {
    background-color: #93c5fd;
  }
  &.bg-green {
    background-color: #86efac;
  }
`;

export const ComicHeading = styled.h2`
  font-family: "Comic Sans MS", "Chalkboard SE", "Comic Neue", sans-serif;
  font-size: 2rem;
  font-weight: 900;
  text-transform: uppercase;
  color: #ffffff;
  text-shadow:
    3px 3px 0 #000,
    -1px -1px 0 #000,
    1px -1px 0 #000,
    -1px 1px 0 #000,
    1px 1px 0 #000;
  margin-bottom: 20px;
  letter-spacing: 2px;
`;

export const BrutalButton = styled.button`
  background-color: #ff3e00;
  color: #ffffff;
  font-weight: bold;
  font-size: 1rem;
  padding: 10px 20px;
  border: 3px solid #000000;
  border-radius: 4px;
  box-shadow: 4px 4px 0px #000000;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  margin: 5px;

  &:hover {
    transform: translate(2px, 2px);
    box-shadow: 2px 2px 0px #000000;
  }

  &:active {
    transform: translate(4px, 4px);
    box-shadow: 0px 0px 0px #000000;
  }

  &.action {
    background-color: #3b82f6;
  }
  &.danger {
    background-color: #ef4444;
  }
  &.success {
    background-color: #22c55e;
  }
  &.warning {
    background-color: #eab308;
  }
`;

export const SpeechBubble = styled.div`
  position: absolute;
  top: -15px;
  right: -15px;
  background-color: #ffffff;
  border: 3px solid #000000;
  border-radius: 50%;
  padding: 15px;
  font-weight: 900;
  font-size: 1.2rem;
  color: #ff0000;
  transform: rotate(15deg);
  box-shadow: 3px 3px 0px #000000;
  z-index: 10;
  font-family: "Comic Sans MS", sans-serif;

  &:after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 10px;
    border-width: 10px 10px 0 0;
    border-style: solid;
    border-color: #000 transparent transparent transparent;
    transform: rotate(25deg);
  }
`;

export const BrutalInput = styled.input`
  padding: 10px;
  border: 3px solid #000;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  box-shadow: 3px 3px 0px #000;
  margin: 10px 0;
  width: 100%;
  max-width: 300px;

  &:focus {
    outline: none;
    background-color: #fef08a;
  }
`;

export const BrutalCode = styled.pre`
  background-color: #1e293b;
  color: #f8fafc;
  padding: 15px;
  border: 3px solid #000;
  border-radius: 4px;
  box-shadow: 4px 4px 0px #000;
  font-family: monospace;
  font-size: 0.9rem;
  overflow-x: auto;
  margin: 10px 0;
`;

export const FlowchartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin: 20px 0;
`;

export const FlowchartCard = styled.div`
  background: #ffffff;
  border: 3px solid #000;
  padding: 10px 20px;
  font-weight: bold;
  box-shadow: 3px 3px 0px #000;
  text-align: center;
  width: 250px;

  &.html {
    background: #fca5a5;
  }
  &.css {
    background: #93c5fd;
  }
  &.dom {
    background: #86efac;
  }
  &.render {
    background: #fde047;
  }
`;

export const FlowArrow = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

export const TaskListCard = styled.div`
  background: #ffffff;
  border: 3px solid #000;
  padding: 10px;
  margin: 5px 0;
  box-shadow: 2px 2px 0px #000;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.1s ease;

  &:hover {
    background: #f1f5f9;
  }
`;
