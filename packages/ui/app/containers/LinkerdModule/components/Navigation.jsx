import { daemonsetIcon, deploymentIcon, githubIcon, jobIcon, linkerdWordLogo, namespaceIcon, podIcon, replicaSetIcon, slackIcon, statefulSetIcon } from './util/SvgWrappers.jsx';
import AppBar from '@material-ui/core/AppBar';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Badge from '@material-ui/core/Badge';
import BreadcrumbHeader from './BreadcrumbHeader.jsx';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import EmailIcon from '@material-ui/icons/Email';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import { Link } from 'react-router-dom';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import NamespaceConfirmationModal from './NamespaceConfirmationModal.jsx';
import PropTypes from 'prop-types';
import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Version from './Version.jsx';
import _maxBy from 'lodash/maxBy';
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import { faCloud } from '@fortawesome/free-solid-svg-icons/faCloud';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons/faExternalLinkAlt';
import { faFilter } from '@fortawesome/free-solid-svg-icons/faFilter';
import { faMicroscope } from '@fortawesome/free-solid-svg-icons/faMicroscope';
import { faRandom } from '@fortawesome/free-solid-svg-icons/faRandom';
import { faSmile } from '@fortawesome/free-regular-svg-icons/faSmile';
import { faStream } from '@fortawesome/free-solid-svg-icons/faStream';
import grey from '@material-ui/core/colors/grey';
import { processSingleResourceRollup } from './util/MetricUtils.jsx';
import { regexFilterString } from './util/Utils.js';
import { withContext } from './util/AppContext.jsx';
import { withStyles } from '@material-ui/core/styles';
import yellow from '@material-ui/core/colors/yellow';

const jsonFeedUrl = "https://linkerd.io/dashboard/index.json";
const localStorageKey = "linkerd-updates-last-clicked";
const minBrowserWidth = 960;

const styles = theme => {
  const drawerWidth = theme.spacing.unit * 38;
  const navLogoWidth = theme.spacing.unit * 22.5;
  const contentPadding = theme.spacing.unit * 3;

  const enteringFn = prop => theme.transitions.create(prop, {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  });
  const leavingFn = prop => theme.transitions.create(prop, {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  });

  const entering = enteringFn('width');
  const leaving = leavingFn('width');

  return {
    root: {
      display: 'flex',
    },
    appBar: {
      alignItems: "center",
      position: "permanent",
      color: 'white',
      transition: leaving,
    },
    bars: {
      color: 'white',
      position: "fixed",
      left: theme.spacing.unit * 2.5,
    },
    breadcrumbs: {
      color: 'white',
      marginLeft: `${drawerWidth}px`
    },
    drawer: {
      width: drawerWidth,
      transition: entering,
    },
    toolbar: theme.mixins.toolbar,
    navToolbar: {
      display: 'flex',
      alignItems: 'center',
      padding: `0 0 0 ${theme.spacing.unit*2}px`,
      boxShadow: theme.shadows[4], // to match elevation == 4 on main AppBar
      ...theme.mixins.toolbar,
      backgroundColor: theme.palette.primary.main,
    },
    content: {
      flexGrow: 1,
      width: `calc(100% - ${drawerWidth}px)`,
      backgroundColor: theme.palette.background.default,
      padding: contentPadding,
      transition: entering,
    },
    linkerdNavLogo: {
      margin: 'auto',
      width: `${navLogoWidth}px`,
      transition: enteringFn(['margin', 'opacity']),
    },
    linkerdMobileLogo: {
      width: `${navLogoWidth}px`,
    },
    namespaceChangeButton: {
      marginLeft: `${drawerWidth * .075}px`,
      marginTop: "11px",
      width: `${drawerWidth * .8}px`,
    },
    navMenuItem: {
      paddingLeft: `${contentPadding}px`,
      paddingRight: `${contentPadding}px`,
    },
    shrinkIcon: {
      fontSize: "19px",
      paddingLeft: "3px",
      paddingRight: "3px",
    },
    shrinkCloudIcon: {
      fontSize: "18px",
      paddingLeft: "1px",
    },
    // color is consistent with Octopus Graph coloring
    externalLinkIcon: {
      color: grey[500],
    },
    sidebarHeading: {
      color: grey[500],
      outline: "none",
      paddingTop: "9px",
      paddingBottom: "9px",
      marginLeft: `${drawerWidth * .09}px`,
    },
    badge: {
      backgroundColor: yellow[500],
    }
  };
};

