import { defineComponent, PropType, ref } from 'vue'
import { RTable } from '@/components'
import { customerRefundOrder } from '@/api/erp/crm/customer'
import { TableRow } from './util'
import { asyncApiRes, isTrue, requestJudgment } from '@/utils'
const Props = {
	id: {
		type: String as PropType<string>,
		required: true,
	},
} as const
export default defineComponent({
	props: Props,
	setup(porp) {
		const refundOrder = ref<any>({})
		if (isTrue(porp.id)) {
			asyncApiRes(customerRefundOrder(porp.id, 'get'), { value: '' }, (item) => {
				if (!requestJudgment(item)) return
				refundOrder.value = item?.data?.result || {}
			})
		}
		const tableRow = new TableRow().data
		return () => (
			<div>
				<RTable dataSource={refundOrder?.value?.data} columns={tableRow} setup={false} sticky={false} />
			</div>
		)
	},
})
