import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import slugify from 'slugify';
import cx from 'classnames';

import {
  tabsContainer,
  list,
  selectedItem,
  listItem,
  link,
} from './PageTabs.module.scss';

export default class PageTabs extends React.Component {
  render() {
    const { tabs, slug } = this.props;
    const newSlug = slug.replace(/[’']/g, ''); // removes any apostrophes from slug
    const currentTab = newSlug.split('/').filter(Boolean).slice(-1)[0];

    const pageTabs = tabs.map((tab) => {
      const tempTab = tab.replace(/[’']/g, ''); // removes any apostrophes from tab
      const slugifiedTab = slugify(tempTab, { lower: true });
      const selected = slugifiedTab === currentTab;
      const currentTabRegex = new RegExp(`(?<!-)${currentTab}(?!-)`);
      // currentTabRegex checks for negative lookbehind: (?<!-) to make sure slug isn't following "-" otherwise that's an incomplete slug
      // currentTabRegex checks for negative lookahead: (?!-) to make sure slug isn't followed by "-" otherwise that's an incomplete slug
      const href = slug.replace(currentTabRegex, slugifiedTab);
      return (
        <li
          key={tempTab}
          className={cx({ [selectedItem]: selected }, listItem)}>
          <Link className={link} to={`${href}`}>
            {tab}
          </Link>
        </li>
      );
    });

    return (
      <div className={tabsContainer}>
        <div className="bx--grid">
          <div className="bx--row">
            <div className="bx--col-lg-12 bx--col-no-gutter">
              <nav>
                <ul className={list}>{pageTabs}</ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PageTabs.propTypes = {
  tabs: PropTypes.array,
  slug: PropTypes.string,
};
