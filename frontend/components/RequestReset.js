import React, {Component} from 'react';
import {Mutation} from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import ErrorMessage from './ErrorMessage';
import {CURRENT_USER_QUERY} from "./User";

const REQUEST_RESET_MUTATION = gql`
    mutation REQUEST_RESET_MUTATION($email: String!){
        requestReset(email:$email){
            message
        }
    }
`;

class Signin extends Component {
    state = {
        email: '',
    };
    saveToState = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        return (
            <Mutation
                mutation={REQUEST_RESET_MUTATION}
                variables={this.state}
            >
                {(reset, {error, loading, called}) =>
                    (<Form method="post" onSubmit={async (e) => {
                        e.preventDefault();
                        const success = await reset();
                        this.setState({email: ''});
                    }}>
                        <fieldset disabled={loading} aria-busy={loading}>
                            <h2>Request a password reset</h2>
                            <ErrorMessage error={error}/>
                            {!error && !loading && called && <p>Success! Check yout email for a reset link!</p>}
                            <label htmlFor="email">
                                Email
                                <input type="email" name="email" placeholder="email" value={this.state.email}
                                       onChange={this.saveToState}/>
                            </label>
                            <button type='submit'>Request Reset!</button>
                        </fieldset>
                    </Form>)
                }
            </Mutation>

        );
    }
}

export default Signin;