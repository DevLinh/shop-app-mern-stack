import React, { useState } from 'react'
import { Checkbox, Collapse } from 'antd';

const { Panel } = Collapse;
function CheckBox(props) {
    const [Checked, setChecked] = useState([])

    const handleToggle = (value) => {
        const currentIndex = Checked.indexOf(value);
        const newChecked = [...Checked];
        if (currentIndex === -1) {
            newChecked.push(value)
        } else {
            newChecked.splice(currentIndex, 1)
        }
        setChecked(newChecked)
        //after update the checked list, we pass it to parent component
        props.handleFilters(newChecked)
    }

    const renderCheckboxList = () => props.list && props.list.map((value, index) => (
        <React.Fragment key={index}>
            <Checkbox
                type='checkbox'
                checked={Checked.indexOf(value._id) === -1 ? false : true}
                onChange={() => handleToggle(value._id)}
            />
            <span>{value.name}</span>
        </React.Fragment>
    ))
    return (
        <div>
            <Collapse defaultActiveKey={['0']}>
                <Panel header='Continents' key='1'>
                    {renderCheckboxList()}
                </Panel>
            </Collapse>

        </div>
    )
}

export default CheckBox