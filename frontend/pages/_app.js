import App, {Container} from 'next/app';
import MyPage from '../components/Page';
import {ApolloProvider} from 'react-apollo';
import {AppProvider} from '@shopify/polaris';
import enTranslations from '@shopify/polaris/locales/en.json';
import withData from '../lib/withData';


class MyApp extends App {
    static async getInitialProps({Component, ctx}) {
        let pageProps = {};
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }
        //this exposes the query to the user
        pageProps.query = ctx.query;
        return {pageProps};
    }

    render() {
        const {Component, apollo, pageProps} = this.props;
        return (
            <Container>
                <ApolloProvider client={apollo}>
                    <AppProvider i18n={enTranslations}>
                        <MyPage>
                            <Component {...pageProps}/>
                        </MyPage>
                    </AppProvider>
                </ApolloProvider>
            </Container>
        );
    }
};
export default withData(MyApp);