import React from 'react';
import renderer from 'react-test-renderer';
import { Text } from 'react-native';

import BlankPage from '../../components/blankPage';

const text = 'Hello world';
const testRender = renderer.create(<BlankPage text={text} />);
const testInstance = testRender.root;

test('renders correctly', () => {
  const tree = testRender.toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders text', () => {
  const textItems = testInstance.findAllByType(Text);
  expect(textItems.length).toBe(1);
  expect(textItems[0].props.children).toEqual(text);
});
