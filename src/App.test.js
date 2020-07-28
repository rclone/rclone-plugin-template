import {shallow} from "enzyme";
import React from "react";
import toJson from "enzyme-to-json";
import App from "./App";
import {findByTestAttr} from "./utils";


const setUp = ( props = {}) => {
  const component = shallow(<App {...props}/>);

  return component;
}

describe('App', function () {
  describe('renders', function () {
    let wrapper;
    beforeEach(()=>{
      const props = {};
      wrapper = setUp(props);
    })

    it('should render without crashing', function () {
      const component = findByTestAttr(wrapper, "appComponent");
      expect(component).toHaveLength(1);
    });

    it('should match snapshot', function () {
      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });
});