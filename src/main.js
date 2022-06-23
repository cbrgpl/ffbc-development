/* eslint-disable no-unused-expressions */
import * as envConfiguration from '@/helpers/app_configuration'

envConfiguration.registrateGlobals()

import( /* webpackPreload: true */ '@services' )
import( /* webpackPreload: true */'@scss/_predefined.scss' )

import( './app' )
