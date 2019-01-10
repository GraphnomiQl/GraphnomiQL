import React from 'react';
import { shallow } from 'enzyme';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'; // Smart components
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"

// Component to be tested
import EditTable from '../../src/components/EditTable.jsx';



describe('EditTable', () => {
  const props ={
        
  }
  
      it('should have one form', () => {
        const wrapper = shallow(
          <EditTable />
        );
        expect(wrapper.find('form')).toHaveLength(1);
      });

      it('should have two buttons', () => {
        const wrapper = shallow(
          <EditTable />
        );
        expect(wrapper.find(Button)).toHaveLength(2);
      });

      it('should have one Typography', () => {
        const wrapper = shallow(
          <EditTable />
        );
        expect(wrapper.find(Typography)).toHaveLength(1);
      });

      it('should have seven breaks', () => {
        const wrapper = shallow(
          <EditTable />
        );
        expect(wrapper.find('br')).toHaveLength(7);
      });

      it('should have three divs', () => {
        const wrapper = shallow(
          <EditTable />
        );
        expect(wrapper.find('div')).toHaveLength(3);
      });
    });
