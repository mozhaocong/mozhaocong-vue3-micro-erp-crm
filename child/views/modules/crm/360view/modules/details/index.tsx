import { computed, defineComponent, onActivated, ref } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import { ArrayObjectIncludes, routeToRouterTagListData } from '@/utils'
import { clone } from 'ramda'
import CheckForm from './moddules/CheckForm'
import { useStore } from 'vuex'
import { Card } from 'ant-design-vue'

export default defineComponent({
	name: 'userManagement360viewDetails',
	setup() {
		const detailsList = ref<ObjectMap[]>([])
		const route = useRoute()
		const { commit } = useStore()

		const id = computed(() => {
			return route.query.id || ''
		})
		const email = computed(() => {
			return decodeURIComponent((route?.query?.email as string) || '')
		})

		onActivated(() => {
			const data = routeToRouterTagListData(route)
			data.name = data.name + id.value
			commit('erpLayout/AddDeleteRouterTagList', { type: 'add', data: data })
			if (!ArrayObjectIncludes(detailsList.value, 'id', id.value as string)) {
				detailsList.value.push({ id: clone(id.value) })
			}
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
