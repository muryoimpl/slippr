import { connect } from 'react-redux';

import FooterContent from './Footer';

const mapStateToProps = state => ({
  fullscreen: state.pages.fullscreen,
});

const mapDispatchToProps = () => ({});

const Footer = connect(mapStateToProps, mapDispatchToProps)(FooterContent);

export default Footer;
