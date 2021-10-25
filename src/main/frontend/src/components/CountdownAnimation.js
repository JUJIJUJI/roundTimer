import { useContext } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { SettingsContext } from "../context/SettingsContext";

const CountdownAnimation = ({ key, timer, animate, children }) => {
  const { stopAnimate } = useContext(SettingsContext);

  return (
    <CountdownCircleTimer
      // key={key}
      isPlaying={animate}
      size={250}
      duration={timer * 60}
      colors={[
        ["#0033C4", 0.5],
        ["#ff33C4", 0.5],
      ]}
      strokeWidth={70}
      trailColor="#eeeeee"
      onComplete={() => {
        stopAnimate();
      }}
    >
      {children}
    </CountdownCircleTimer>
  );
};

export default CountdownAnimation;
