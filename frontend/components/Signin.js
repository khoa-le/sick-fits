import React, {Component} from 'react';
import {Mutation} from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import ErrorMessage from './ErrorMessage';
import {CURRENT_USER_QUERY} from "./User";

const SIGNIN_MUTATION = gql`
    mutation SIGNIN_MUTATION($email: String!, $password:String!){
        signin(email:$email, password: $password){
            id
            email
        }
    }
`;

class Signin extends Component {
    state = {
        name: '',
        password: '',
        email: '',
    };
    saveToState = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        return (
            <Mutation
                mutation={SIGNIN_MUTATION}
                refetchQueries={[{query: CURRENT_USER_QUERY}]}
                variables={this.state}
            >
                {(signin, {error, loading}) =>
                    (<Form method="post" onSubmit={(e) => {
                        e.preventDefault();
                        signin();
                    }}>
                        <fieldset disabled={loading} aria-busy={loading}>
                            <h2>Signin into your Account</h2>
                            <ErrorMessage error={error}/>
                            <label htmlFor="email">
                                Email
                                <input type="email" name="email" placeholder="email" value={this.state.email}
                                       onChange={this.saveToState}/>
                            </label>
                            <label htmlFor="password">
                                Password
                                <input type="password" name="password" placeholder="password"
                                       value={this.state.password}
                                       onChange={this.saveToState}/>
                            </label>
                            <button type='submit'>Sign in!</button>
                        </fieldset>
                    </Form>)
                }
            </Mutation>

        );
    }
}

export default Signin;