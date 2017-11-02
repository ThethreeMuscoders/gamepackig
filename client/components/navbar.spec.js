/* global describe beforeEach it */

import { expect } from 'chai';
import React from 'react';
import enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Navbar } from './navbar';

const adapter = new Adapter();
enzyme.configure({ adapter });

describe('Navbar', () => {
  let navbar;

  beforeEach(() => {
    navbar = shallow(<Navbar isLoggedIn handleClick={() => {}} />);
  });

  it('renders the navbar', () => {
    expect(navbar.find('h1').text()).to.be.equal('gamepackig');
  });
});
