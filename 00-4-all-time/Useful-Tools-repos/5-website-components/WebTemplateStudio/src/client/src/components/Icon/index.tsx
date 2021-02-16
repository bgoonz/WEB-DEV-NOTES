import * as React from "react";

import styles from "./styles.module.css";
import { ReactComponent as DefaultIconSVG } from "../../assets/defaultIcon.svg";

export interface IIconProps {
  name: string;
  icon: string;
  small?: boolean;
}

const Icon = ({ name, icon, small = false }: IIconProps) => {
  return (
    <>
      {icon !== null && (
        <img className={small ? styles.small : styles.icon} alt={name} src={"data:image/svg+xml;base64," + icon} />
      )}
      {icon === null && <DefaultIconSVG className={small ? styles.small : styles.icon} />}
    </>
  );
};

export default Icon;
