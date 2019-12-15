import { cloneElement } from 'react';
import PropTypes from 'prop-types';

const TouchPressableView = ({
  children,
  onTouchStart,
  onTouchEnd,
  onTouchMove,
  onTouchCancel,
  disableSelectText,
}) => {
  let { style } = children.props;
  if (disableSelectText) {
    style = {
      ...style,
      WebkitUserSelect: 'none',
    };
  }
  return cloneElement(children, {
    ...children.props,
    style,
    onContextMenu: e => e.preventDefault(),
    onTouchStart,
    onTouchEnd,
    onTouchMove,
    onTouchCancel,
  });
};

TouchPressableView.propTypes = {
  children: PropTypes.node.isRequired,
  onTouchStart: PropTypes.func.isRequired,
  onTouchEnd: PropTypes.func.isRequired,
  onTouchMove: PropTypes.func.isRequired,
  onTouchCancel: PropTypes.func.isRequired,
  disableSelectText: PropTypes.bool.isRequired,
};
export default TouchPressableView;
