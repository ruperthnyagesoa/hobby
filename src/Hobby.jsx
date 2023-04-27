// import React from 'react';
import PropTypes from 'prop-types';

function Hobby({ hobby, onDelete }) {
  return (
    <li>
      {hobby.name}{' '}
      <button onClick={() => onDelete(hobby)}>Delete</button>
    </li>
  );
}

Hobby.propTypes = {
  hobby: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  }),
  onDelete: PropTypes.func.isRequired
};

export default Hobby;