class NavigationBase extends React.Component {
  constructor(props) {
    super(props);
    this.api = this.props.api;
    this.handleApiError = this.handleApiError.bind(this);

    this.state = this.getInitialState();
    this.loadFromServer = this.loadFromServer.bind(this);
  }

  getInitialState() {
    return {
      anchorEl: null,
      mobileSidebarOpen: false,
      namespaceMenuOpen: false,
      newNamespace: '',
      namespaceFilter: '',
      formattedNamespaceFilter: '',
      hideUpdateBadge: true,
      latestVersion: '',
      isLatest: true,
      namespaces: [],
      pendingRequests: false,
      pollingInterval: 10000,
      loaded: false,
      error: null,
      showNamespaceChangeDialog: false,
    };
  }

  componentDidMount() {
    this.loadFromServer();
    this.timerId = window.setInterval(this.loadFromServer, this.state.pollingInterval);
  }

  componentWillUpdate() {
    if (this.props.history) {
      this.props.checkNamespaceMatch(this.props.history.location.pathname);
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
    window.clearInterval(this.timerId);
    this.api.cancelCurrentRequests();
  }

  // API returns namespaces for namespace select button. No metrics returned.
  loadFromServer() {
    if (this.state.pendingRequests) {
      return;
    }
    this.setState({ pendingRequests: true });

    let apiRequests = [
      this.api.fetchMetrics(this.api.urlsForResourceNoStats("namespace"))
    ];

    this.api.setCurrentRequests(apiRequests);

    Promise.all(this.api.getCurrentPromises())
      .then(([allNs]) => {
        let namespaces = processSingleResourceRollup(allNs);
        this.setState({
          namespaces,
          pendingRequests: false,
          error: null
        });
      })
      .catch(this.handleApiError);
  }

  handleApiError(e) {
    this.setState({
      error: e
    });
  }

  handleNamespaceChange = (event, namespace) => {
    // ensure that mobile drawer will not close on click
    event.stopPropagation();
    this.setState({ namespaceMenuOpen: false });
    if (namespace === this.props.selectedNamespace) {
      return;
    }
    let path = this.props.history.location.pathname;
    let pathParts = path.split("/");
    if (pathParts.length === 3 || pathParts.length === 4) {
      // path is /namespaces/someNamespace/resourceType
      //      or /namespaces/someNamespace
      path = path.replace(this.props.selectedNamespace, namespace);
      this.props.history.push(path);
      this.props.updateNamespaceInContext(namespace);
    } else if (pathParts.length === 5) {
      // path is /namespace/someNamespace/resourceType/someResource
      this.setState({ showNamespaceChangeDialog: true,
        newNamespace: namespace });
    } else {
      // update the selectedNamespace in context with no path changes
      this.props.updateNamespaceInContext(namespace);
    }
  }

  menuItem(path, title, icon, onClick) {
    const { classes, api } = this.props;
    let normalizedPath = this.props.location.pathname.replace(this.props.pathPrefix, "");
    let isCurrentPage = path => path === normalizedPath;

    return (
      <MenuItem
        component={Link}
        onClick={onClick}
        to={api.prefixLink(path)}
        className={classes.navMenuItem}
        selected={isCurrentPage(path)}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={title} />
      </MenuItem>
    );
  }

  render() {
    const { api, classes, selectedNamespace, ChildComponent, ...otherProps } = this.props;

    return (
      <div className={classes.root}>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <div>
            <ChildComponent {...otherProps} />
          </div>
        </main>
      </div>
    );
  }
}

NavigationBase.propTypes = {
  api: PropTypes.shape({}).isRequired,
  ChildComponent: PropTypes.func.isRequired,
  classes: PropTypes.shape({}).isRequired,
  location: ReactRouterPropTypes.location.isRequired,
  pathPrefix: PropTypes.string.isRequired,
  releaseVersion: PropTypes.string.isRequired,
  theme: PropTypes.shape({}).isRequired,
  uuid: PropTypes.string.isRequired,
};

export default withContext(withStyles(styles, { withTheme: true })(NavigationBase));
