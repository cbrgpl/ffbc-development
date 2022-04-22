import { arrayUtils } from '@/helpers/js_utils/index'

export default ( cartItem1, cartItem2 ) => cartItem1.product === cartItem2.product &&
arrayUtils.equals( cartItem1.featureFields, cartItem2.featureFields )
