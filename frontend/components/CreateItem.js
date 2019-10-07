import React, {Component} from 'react';
import {Mutation} from 'react-apollo';
import gql from 'graphql-tag';
import {Page, Form, FormLayout, TextField} from '@shopify/polaris';
import Router from 'next/router';
import Error from './ErrorMessage';


const CREATE_ITEM_MUTATION = gql`
    mutation CREATE_ITEM_MUTATION(
        $title: String!
        $description: String!
        $price: Int!
        $image: String
        $largeImage: String
        $image_2: String
    ) {
        createItem(
            title: $title
            description: $description
            price: $price
            image: $image
            largeImage:$largeImage
            image_2: $image_2
        ){
            id
        }
    }
`;

class CreateItem extends Component {
    state = {
        title: '',
        description: '',
        image: '',
        largeImage: '',
        image_2: '',
        price: 0
    };
    handleChange = (field) => {
        return (value) => this.setState({[field]: value});
    };
    uploadFile = async e => {
        const name = e.target.name;
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', 'sickfits');
        const res = await fetch('https://api.cloudinary.com/v1_1/khoale/image/upload', {
            method: 'POST',
            body: data
        });
        const file = await res.json();

        if(name=='image'){
            this.setState({
                image: file.secure_url,
                largeImage: file.eager[0].secure_url,
            })
        }else{
            this.setState({
                image_2: file.secure_url,
            })
        }


    };

    render() {
        return (

            <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
                {(createItem, {loading, error, called, data}) => (
                    <Page
                        breadcrumbs={[{content: 'Products', url: '/items'}]}
                        title={this.state.title}
                        primaryAction={{
                            content: 'Save',
                            onAction: async e => {
                                e.preventDefault();
                                const res = await createItem();
                                Router.push({
                                    pathname: '/item',
                                    query: {id: res.data.createItem.id}
                                })
                            }
                        }}
                    >
                        <Form>
                            <FormLayout>
                                <Error error={error}/>
                                <TextField
                                    value={this.state.title}
                                    onChange={this.handleChange('title')}
                                    label="Title"
                                    type="string"
                                    name="title"
                                    required
                                />
                                <TextField
                                    value={this.state.price}
                                    onChange={this.handleChange('price')}
                                    label="Price"
                                    name="price"
                                    type="number"
                                    required
                                />
                                <TextField
                                    value={this.state.description}
                                    onChange={this.handleChange('description')}
                                    label="Description"
                                    name="description"
                                    type="string"
                                    max="1000"
                                    required
                                />
                                <label htmlFor="image">
                                    Image<br/>
                                    <input onChange={this.uploadFile}
                                           type="file" id="image" name="image" placeholder="Upload main image"
                                            required/>
                                    {this.state.image && (
                                        <img width="200" src={this.state.image} alt="Upload Preview"/>)}
                                </label>
                                <label htmlFor="image_2">
                                    Image<br/>
                                    <input onChange={this.uploadFile}
                                           type="file" id="image_2" name="image_2" placeholder="Upload more image"
                                           required/>
                                    {this.state.image_2 && (
                                        <img width="200" src={this.state.image_2} alt="Upload Preview"/>)}
                                </label>
                            </FormLayout>
                        </Form>
                    </Page>
                )}
            </Mutation>

        );
    }
}

export default CreateItem;
export {CREATE_ITEM_MUTATION};
