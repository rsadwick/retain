import React, { Component } from 'react';
import CsrfToken from '../components/djangoCsrfToken.jsx';
import List from "../containers/ItemList.jsx";

class SearchItemsForm extends Component {
    componentWillMount() {
        this.props.onDevice();
    }

    render() {
        let voiceRecordingUi = '';
        if(this.props.hasVoiceFeatures && !this.props.isRecording && !this.props.isAndroid){
            voiceRecordingUi =  
                <button onClick={this.props.onClick} onTap={this.props.onClick} className="btn btn-water btn-block">Voice Search</button>
        }
        else if(this.props.hasVoiceFeatures && this.props.isRecording && !this.props.isAndroid){
            voiceRecordingUi =  
                <button onClick={this.props.onStopClick} onTap={this.props.onClick} className="btn btn-attention btn-block">Stop Voice Search</button>
        }
        //allow android to record - different type of behavior since it doesn't require a start/stop
        else if(this.props.isAndroid && this.props.hasVoiceFeatures){
            voiceRecordingUi =  
                <button onClick={this.props.onClick} onTap={this.props.onClick} className="btn btn-water btn-block">Voice Search</button>
        }
        return (
            <div>
                <div className="container">
                    <form onSubmit={this.props.onSubmit} className="module">
                    <CsrfToken csrftoken={this.props.csrftoken}/>

                        <div className="form-group">
                            <label>Search For</label>
                            <input
                                value={this.props.searchTerm}
                                className="form-control"
                                name="searchTerm"
                                type="string"
                                onChange={this.props.onChange}
                            />
                        </div>

                        {voiceRecordingUi}

                        <button type="submit" className="btn btn-water btn-block">Search</button>
                    </form>
                </div>
                    <List getItems={this.props.getItems} items={this.props.items} isShared={true} isSearch={true} errors={this.props.errors} />
            </div>
        );
    }
}

export default SearchItemsForm;
