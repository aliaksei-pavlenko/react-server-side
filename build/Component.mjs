import React from 'react';
import { createUseStyles } from 'react-jss';

const Component = () => {
  const style = createUseStyles({
    div: {
      backgroundColor: 'yellow'
    }
  }, {
    name: Component.name
  })();
  return /*#__PURE__*/React.createElement("div", {
    className: style.div
  }, "some text");
};

export default Component;