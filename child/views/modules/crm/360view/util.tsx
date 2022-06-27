import { configCurryFilter } from '@/utils'
import { FormBasicData, FormConfig, RRangePicker } from '@/components'
import { Button } from 'ant-design-vue'
import { serialNumber } from '@/utils/modules/tools/common'
import dayjs from 'dayjs'

export class SearchRow {
	data: FormRowArray
	constructor() {
		this.data = [
			{
				title: '用户邮箱',
				key: 'email',
			},
			// {
			// 	title: '用户是否激活',
			// 	key: 'status',
			// },
			{
				title: '品牌店铺',
				key: 'category',
				component: <FormBasicData />,
				props: {
					prop: 'basicCategoryList',
					mode: 'multiple',
				},
			},
			{
				title: '是否验证邮箱',
				key: 'verified_email',
				component: <FormConfig />,
				props: {
					prop: 'baseYesNoStatus',
				},
			},
			{
				title: '邮件订阅',
				key: 'subscribed_email',
				component: <FormConfig />,
				props: {
					prop: 'baseYesNoStatus',
				},
			},
			{
				title: '会员类型',
				key: 'is_paid_member',
				component: <FormConfig />,
				props: {
					prop: 'crmPaid',
				},
			},
			{
				title: '创建时间',
				key: 'start_plat_created_time',
				component: <RRangePicker />,
				props: () => {
					return {
						showTime: {
							hideDisabledOptions: true,
							defaultValue: [dayjs('00:00:00', 'HH:mm:ss'), dayjs('23:59:59', 'HH:mm:ss')],
						},
					}
				},
				colProps: { flex: '600px' },
				keys: [
					['start_plat_created_time', 'startTime'],
					['end_plat_created_time', 'endTime'],
				],
			},
		]
	}
}

export class TableRow {
	data: tableColumnsType
	constructor(operationConfig?: any) {
		this.data = [
			{
				align: 'center',
				title: '序号',
				dataIndex: 'no',
				customRender: (item) => serialNumber(item, operationConfig.tableData),
			},
			{
				align: 'center',
				title: '用户邮箱',
				dataIndex: 'email',
			},
			{
				align: 'center',
				title: '姓名',
				dataIndex: 'first_name',
				customRender: ({ record }) => {
					return record.first_name + record.last_name
				},
			},
			{
				align: 'center',
				title: '所属品牌店铺',
				dataIndex: 'category_name',
				customRender: configCurryFilter('crmCategory'),
			},
			{
				title: '是否验证邮箱',
				dataIndex: 'verified_email_name',
				align: 'center',
			},
			{
				title: '邮件订阅',
				dataIndex: 'subscribed_email_name',
				align: 'center',
			},
			{
				title: '付费会员类型',
				dataIndex: 'is_paid_member_name',
				align: 'center',
			},
			{
				title: '总订单量',
				dataIndex: 'order_num',
				align: 'center',
			},
			{
				title: '总贡献金额',
				dataIndex: 'order_money',
				align: 'center',
			},
			{
				title: '操作',
				dataIndex: 'operation',
				align: 'center',
				customRender: ({ record }) => {
					return (
						<div>
							<Button
								type="primary"
								onClick={() => {
									operationConfig.setModuleData({
										record: record,
									})
								}}
							>
								查看
							</Button>
						</div>
					)
				},
			},
		]
	}
}
