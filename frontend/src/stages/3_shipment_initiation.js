import React, { Component } from 'react';
import { Loader, Dimmer, Form, Button, Input, Message, Progress } from 'semantic-ui-react';
import SparkMD5 from 'spark-md5';
import { azureUpload } from "../utils";
const { uploadBrowserDataToAzureFile, Aborter } = require("@azure/storage-file");

class InitiateShipment extends Component {
  state = {
    msg: '',
    errorMessage: '',
    loadingData: false,
    shippingDocs: '',
    ladingDocs: '',
    shippingDocsHash: '',
    ladingDocsHash: '',
    shippingDocsProgress: 0,
    ladingDocsProgress: 0,
  }

  async componentDidMount() {
    this.setState({ loadingData: true });
    document.title = "Cargo Shipmemnt | Shipment Initiation";
    this.setState({ loadingData: false });
  }

  onSubmit = async (event) => {
    event.preventDefault();
    this.setState({ errorMessage: '', loading: true, msg: '' });

    try {
      await this.props.SupplyChainInstance.methods.UploadShippingDocuments(this.state.shippingDocsHash, this.state.ladingDocsHash).send({ from: this.props.account });
      await this.uploadFileToAzure(this.state.shippingDocs, 'shippingDocs', this.state.shippingDocsHash);
      await this.uploadFileToAzure(this.state.shippingDocs, 'ladingDocs', this.state.shippingDocsHash);

      this.setState({ msg: 'Successfully uploaded!', errorMessage: '' });
    } catch (err) {
      this.setState({ errorMessage: err.message, msg: '' });
    }

    this.setState({ loading: false });
  }

  uploadFileToAzure = async (file, docType, fileName) => {
    this.setState({ loading: true });
    const fileURL = await azureUpload(fileName);

    await uploadBrowserDataToAzureFile(Aborter.none, file, fileURL, {
      rangeSize: 4 * 1024 * 1024, // 4MB range size
      parallelism: 20, // 20 concurrency
      progress: ev => {
        let prgs = Math.round(ev.loadedBytes * 10000 / file.size) / 100;
        if (docType === 'shippingDocs') {
          this.setState({ shippingDocsProgress: prgs });
        } else {
          this.setState({ ladingDocsProgress: prgs });
        }
      }
    });

    this.setState({ loading: false });
  }

  captureDocs = (file, docType) => {
    this.setState({ errorMessage: '', loading: true, msg: '' });

    if (typeof file !== 'undefined') {
      try {
        let reader = new window.FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadend = async () => {
          const buffer = Buffer.from(reader.result);
          var spark = new SparkMD5.ArrayBuffer();
          spark.append(buffer);
          let hash = spark.end();
          if (docType === 'shippingDocs') {
            this.setState({ shippingDocsHash: hash.toString() });
          } else {
            this.setState({ ladingDocsHash: hash.toString() });
          }
        }
      } catch (err) {
        console.log("error: ", err.message);
      }
    } else {
      this.setState({ errorMessage: 'No file selected!' });
    }
    this.setState({ loading: false });
  }

  render() {
    if (this.state.loadingData) {
      return (
        <Dimmer active inverted>
          <Loader size='massive'>Loading...</Loader>
        </Dimmer>
      );
    }

    let statusMessage;
    if (this.state.msg === '') {
      statusMessage = null;
    } else {
      statusMessage = <Message floating positive header={this.state.msg} />;
    }

    return (
      <div><br /><br />
        <h3>Pending Action: </h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <h3>Upload Docs</h3>
          <Form.Field>
            <label>Shipping Docs</label>
            <Input type='file' onChange={event => { this.setState({ shippingDocs: event.target.files[0] }); this.captureDocs(event.target.files[0], "shippingDocs") }} />
            {this.state.shippingDocsHash &&
              <div>
                File Hash: {this.state.shippingDocsHash} <br />
                <Progress percent={this.state.shippingDocsProgress} indicating progress='percent' />
              </div>
            }
          </Form.Field>
          <Form.Field>
            <label>Draft Bill of Lading</label>
            <Input type='file' onChange={event => { this.setState({ ladingDocs: event.target.files[0] }); this.captureDocs(event.target.files[0], "ladingDocs") }} />
            {this.state.ladingDocsHash &&
              <div>
                File Hash: {this.state.ladingDocsHash} <br />
                <Progress percent={this.state.ladingDocsProgress} indicating progress='percent' />
              </div>
            }
          </Form.Field><br />
          <Button loading={this.state.loading}
            disabled={this.state.loading}
            color='green'
            type='submit'
            labelPosition='right'
            icon='cloud upload' content='UPLOAD' />
          <Message error header="Oops!" content={this.state.errorMessage} />
          <br />{statusMessage}
        </Form>
      </div>
    );
  }
}

export default InitiateShipment;