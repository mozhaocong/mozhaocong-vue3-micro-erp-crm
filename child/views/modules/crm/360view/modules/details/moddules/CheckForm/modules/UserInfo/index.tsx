import { defineComponent, PropType, ref } from 'vue'
import { customerDetails } from '@/api/erp/crm/customer'
import { Card } from 'ant-design-vue'
import { RForm } from '@/components'
import { BasicInfo } from './util'
import { asyncApiRes, defaultCustomRender, isTrue } from '@/utils'
const Props = {
	id: {
		type: String as PropType<string>,
		required: true,
	},
}
export default defineComponent({
	props: Props,
	setup(porp) {
		const model = ref({})
		if (isTrue(porp.id)) {
			asyncApiRes(customerDetails(porp.id as string, 'get'), model)
		}
		const basicInfo = new BasicInfo().data
		return () => (
			<Card title="用户基础信息">
				<RForm rows={basicInfo} model={model.value} customRender={defaultCustomRender} />
			</Card>
		)
	},
})
