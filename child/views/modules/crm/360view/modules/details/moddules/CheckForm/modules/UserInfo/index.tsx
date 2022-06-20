import { defineComponent, PropType, ref } from 'vue'
import { customerDetails } from '@/api/erp/crm/customer'
import { Card, Table } from 'ant-design-vue'
import { RForm } from '@/components'
import { BasicInfo, CustomerAddresses, SourceInformation } from './util'
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
		const model = ref<ObjectMap>({})
		if (isTrue(porp.id)) {
			asyncApiRes(customerDetails(porp.id as string, 'get'), model)
		}
		const basicInfo = new BasicInfo().data
		const sourceInformation = new SourceInformation().data
		const customerAddresses = new CustomerAddresses().data
		return () => (
			<>
				<Card title="用户基础信息">
					<RForm
						labelCol={{ style: { width: '120px' } }}
						rows={basicInfo}
						model={model.value}
						customRender={defaultCustomRender}
					/>
				</Card>
				<Card title="用户曾用地址">
					<Table columns={customerAddresses} dataSource={model.value?.customer_addresses || []} pagination={false} />
				</Card>
				<Card title="来源信息">
					<RForm colSpan={8} rows={sourceInformation} model={model.value} customRender={defaultCustomRender} />
				</Card>
			</>
		)
	},
})
