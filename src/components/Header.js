import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'react-emotion';
import { Grid, Row } from '@8base/boost';

import { UserDropdown } from './UserDropdown.js';
import logo from '../images/logo.svg';

const HeaderTag = styled(Grid.Layout)({
  height: '6rem',
  padding: '0 2rem',
  backgroundColor: '#fff',
  borderBottom: '1px solid #D0D7DD',
});

const HeaderLogoTag = styled('img')({
  height: '3rem',
});

const HeaderTextTag = styled('span')({
  fontSize: '2rem',
  color: '#000',
  fontWeight: '600',
});

const HeaderLinkTag = styled(Link)({
  textDecoration: 'none',
});


const Header = () => (
  <Grid.Box area="header">
    <HeaderTag columns="1fr auto" gap="lg">
      <Grid.Box justifyContent="center">
        <HeaderLinkTag to="/">
          <Row alignItems="center">
            <HeaderLogoTag src={logo} alt="8base logo" />
            <HeaderTextTag>example</HeaderTextTag>
          </Row>
        </HeaderLinkTag>
      </Grid.Box>
      <Grid.Box justifyContent="center">
        <UserDropdown />
      </Grid.Box>
    </HeaderTag>
  </Grid.Box>
);

export { Header };
