import * as React from 'react';

import FocusZone from '../../utilities/focus/FocusZone';
import './Nav.scss';

export interface INavLink {
  name: string;
  url: string;
  links?: INavLink[];

  [propertyName: string]: any;
}

export interface INavLinkGroup {
  name?: string;
  links: INavLink[];
}

export interface INavProps {
  groups: INavLinkGroup[];
  onRenderLink?: Function;
  onLinkClick?: { (e: React.MouseEvent): boolean };
}

export interface INavState {
  isGroupExpanded: boolean[];
}

export default class Nav extends React.Component<INavProps, INavState> {

  constructor() {
    super();

    this.state = {
      isGroupExpanded: []
    };

    this._onGroupHeaderClicked = this._onGroupHeaderClicked.bind(this);
  }

  public static defaultProps: INavProps = {
    groups: null,
    onRenderLink: (link: INavLink) => (<span className='ms-Nav-linkText'>{ link.name }</span>)
  };

  private static isSelected(link: INavLink): boolean {
    return location.hash === link.url || location.href === link.url;
  }

  public render(): React.ReactElement<{}> {
    const groupElements: React.ReactElement<{}>[] = this.props.groups.map(
      (group: INavLinkGroup, groupIndex: number) => this.renderGroup(group, groupIndex));

    return (
      <FocusZone>
        <nav role='navigation' className='ms-Nav'>
          { groupElements }
        </nav>
      </FocusZone>
    );
  }

  private renderLink(link: INavLink, linkIndex: number): React.ReactElement<{}> {
    return (
      <li key={ linkIndex }>
        <a
          className={'ms-Nav-link' + (Nav.isSelected(link) ? ' is-selected' : '')}
          href={ link.url }
          onClick={ this.props.onLinkClick }
        >
          { this.props.onRenderLink(link) }
        </a> { this.renderLinks(link.links) }
      </li>
    );
  }

  private renderLinks(links: INavLink[]): React.ReactElement<{}> {
    if (!links || !links.length) {
      return null;
    }

    const linkElements: React.ReactElement<{}>[] = links.map(
      (link: INavLink, linkIndex: number) => this.renderLink(link, linkIndex));

    return (
      <ul>
        { linkElements }
      </ul>
    );
  }

  private renderGroup(group: INavLinkGroup, groupIndex: number): React.ReactElement<{}> {
    const isGroupExpanded: boolean = this.state.isGroupExpanded[groupIndex] !== false;

    return (
      <div key={ groupIndex } className={ 'ms-Nav-group' + (isGroupExpanded ? ' is-expanded' : '') }>
        { (group.name ?
        <button
          className='ms-Nav-groupButton'
          data-group-index={ groupIndex }
          onClick={ this._onGroupHeaderClicked }
        >
          <i className='ms-Nav-groupChevron ms-Icon ms-Icon--chevronDown'></i>
          { group.name }
        </button> : null)
        }

        <div className='ms-Nav-groupContent ms-u-slideDownIn20' data-focus-zone-enabled={ isGroupExpanded }>
        { this.renderLinks(group.links) }
        </div>
      </div>
    );
  }

  private _onGroupHeaderClicked(ev): void {
    const groupIndex: number = Number(ev.currentTarget.attributes['data-group-index'].value);
    const currentState: boolean = this.state.isGroupExpanded[groupIndex] !== false;

    this.state.isGroupExpanded[groupIndex] = !currentState;
    this.forceUpdate();
  }
}