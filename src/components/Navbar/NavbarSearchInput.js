import React from 'react';
import PropTypes from 'prop-types';
import { Input, Dropdown } from 'semantic-ui-react';
import styled from 'styled-components';

const Form = styled.form`
  .ui.action.left.icon.input.parent-input-div > input {
    width: 150px;
  }
`;

function NavbarSearchInput({ fetchData, isFetchingData }) {
  let input;
  let dropdown;

  const options = [
    { key: 'movie', text: 'Movie', value: 'movie' },
    { key: 'tv', text: 'TV Show', value: 'tv' },
  ];

  function handleSubmit(evt) {
    evt.preventDefault();
    const { value } = input.inputRef;
    const type = dropdown.getSelectedItem().key;

    if (value) {
      fetchData(value, type);
      input.inputRef.value = '';
    }
  }

  const inputIcon = isFetchingData ? '' : 'search';

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        className="parent-input-div"
        loading={isFetchingData}
        icon={inputIcon}
        iconPosition="left"
        placeholder="Search for..."
        ref={(ref) => {
          input = ref;
        }}
        action={
          <Dropdown
            button
            basic
            size="mini"
            floating
            className="white-dropdown"
            options={options}
            defaultValue="movie"
            ref={(ref) => {
              dropdown = ref;
            }}
          />
        }
      />
    </Form>
  );
}

NavbarSearchInput.propTypes = {
  fetchData: PropTypes.func.isRequired,
  isFetchingData: PropTypes.bool.isRequired,
};

export default NavbarSearchInput;
