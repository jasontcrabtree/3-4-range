/* eslint-disable no-shadow */
import React from 'react';

function useInterval(callback, delay) {
  const intervalRef = React.useRef(null);
  const savedCallback = React.useRef(callback);
  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  React.useEffect(() => {
    const tick = () => savedCallback.current();
    if (typeof delay === 'number') {
      intervalRef.current = window.setInterval(tick, delay);
      return () => window.clearInterval(intervalRef.current);
    }
  }, [delay]);
  return intervalRef;
}

const Stopwatch = () => {
  const [status, setStatus] = React.useState('idle');
  const [timeElapsed, setTimeElapsed] = React.useState(0);
  const [ticks, setTicks] = React.useState(0);
  const [attack, setAttack] = React.useState(timeElapsed);

  // Each attack every 3000ms
  // 3000ms === 5 ticks
  // After 4 ttacks reset

  useInterval(
    () => {
      setTimeElapsed((timeElapsed) => timeElapsed + 0.6);
      setTicks((ticks) => ticks + 1);

      // if (timeElapsed >= 9) {
      //   setTimeElapsed(0);
      // }

      // if (ticks >= 15) {
      //   setTicks(0);
      // }
    },
    status === 'running' ? 600 : null
  );

  useInterval(
    () => {
      setAttack((attack) => attack + 1);

      // if (attack >= 4) {
      //   setAttack(0);
      // }
    },
    status === 'running' ? 3000 : null
  );

  const toggle = () => {
    setTimeElapsed(0);
    setTicks(0);
    setAttack(0);
    setStatus((status) => (status === 'running' ? 'idle' : 'running'));
  };

  const tick = timeElapsed.toFixed(0);

  const time = timeElapsed.toFixed(1);

  return (
    <>
      <p className="text--large">Time Elapsed: [0.6s]</p>
      {/* <p className="text--large">{time} Time</p> */}
      <p className="text--large">{ticks} Ticks</p>
      <p className="text--jumbo">{attack} Attacks</p>
      {/* <p className="text--jumbo">{tick * 3} attacks</p> */}
      {/* <p className="text--jumbo">{(tick * 3).toFixed(1)} attack</p>
      <p className="text--jumbo">{(tick / 3).toFixed(1)} attack</p> */}
      <button type="button" onClick={toggle}>
        {status === 'running' ? 'Stop' : 'Start'}
      </button>
    </>
  );
};

export default function Home() {
  return (
    <main>
      <h1>3-2-1 Range</h1>
      <Stopwatch />
    </main>
  );
}
