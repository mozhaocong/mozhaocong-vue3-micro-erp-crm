import { defineComponent, ref } from 'vue'
import { Common, FormRadioGroup, RSearch, RTable } from '@/components'
import { customerGiftCard } from '@/api/erp/crm/customer'
import { SearchRow, TableRow } from './util'
import Modules from './modules'
import { defaultRowProps, searchModelDefData } from '@/config'
const { useSearch, useRequest, commonly } = Common
const pageKey = 'userManagementGiftCard'
export default defineComponent({
	name: pageKey,
	setup() {
		const { searchForm } = useSearch<ObjectMap>(searchModelDefData)
		const pageSate = ref({
			type: {
				isSearch: true,
				value: { type: '' },
			},
		}) // 搜索表单的特殊参数数据列表
		const searchRow = new SearchRow().data // 搜索表单的数据列表
		const tableRow = new TableRow({ setModuleState, setModuleData }).data // 表单的数据列表
		const moduleState = ref<ObjectMap>({
			// checkForm: true,
		}) //表单操作列 操作modules组件的状态
		const moduleData = ref<ObjectMap>({}) //表单操作列 操作modules组件的参数
		function setModuleState(item: ObjectMap) {
			moduleState.value = item
		}
		function setModuleData(item: ObjectMap) {
			moduleData.value = item
		}

		const { run, data, renderPagination, runSearchData, getPagination, loading, refresh } = useRequest(
			customerGiftCard,
			{
				manual: true,
				pagination: true,
				defaultParams: [searchModelDefData],
			}
		)
		const { searchSlots, rSearch, rClear } = commonly({
			pageSate,
			searchForm,
			searchRows: searchRow,
			run,
			getPagination,
		})

		return () => (
			<>
				<RSearch
					searchKey={pageKey + 'Search'}
					clear={rClear}
					loading={loading.value}
					search={rSearch}
					v-slots={{
						header: () => {
							return (
								<FormRadioGroup
									style="margin: 0 0 20px"
									prop="crmGiftCardType"
									v-model={[pageSate.value.type.value.type, 'value']}
									onChange={rSearch}
								/>
							)
						},
						...searchSlots(true),
					}}
					{...{ rowProps: defaultRowProps }}
					model={searchForm.value}
					rows={searchRow}
				/>
				<RTable
					searchKey={pageKey + 'Table'}
					refresh={refresh}
					dataSource={data.value?.data?.data}
					columns={tableRow}
					{...{ loading: loading.value }}
				/>
				{renderPagination(runSearchData.value)}
				<Modules v-model={[moduleState.value, 'value']} {...moduleData.value} />
			</>
		)
	},
})
