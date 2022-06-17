import { defineComponent, PropType } from 'vue'
import { TabPane, Tabs } from 'ant-design-vue'
import UserInfo from './modules/UserInfo'
import Refund from './modules/Refund'
import Order from './modules/Order'
const Props = {
	id: {
		type: String as PropType<string>,
		required: true,
	},
} as const
export default defineComponent({
	props: Props,
	setup(porp) {
		const tabsList = [
			{ title: '用户信息', key: 'UserInfo', components: <UserInfo id={porp.id} /> },
			{ title: '订单', key: 'Order', components: <Order id={porp.id} /> },
			{ title: '退款', key: 'Refund', components: <Refund id={porp.id} /> },
		]

		return () => (
			<Tabs defaultActiveKey="UserInfo">
				{tabsList.map((item) => {
					return (
						<TabPane tab={item.title} key={item.key}>
							{item.components}
						</TabPane>
					)
				})}
			</Tabs>
		)
	},
})
