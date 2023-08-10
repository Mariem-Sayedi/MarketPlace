import { useDispatch } from 'react-redux';
import { toggleCart } from '../ReduxToolkit/Reducers/CartSlice';

export const handleToggleCart = (product) => {
  const dispatch = useDispatch();
  dispatch(toggleCart(product));
};
