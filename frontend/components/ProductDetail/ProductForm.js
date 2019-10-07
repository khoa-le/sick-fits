import React, {Component} from 'react';
import AddToCart from './AddToCart';
import styled from 'styled-components';
import {spacing,breakpoints} from '../styles/global';
import { Fieldset, Input, Label, Select, Submit } from '../shared/FormElement';

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: ${spacing['2xl']}px ${spacing.md}px 0;

  @media (min-width: ${breakpoints.tablet}px) {
    padding: ${spacing['2xl']}px ${spacing.xl}px 0;
  }

  @media (min-width: ${breakpoints.desktop}px) {
    justify-content: flex-start;
  }
`;

const QtyFieldset = styled(Fieldset)`
  flex-basis: 65px;
  flex-grow: 0;
  flex-shrink: 0;
  margin-right: ${spacing.md}px;

  ${Label} {
    text-align: center;
  }

  ${Input} {
    padding: ${spacing.sm}px ${spacing.sm}px;
    text-align: center;
  }
`;


class ProductForm extends Component {
    state = {
        quantity: 1,
        errors: []
    };

    handleChange = event =>{
        event.preventDefault();
        this.setState({ [event.target.name]: event.target.value });
    }
    render() {
        return (
            <Form>
                <QtyFieldset>
                    <Label htmlFor="quantity">Qty.</Label>
                    <Input
                        type="number"
                        id="quantity"
                        name="quantity"
                        min="1"
                        step="1"
                        onChange={this.handleChange}
                        value={this.state.quantity}
                    />
                </QtyFieldset>
                <AddToCart id={this.props.item.id} quantity={this.state.quantity} />
            </Form>
        )
    }
}

export default ProductForm
