import BaseService from './_baseService'
import DataProcessor from '@services/helpers/dataProcessor'
import { backendPhone, backendDate } from '@filters'

const fieldsFilters = {
  email: [],
  firstName: [],
  lastName: [],
  phoneNumber: [ backendPhone ],
  birthDate: [ backendDate ],
}

export default class UserService extends BaseService {
  constructor () {
    super()
    this.dataProcessor = new DataProcessor( fieldsFilters )
    this._endpoint = 'user'
  }

  me ( accessToken, key = 'me' ) {
    const options = {
      headers: {
        Authorization: `Bearer ${ accessToken }`
      }
    }

    return this._request( {
      key,
      expectType: this.responseTypes.json,
      options
    } )
  }

  edit ( userData, accessToken, key = 'meEdit' ) {
    const fields = [ 'email', 'firstName', 'lastName', 'phoneNumber', 'birthDate' ]

    const requestData = BaseService.generateReqData( fields, userData )
    this.dataProcessor.applyFilters( requestData )

    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${ accessToken }`,
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: requestData
    }

    return this._request( {
      key,
      expectType: this.responseTypes.json,
      options
    } )
  }

  uploadDocument ( formData, accessToken, key = 'meUploadAvatar' ) {
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${ accessToken }`,
        Accept: 'application/json',
      },
      body: formData
    }

    return this._request( {
      key,
      expectType: this.responseTypes.json,
      options,
    } )
  }
}
