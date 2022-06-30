import { computed, defineComponent, onActivated, ref } from 'vue'
import { useRoute } from 'vue-router'
import { ArrayObjectIncludes, deepClone, routeToRouterTagListData } from '@/utils'
import { clone } from 'ramda'
import CheckForm from './moddules/CheckForm'
import { useStore } from 'vuex'
import { Card } from 'ant-design-vue'

export default defineComponent({
	name: 'userManagement360viewDetails',
	setup() {
		const detailsList = ref<ObjectMap[]>([])
		const route = useRoute()
		const { commit, state } = useStore()

		const id = computed(() => {
			return route.query.id || ''
		})
		const email = computed(() => {
			return decodeURIComponent((route?.query?.email as string) || '')
		})

		function setDetailsList() {
			const routerTagIdList = state.erpLayout.routerTagList
				.filter((res: any) => {
					return res.name === 'userManagement360viewDetails'
				})
				.map((res: any) => {
					return res?.stateData?.id
				})
			detailsList.value = detailsList.value.filter((item) => routerTagIdList.includes(item.id))
		}

		onActivated(() => {
			const data: ObjectMap = routeToRouterTagListData(route)
			data.hoverTitle = email.value
			data.stateData = { id: id.value }
			commit('erpLayout/AddDeleteRouterTagList', { type: 'add', data: deepClone(data) })
			if (!ArrayObjectIncludes(detailsList.value, 'id', id.value as string)) {
				detailsList.value.push({ id: clone(id.value) })
			}
			setDetailsList()
		})
		return () => (
			<div>
				<Card title={`用户邮箱 ${email.value}`} style="width: 100%;">
					{detailsList.value.map((item) => {
						return (
							<CheckForm key={item.id} id={item.id} style={item.id === id.value ? 'display: block' : 'display: none'} />
						)
					})}
				</Card>
			</div>
		)
	},
})
