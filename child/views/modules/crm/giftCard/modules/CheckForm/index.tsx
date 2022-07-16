import { defineComponent, PropType, ref } from 'vue'
import { Modal } from 'ant-design-vue'
import { giftCardDetails } from '@/api/erp/crm/customer'
import { asyncApiRes, isTrue, requestJudgment } from '@/utils'
import { FormRow } from './util'
import { defaultRowProps } from '@/config'
import { RForm } from '@/components'
const Props = {
	value: {
		type: Boolean as PropType<boolean>,
	},
	record: {
		type: Object as PropType<ObjectMap>,
		default() {
			return {}
		},
	},
}
export default defineComponent({
	props: Props,
	emits: ['update:value'],
	setup(porp, { emit }) {
		function finish() {
			emit('update:value', false)
		}
		const data = ref({})
		if (isTrue(porp.record)) {
			asyncApiRes(giftCardDetails(porp.record.id, 'get'), { value: '' }, (item) => {
				if (!requestJudgment(item)) return
				data.value = item?.data?.result || {}
			})
		}
		const formRow = new FormRow().data
		return () => (
			<Modal title="查看" width={1200} visible={true} onCancel={finish} onOk={finish}>
				<RForm disabled={true} rows={formRow} rowProps={defaultRowProps} model={data.value} colSpan={12} />
			</Modal>
		)
	},
})
