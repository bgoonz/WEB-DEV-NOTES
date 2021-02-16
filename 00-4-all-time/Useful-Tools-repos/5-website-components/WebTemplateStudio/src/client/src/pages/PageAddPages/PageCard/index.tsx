import * as React from "react";
import { connect, useDispatch } from "react-redux";
import { injectIntl, InjectedIntlProps } from "react-intl";

import { IProps, IStateProps } from "./interfaces";
import { ISelected } from "../../../types/selected";
import { KEY_EVENTS, ROUTE } from "../../../utils/constants/constants";
import { inferItemName } from "../../../utils/infer/itemName";

import { setPagesAction } from "../../../store/userSelection/pages/action";
import { setDetailPageAction } from "../../../store/config/detailsPage/action";
import { mapStateToProps } from "./store";

import { ReactComponent as Plus } from "../../../assets/plus.svg";
import Icon from "../../../components/Icon";

import messages from "../../messages";
import classNames from "classnames";
import styles from "./styles.module.css";
import cardStyles from "../../cardStyles.module.css";
import pageStyles from "../../cardStyles.module.css";

type Props = IProps & IStateProps & InjectedIntlProps;

const PageCard = (props: Props) => {
  const { page, intl, selectedPages, isModal, pageOutOfBounds } = props;
  const [showPlusIcon, setShowPlusIcon] = React.useState(false);
  const dispatch = useDispatch();

  const addPage = () => {
    const select: ISelected = {
      author: page.author,
      defaultName: page.defaultName,
      icon: page.icon,
      internalName: page.internalName,
      isValidTitle: page.isValidTitle,
      licenses: page.licenses,
      title: inferItemName(page.defaultName, selectedPages),
      id: Math.random().toString(),
      editable: page.editable,
    };

    if (!pageOutOfBounds) {
      const newSelectedPages: ISelected[] = selectedPages.splice(0);
      newSelectedPages.push(select);
      dispatch(setPagesAction(newSelectedPages));
    }
  };

  const addPageIfEnterOrSpace = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const isSelectableCard = event.key === KEY_EVENTS.ENTER || event.key === KEY_EVENTS.SPACE;
    if (isSelectableCard) {
      event.preventDefault();
      addPage();
    }
  };

  const showMoreInfo = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.stopPropagation();
    dispatch(setDetailPageAction(page, false, ROUTE.ADD_PAGES));
  };

  const showDetailIfPressEnterKey = (event: React.KeyboardEvent<HTMLAnchorElement>) => {
    event.stopPropagation();
    if (event.key === KEY_EVENTS.ENTER || event.key === KEY_EVENTS.SPACE) {
      dispatch(setDetailPageAction(page, false, ROUTE.ADD_PAGES));
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={addPage}
      onKeyDown={addPageIfEnterOrSpace}
      className={classNames(cardStyles.container, cardStyles.boundingBox, {
        [cardStyles.selected]:
          selectedPages.filter((selectedPage) => selectedPage.defaultName === page.defaultName).length > 0,
      })}
      onFocus={() => setShowPlusIcon(true)}
      onBlur={() => setShowPlusIcon(false)}
      onMouseLeave={() => setShowPlusIcon(false)}
      onMouseOver={() => setShowPlusIcon(true)}
    >
      <div>
        <div className={cardStyles.gridLayoutCardHeader}>
          <div>
            <Icon name={page.defaultName} icon={page.icon} />
          </div>
          <div className={classNames(pageStyles.title)}>{page.defaultName}</div>
          {showPlusIcon && (
            <div className={classNames(styles.headerIconContainer)}>
              <Plus role="figure" />
            </div>
          )}
        </div>
        <div className={styles.description}>{page.body}</div>
        <div className={cardStyles.gridLayoutCardFooter}>
          <div>
            {!isModal && (
              <a onClick={showMoreInfo} onKeyDown={showDetailIfPressEnterKey} className={cardStyles.link} tabIndex={0}>
                {intl.formatMessage(messages.Preview)}
              </a>
            )}
          </div>
          <div className={styles.pageCounter}>
            {selectedPages.filter((selectedPage) => selectedPage.defaultName === page.defaultName).length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(injectIntl(PageCard));
