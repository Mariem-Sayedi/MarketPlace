import { useDispatch } from 'react-redux';
import { toggleCart } from '../ReduxToolkit/reducers/cartSlice';

export const handleToggleCart = (product) => {
  const dispatch = useDispatch();
  dispatch(toggleCart(product));
};
