import React from "react";
import styles from "./button.module.css";

import type { Master } from "../../../../data/masters";

const Button: React.FC<
  Pick<Master, "name" | "monthly_profit" | "flag"> & {
    index: number;
    selected?: boolean;
    onClick?: () => void;
  }
> = ({ name, monthly_profit, flag, index, selected, onClick }) => {
  return (
    <button
      className={styles.container}
      onClick={onClick}
      data-state={selected ? "selected" : "unchosen"}
    >
      <img className={styles.logo} src={flag} />
      <span className={styles.content}>
        <span className={styles.name}>
          {index + 1}. {name}
        </span>
        <span className={styles.profit}>+ {monthly_profit}%</span>
      </span>
    </button>
  );
};

export default Button;
