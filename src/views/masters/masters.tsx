import React from "react";
import styles from "./masters.module.css";

import masters from "../../data/masters";
import shuffleArray from "../../functions/shuffle-array";
import useChart from "../../hooks/use-chart";

import Button from "./common/button/button";

import type { Master } from "../../data/masters";

const shuffledMasters = shuffleArray(masters);

const MasterCard: React.FC<Master & { index?: number }> = (props) => {
  const chartContainerRef = React.useRef<HTMLDivElement>(null);
  useChart(props.chart, chartContainerRef);
  const mobile = window.innerWidth <= 360;

  const renderCopyButton = (visible: "mobile" | "desktop") => (
    <button
      onClick={() => console.log(props)}
      className={styles.copyButton}
      data-visible={visible}
    >
      Copy Now
    </button>
  );

  return (
    <section className={styles.masterContainer}>
      {props.index != undefined && mobile && (
        <Button {...props} index={props.index} />
      )}
      <div className={styles.dataRow}>
        <div className={styles.dataBlock}>
          <span className={styles.label}>Monthly profit</span>
          <span className={styles.data}>{props.monthly_profit}%</span>
        </div>
        <div className={styles.dataBlock}>
          <span className={styles.label}>Total profit</span>
          <span className={styles.data}>{props.total_profit}%</span>
        </div>
        <div className={styles.dataBlock}>
          <span className={styles.label}>In management</span>
          <span className={styles.data}>{props.capital} USD</span>
        </div>
        {renderCopyButton("desktop")}
      </div>
      <div ref={chartContainerRef} className={styles.chart} />
      {renderCopyButton("mobile")}
    </section>
  );
};

const MastersView: React.FC = () => {
  const [selectedMasterIndex, setSelectedMasterIndex] = React.useState(0);

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Copy the best masters</h1>
      <hr className={styles.delimeter} />
      <div className={styles.content}>
        <nav className={styles.nav}>
          <ul className={styles.list}>
            {shuffledMasters.slice(0, 4).map((master, index) => (
              <li key={master.name}>
                <Button
                  {...master}
                  index={index}
                  selected={
                    master.name == shuffledMasters[selectedMasterIndex].name
                  }
                  onClick={() => setSelectedMasterIndex(index)}
                />
              </li>
            ))}
          </ul>
        </nav>
        <MasterCard
          {...shuffledMasters[selectedMasterIndex]}
          index={selectedMasterIndex}
        />
      </div>
      <hr className={styles.delimeter} />
      <nav className={styles.navDots}>
        <ul className={styles.dotsList}>
          {Array.from({ length: 4 }).map((_, index) => (
            <button
              className={styles.dot}
              key={index}
              onClick={() => setSelectedMasterIndex(index)}
              data-state={selectedMasterIndex == index ? "active" : "unchecked"}
            />
          ))}
        </ul>
      </nav>
    </main>
  );
};

export default MastersView;
