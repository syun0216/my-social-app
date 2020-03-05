import React from 'react';
import renderer from 'react-test-renderer';
import { TouchableOpacity, Text } from 'react-native';
import BlockButton from '../../components/blockButton';

const correctClickText = 'correct click';
const contentText = 'hello world';
const clickFunc = () => correctClickText;
const testRender = renderer.create(
  <BlockButton clickFunc={clickFunc}>
    <Text>{contentText}</Text>
  </BlockButton>
);
const testInstance = testRender.root;

test('renders correctly', () => {
  const tree = testRender.toJSON();
  expect(tree).toMatchSnapshot();
});

test('click correctly', () => {
  const btn = testInstance.findAllByType(TouchableOpacity);
  expect(btn[0].props.onPress()).toEqual(correctClickText);
});
