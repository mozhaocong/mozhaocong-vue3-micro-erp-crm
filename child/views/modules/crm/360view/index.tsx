import { defineComponent, ref } from 'vue'
import { Common, RSearch, RTable } from '@/components'
import { customer } from '@/api/erp/crm/customer'
import { SearchRow, TableRow } from './util'
import { defaultRowProps } from '@/config'
import { useRouter } from 'vue-router'
import { isTrue } from '@/utils'
const { useSearch, useRequest, commonly } = Common
const pageKey = 'userManagement360view'
export default defineComponent({
	name: pageKey,
	setup() {
		const { searchForm } = useSearch<ObjectMap>({})
		const pageSate = ref({}) // 搜索表单的特殊参数数据列表
		const searchRow = new SearchRow().data // 搜索表单的数据列表
		const router = useRouter()
		const { run, data, renderPagination, getPagination, loading, refresh, pageSize, current } = useRequest(customer, {
			manual: true,
			pagination: true,
			defaultParams: [[]],
		})
		const { searchSlots, rSearch, rClear } = commonly({
			pageSate,
			searchForm,
			searchRows: searchRow,
			run,
			getPagination,
			setSearchData(item) {
				if (isTrue(item.category)) {
					item.category = item.category.join(',')
				}
				return item
			},
		})

		const tableRow = new TableRow({
			setModuleData,
			tableData: { pageSize: pageSize, current: current },
		}).data // 表单的数据列表

		function setModuleData(item: ObjectMap) {
			// moduleData.value = item
			const { record } = item
			router.push({
				name: 'userManagement360viewDetails',
				query: {
					id: record.id,
					email: encodeURIComponent(record.email),
				},
			})
		}

		return () => (
			<div>
				<RSearch
					searchKey={pageKey + 'Search'}
					clear={rClear}
					loading={loading.value}
					search={rSearch}
					v-slots={{
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
				{renderPagination()}
			</div>
		)
	},
})
