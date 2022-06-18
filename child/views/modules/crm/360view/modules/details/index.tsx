import { defineComponent, onActivated, ref } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import { ArrayObjectIncludes, routeToRouterTagListData } from '@/utils'
import { clone } from 'ramda'
import CheckForm from './moddules/CheckForm'
import { useStore } from 'vuex'

export default defineComponent({
	name: 'userManagement360viewDetails',
	setup() {
		const detailsList = ref<ObjectMap[]>([])
		const route = useRoute()
		const { commit } = useStore()
		const id = ref('')
		onBeforeRouteUpdate(() => {
			setTimeout(() => {
				id.value = route.query.id as string
			}, 10)
		})

		onActivated(() => {
			const data = routeToRouterTagListData(route)
			id.value = route.query.id as string
			data.name = data.name + id.value
			commit('erpLayout/AddDeleteRouterTagList', { type: 'add', data: data })
			if (!ArrayObjectIncludes(detailsList.value, 'id', id.value)) {
				detailsList.value.push({ id: clone(id.value) })
			}
		})
		return () => (
			<div>
				{detailsList.value.map((item) => {
					return (
						<CheckForm key={item.id} id={item.id} style={item.id === id.value ? 'display: block' : 'display: none'} />
					)
				})}
			</div>
		)
	},
})
