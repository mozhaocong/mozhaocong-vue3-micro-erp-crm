export class BasicInfo {
	data: FormRowArray
	constructor() {
		this.data = [
			{
				title: 'Name',
				key: 'first_name',
				customRender: ({ record }) => {
					return (record.first_name || '') + (record.last_name || '')
				},
			},
			{ title: '是否验证邮箱', key: 'verified_email_name' },
			{ title: '创建时间', key: 'plat_created_time' },
			{ title: '关联FB账号', key: 'facebook' },
			{ title: '所属品牌', key: 'category_name' },
			{ title: '是否激活邮箱', key: 'shopify_actived_name' },
			{
				title: '激活日期',
				key: 'shop_actived_time',
				// customRender: ({ record }) => {
				// 	return (
				// 		<div>
				// 			<div>商城激活时间: {record.shop_actived_time}</div>
				// 			<div>shopify激活时间: {record.shopify_actived_time}</div>
				// 		</div>
				// 	)
				// },
			},
			{ title: '关联Google账号', key: 'google' },
			{ title: '联系电话', key: 'phone' },
			{ title: '是否订阅邮箱', key: 'subscribed_email_name' },
			{ title: '生日日期', key: 'birthday' },
			{ title: '关联WhatsApp', key: 'whats_app' },
			{ title: '是否付费会员', key: 'is_paid_member_name' },
			{ title: '关联INS', key: 'instagram' },
		]
	}
}

export class CustomerAddresses {
	data: tableColumnsType
	constructor() {
		this.data = [
			{ align: 'center', title: '国家', dataIndex: 'country_name' },
			{ align: 'center', title: '州/省', dataIndex: 'area_name' },
			{ align: 'center', title: '城市', dataIndex: 'city' },
			{ align: 'center', title: '地址1', dataIndex: 'address1' },
			{ align: 'center', title: '地址2', dataIndex: 'address2' },
			{ align: 'center', title: '是否默认地址', dataIndex: 'is_default_name' },
			{
				align: 'center',
				title: '收件人姓名',
				dataIndex: 'first_name',
				customRender: ({ record }) => {
					return (record.first_name || '') + (record.last_name || '')
				},
			},
			{ align: 'center', title: '联系电话', dataIndex: 'phone' },
		]
	}
}

export class SourceInformation {
	data: FormRowArray
	constructor() {
		this.data = [
			{ title: '是否真实用户', key: 'is_real_name' },
			{ title: '推广来源', key: 'register_source_name' },
			{ title: '用户首次来源', key: 'first_channel_name' },
			{ title: '子 来源参数', key: 'register_source_link' },
			{ title: 'shopify是否激活', key: 'shopify_actived_name' },
			{ title: '激活账号', key: 'shop_active_ip' },
			{ title: '商城app是否激活', key: 'shop_actived_name' },
			{
				title: 'IP所属国家/州',
				key: 'ip_country',
				customRender: ({ record }) => {
					return (record.ip_country || '') + '/' + (record.ip_area || '')
				},
			},
		]
	}
}
