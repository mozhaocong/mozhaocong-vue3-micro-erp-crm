import { defineConfig } from 'vite'
import setDefineConfig from './src/bulid/vite'

export default ({ mode }: any) => {
	const config = setDefineConfig(mode)
	return defineConfig(config)
}
