import CheckBoxYN from './CheckBoxYN';
import ErrorText from './ErrorText';
import Input from './Input';
import RadioButton from './RadioButton';
import Wrapper from './Wrapper';

/**
 * 저는 이번과제에서 리액트 컴파운드 패턴을 적용해 Form을 만들어봤어요
 *
 * 예전부터 이런방식으로 가독성을 높혀보면 어떨까라는 생각을 해봤는데 너무 재밌게했네요
 *
 * https://iyu88.github.io//react/2023/03/25/react-compound-component-pattern.html
 *  */
const Form = {
  ErrorText,
  Input,
  Wrapper,
  CheckBoxYN,
  RadioButton,
};

export default Form;
