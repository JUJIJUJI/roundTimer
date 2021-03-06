import { useContext, useEffect } from "react";
import SetPomodoro from "./components/SetPomodoro";
import logo from "./logo.svg";
import styled, { keyframes } from "styled-components";
import { SettingsContext } from "./context/SettingsContext";
import Button from "./components/Button";
import CountdownAnimation from "./components/CountdownAnimation";

const showAnimate = keyframes`
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  `;

const Splash = styled.div`
  transform: translateY(50%);
  animation: ${showAnimate} ease-in-out 1s infinite;
  animation-iteration-count: 1;
  animation-delay: 1.5s;
  animation-fill-mode: forwards;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Small = styled.small`
  font-size: 1rem;
  padding: 30px 0px 0px 0px;
  margin-bottom: -15px;
  display: block;
`;

const App = () => {
  const {
    pomodoro,
    executing,
    setCurrentTimer,
    SettingBtn,
    children,
    startAnimate,
    startTimer,
    updateExecute,
    pauseTimer,
  } = useContext(SettingsContext);

  useEffect(() => {
    updateExecute(executing);
  }, [executing, startAnimate]);

  return (
    <div className="container">
      {pomodoro === 0 ? (
        <>
          <Splash>
            <img src={logo} className="App-logo" alt="logo" />
            <Small>집중하고 싶은 사람들을 위한</Small>
            <h1>Round-Timer</h1>
          </Splash>
          <SetPomodoro />
        </>
      ) : (
        <>
          <ul className="labels">
            <li>
              <Button
                title="Work"
                activeClass={
                  executing.active === "work" ? "active-label" : undefined
                }
                _callback={() => {
                  setCurrentTimer("work");
                }}
              />
              <Button
                title="break"
                activeClass={
                  executing.active === "break" ? "active-label" : undefined
                }
                _callback={() => {
                  setCurrentTimer("break");
                }}
              />
            </li>
          </ul>
          <Button title="Settings" _callback={SettingBtn} />
          <div className="time-container">
            <div className="time-wrapper">
              <div className="time-spot"></div>
              <div className="time-spot">
                <span></span>
              </div>
              <div className="time-spot"></div>
              <div className="time-spot">
                <span></span>
              </div>
              <CountdownAnimation
                // key={pomodoro}
                timer={pomodoro}
                animate={startAnimate}
              >
                {children}
              </CountdownAnimation>
              <div className="time-spot">
                <span></span>
              </div>
              <div className="time-spot"></div>
              <div className="time-spot">
                <span></span>
              </div>
              <div className="time-spot"></div>
            </div>
          </div>
          <div className="button-wrapper">
            <Button
              title="Start"
              className={!startAnimate ? "active" : undefined}
              _callback={startTimer}
            />
            <Button
              title="Pause"
              className={startAnimate ? "active" : undefined}
              _callback={pauseTimer}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default App;
