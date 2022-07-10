/* eslint-disable no-unused-expressions */
import * as envConfiguration from '@/configuration/environment'

envConfiguration.registrateGlobals()

import( /* webpackPreload: true */ '@services' )
import( /* webpackPreload: true */ '@scss/_predefined.scss' )

import( './app' )
