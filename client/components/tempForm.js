import React from 'react';

const TempForm = () => {
  return (
    <div>
      <form>
        <div>
          <label htmlFor="email">
            <small>Email</small>
          </label>
          <input name="email" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
      </form>
    </div>
  );
};

export default TempForm;
