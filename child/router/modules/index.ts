import crm360view from '../modules/crm/360view'
import { RouteRecordRaw } from 'vue-router'

interface routerModulesType {
	pathName: string
	router: Array<RouteRecordRaw>
}
const data: Array<routerModulesType> = [{ pathName: 'crm', router: [crm360view] }]
export default data
