import React, { lazy, Suspense, useEffect } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import Header from "./components/Header";
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles'
import Progress from "./components/Progress";
import { createBrowserHistory } from 'history'

const MarketingApp = lazy(() => import('./components/MarketingApp'))
const AuthApp = lazy(() => import('./components/AuthApp'))
const DashboardApp = lazy(() => import('./components/DashboardApp'))

const generatedClassName = createGenerateClassName({
    productionPrefix: 'co'
})

const history = createBrowserHistory()

export default () => {
    const [isSignIn, setIsSignIn] = React.useState(false)

    useEffect(() => {
        if (isSignIn) {
            history.push('/dashboard')
        } else {
            history.push('/')
        }   
    }, [isSignIn])

    return (
        <Router history={history}>
            <StylesProvider generateClassName={generatedClassName}>
                <div>
                    <Header isSignedIn={isSignIn} onSignOut={() => setIsSignIn(false)} />
                    <Suspense fallback={<Progress />}>
                        <Switch>
                            <Route path="/auth">
                                <AuthApp onSignIn={() => setIsSignIn(true)} />
                            </Route>
                            <Route path="/dashboard">
                                {!isSignIn && <Redirect to="/" />}
                                <DashboardApp />
                            </Route>
                            <Route path="/" component={MarketingApp} />
                        </Switch>
                    </Suspense>
                </div>
            </StylesProvider>
        </Router>
    )
}