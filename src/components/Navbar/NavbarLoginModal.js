import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Modal, Image, Form, Button, Divider } from 'semantic-ui-react';

import Popcorn from '../../assets/popcorn.svg';

const BrandContainer = styled.div`
  margin-bottom: 20px;
  text-align: center;
`;

const BrandText = styled.p`
  font-size: 35px;
  margin-top: 3px;
  font-family: 'Inconsolata';
`;


const NavbarLoginModal = ({ loginWithProvider }) => (
  <Modal size="mini" trigger={<Button color="blue">Login</Button>}>
    <Modal.Content>
      <BrandContainer>
        <Image src={Popcorn} style={{ margin: 'auto', width: 45 }} />
        <BrandText>
          <strong>what</strong>list
        </BrandText>
      </BrandContainer>

      <Form size="large">
        <Form.Input fluid icon="user" iconPosition="left" placeholder="E-mail address" />
        <Form.Input fluid icon="lock" iconPosition="left" placeholder="Password" type="password" />
        <Button color="blue" fluid disabled size="large">
          Login
        </Button>
      </Form>
      <Divider horizontal>Or you can login with:</Divider>
      <div style={{ textAlign: 'center' }}>
        <Button circular color="facebook" icon="facebook" onClick={() => loginWithProvider('facebook')} />
        <Button circular color="google plus" icon="google" onClick={() => loginWithProvider('google')} />
        <Button circular color="twitter" icon="twitter" onClick={() => loginWithProvider('twitter')} />
      </div>
    </Modal.Content>
  </Modal>
);

NavbarLoginModal.propTypes = {
  loginWithProvider: PropTypes.func.isRequired,
};

export default NavbarLoginModal;
