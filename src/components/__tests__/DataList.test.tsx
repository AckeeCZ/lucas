import React from 'react';
import { shallow } from 'enzyme';
import { Scrollbars } from 'react-custom-scrollbars';

import DataList, { DataListElement } from '../DataList';

describe('DataList', () => {
    const RowComponent = ({ id }) => (<tr><td>{id}</td></tr>); // eslint-disable-line react/prop-types
    const data = [
        { id: 'row1' },
        { id: 'row2' },
        { id: 'row3' },
        { id: 'row4' },
    ];
    const noDataMessage = 'Nejsou data';

    it('should render all rows if RowComponent is component', () => {
        const wrapper = shallow(<DataList {...{ data, RowComponent, noDataMessage }} />).dive();

        const rows = wrapper.find(RowComponent);
        expect(rows).toHaveLength(4);
        expect(rows.at(0).dive().type()).toEqual('tr');
        expect(rows.at(1).dive().type()).toEqual('tr');
        expect(rows.at(2).dive().type()).toEqual('tr');
        expect(rows.at(3).dive().type()).toEqual('tr');
    });

    it('should render all rows if RowComponent is element', () => {
        const wrapper = shallow(<DataList data={data} RowComponent={<RowComponent />} noDataMessage="" />).dive();

        const rows = wrapper.find(RowComponent);
        expect(rows).toHaveLength(4);
        expect(rows.at(0).dive().type()).toEqual('tr');
        expect(rows.at(1).dive().type()).toEqual('tr');
        expect(rows.at(2).dive().type()).toEqual('tr');
        expect(rows.at(3).dive().type()).toEqual('tr');
    });

    it('should supply index in list into each component', () => {
        const wrapper = shallow(<DataList {...{ data, RowComponent, noDataMessage }} />).dive();
        const wrapper2 = shallow(<DataList data={data} RowComponent={<RowComponent />} noDataMessage="" />).dive();

        const rows = wrapper.find(RowComponent);
        const rows2 = wrapper2.find(RowComponent);

        expect(rows.at(0).prop('index')).toEqual(0);
        expect(rows.at(1).prop('index')).toEqual(1);
        expect(rows2.at(2).prop('index')).toEqual(2);
        expect(rows2.at(3).prop('index')).toEqual(3);
    });

    it('should use no data message when no data available', () => {
        const wrapper = shallow(
            <DataList data={[]} RowComponent={<RowComponent />} noDataMessage="I did not get any data" />
        ).dive();

        expect(wrapper.dive().type()).toEqual('div');
        expect(wrapper.dive().text()).toEqual('I did not get any data');
    });

    it('should use scrollbars in default', () => {
        const list = shallow(<DataList {...{ data, RowComponent, noDataMessage }} />).dive();

        expect(list.type()).toBe(Scrollbars);
    });

    it('should not use scrollbars when force by prop', () => {
        const list = shallow(<DataList {...{ data, RowComponent, noDataMessage }} scrollable={false} />).dive();

        expect(list.type()).toBe(DataListElement);
    });
});
