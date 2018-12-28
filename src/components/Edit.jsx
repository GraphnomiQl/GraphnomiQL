import React from 'react'
import EditTable from './EditTable.jsx';
import EditField from './EditField.jsx';




class Edit extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {

        return (
            <div>
                <EditTable addNode={this.props.addNode} deleteNode={this.props.deleteNode}/>
                <EditField />

            </div>
        )
    }
}

export default Edit;
 