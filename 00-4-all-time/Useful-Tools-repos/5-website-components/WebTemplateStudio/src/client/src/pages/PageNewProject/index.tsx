import * as React from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";

import ProjectDetails from "../../components/ProjectDetails";

import styles from "./styles.module.css";
import messages from "./messages";

type Props = InjectedIntlProps;

const NewProject = (props: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.newProjectInfo}>
        <h1 className={styles.header}>{props.intl.formatMessage(messages.header)}</h1>
        <div className={styles.body}>{props.intl.formatMessage(messages.body)}</div>
        <div className={styles.projectDetailsContainer}>
          <ProjectDetails />
        </div>
      </div>
    </div>
  );
};

export default injectIntl(NewProject);
